import crypto from 'crypto'
import url from 'node:url'
import {
  AccessToken,
  CommandNames,
  EnabledVin,
  EnergySitesNames,
  FeatureConfig,
  ICommondResult,
  MFA_Device,
  MFA_Verify,
  NotificationPreferencesParams,
  NotificationSettings,
  OAuthBody,
  OAuthParameters,
  OrNullable,
  ProductsData,
  TeslaHttpResponse,
  TeslaVehicleConfig,
  UserMe,
  VehicleData,
  VehicleDataNames,
  VehicleStateNames,
  VehicleStateNames_Special
} from '@/typings.d'
import {
  API_LOG_ALL, API_ERROR_LEVEL, API_CALL_LEVEL, API_RETURN_LEVEL,
  API_PARAMS_LEVEL, API_RESPONSE_LEVEL, API_URL_LEVEL, API_REQUEST_LEVEL,
  API_BODY_LEVEL
} from '@/ext'
import { BaseFetch } from '@/helper'
import { CLIENT_ID, _APP_USER_AGENT, _USER_AGENT } from '@/config'

const logLevel: number | null = Number(process.env.TESLA_API_LOG || API_LOG_ALL)

export const getEnergySitesUri = (host: string, name: EnergySitesNames) => (siteId: string) => `${host}api/1/energy_sites/${siteId}/${name}`

export const getStateUri_Special = (id: string | number, stateName: VehicleStateNames_Special) => `/api/1/vehicles/${id}/${stateName}`

export const getVehicleDataUri = (id: number, dataName: VehicleDataNames) => `/api/1/vehicles/${id}/${dataName}`

/**
 * 返回车辆特定状态命令的URI。
 *
 * @param {string | number} id - 车辆的ID。
 * @param {VehicleStateNames} stateName - 状态命令的名称。
 * @return {string} 指定状态命令的URI。
 */
export const getStateUri = (id: string | number, stateName: VehicleStateNames) => `/api/1/vehicles/${id}/data_request/${stateName}`

/**
 * 具体文档可以参考: https://tesla-api.timdorr.com/api-basics/authentication.
 *
 * @param {string} username - 用户手机号码或者邮箱地址.
 * @param {string} password - 用户注册密码.
 * @param {string} scope    - oauth scope范围
 * @param {string} mfaDeviceName  - MFA设备名称.
 * @param {string} mfaPassCode  - MFA 验证码.
 * @param baseUrl
 * @param clientId
 * @param locale
 * @returns
 */
export const login = (baseUrl: string, redirect_uri: string, clientId: string, locale: string, scope: string = 'openid email offline_access phone') =>
  async (username: string, password: string, mfaDeviceName?: OrNullable<string>, mfaPassCode?: OrNullable<string>) => {
    log(API_CALL_LEVEL, 'TeslaAPI.login()')

    const codeVerifier = generateCodeVerifier()
    const codeChallenge = generateCodeChallenge(codeVerifier)
    const state = generateCodeChallenge(generateCodeVerifier())

    const params: OAuthParameters = {
      audience: '',
      client_id: clientId,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      locale,
      prompt: 'login',
      redirect_uri,
      response_type: 'code',
      scope, // profile ou_code
      state,
      is_in_app: scope.includes('phone'),
      login_hint: username
    }
    const authorize_url = `${baseUrl}/oauth2/v3/authorize`
    const { get, request, post } = BaseFetch.instance().getFetch()

    log(API_URL_LEVEL, `\nURL: ${authorize_url}`)
    log(API_PARAMS_LEVEL, `\nPARAMS: ${JSON.stringify(params)}`)
    const authRes = await get(authorize_url, { params })

    log(API_RESPONSE_LEVEL, `\n Body: ${JSON.stringify(authRes?.data ?? {})}`)

    const form: OAuthBody & any = authRes?.data.match(/<input type="hidden" [^>]+>/g).reduce((total: Record<string, string>, currentValue: string) => {
      const nameArr = currentValue?.match(/name="([^"]+)"/)
      const valueArr = currentValue?.match(/value="([^"]*)"/)
      const currentResult = nameArr && valueArr ? { [`${nameArr[1]}`]: valueArr[1] } : null
      return Object.assign(total, currentResult)
    }, {})

    log(API_RESPONSE_LEVEL, `\n FORM_DATA: ${JSON.stringify(form)}`)

    form.identity = username
    form.credential = password

    const loginRes = await request<Record<string, any>>({
      url: authorize_url,
      withCredentials: true,
      method: 'POST',
      maxRedirects: 0,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: form,
      params
    })
    log(API_URL_LEVEL, `\nURL: ${authorize_url}`)
    log(API_PARAMS_LEVEL, `\nURL: ${JSON.stringify(params)}`)

    const { data: loginRet, headers: loginHeaders } = loginRes ?? {}
    let location = loginHeaders?.location ?? null

    /**
     *
     * @param authorize_url  - 鉴权url.
     * @param authorize_params - 鉴权参数.
     * @param authorize_cookie  - Cookie.
     * @param baseUrl
     * @returns
     */
    const mfaVerify =
      (baseUrl: string) =>
        (transaction_id: string, mfaDeviceName?: OrNullable<string>, mfaPassCode?: OrNullable<string>, _csrf?: string): Promise<boolean> => {
          // MFA is required
          if (!mfaPassCode) throw new Error('MFA passcode required')
          log(API_PARAMS_LEVEL, '\nPARAMS: ' + JSON.stringify({ transaction_id, mfaPassCode, mfaDeviceName }))
          const { get, post } = BaseFetch.instance().getFetch()

          return new Promise<boolean>((resolve, reject) => {
            get<{ data?: Array<MFA_Device> }>(`${baseUrl}/oauth2/v3/authorize/mfa/factors`, {
              withCredentials: true,
              // headers: {
              //     'Content-Type': 'application/json;charset=utf-8',
              // },
              params: { transaction_id }
            }).then(res => {
              const { data: responseData, config } = res ?? {}
              log(API_URL_LEVEL, `\nURL: ${config?.url}`)
              log(API_RESPONSE_LEVEL, `\nResponse: ${JSON.stringify(responseData)}`)

              if (!responseData || responseData?.data?.length === 0) return reject(new Error('No MFA devices found'))

              const devices: Array<any> = responseData.data ?? []
              const device = devices.length === 1 ? devices[0] : devices.find(dev => dev.name === mfaDeviceName)

              // 登录时输入了MFA 设备，从verify接口获取不到任何设备，将认定为不合法
              if (mfaDeviceName && !device) return reject(new Error(`No MFA device found with name ${mfaDeviceName}`))
              return device
            }).then(device => post<{ data?: MFA_Verify | null }>(
              `${baseUrl}/oauth2/v3/authorize/mfa/verify`,
              {
                factor_id: device.id,
                passcode: mfaPassCode,
                transaction_id,
                _csrf
              },
              {
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                }
              }
            )
            )
              .then(authRes => {
                const ret = authRes?.data?.data
                if (!(ret?.approved && ret?.valid)) {
                  return reject(new Error('MFA passcode rejected'))
                }
                resolve(true)
              })
              .catch(e => reject(e))
          })
        }

    /**
     * MFA auth has succeeded, so now repeat the authorize request with just the transaction id.
     *
     * @param authorize_url
     * @param params
     * @param transaction_id
     * @returns
     */
    const getLocation = async (authorize_url: string, params: OAuthParameters, transaction_id: string): Promise<OrNullable<string>> => {
      const { request } = BaseFetch.instance().getFetch()
      const { status, headers } = await request<Record<string, any>>({
        url: authorize_url,
        withCredentials: true,
        method: 'POST',
        maxRedirects: 0,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params,
        data: {
          transaction_id
        }
      })
      return status === 302 ? headers?.location : null
    }

    // 是否开启MFA验证规则
    if (loginRet?.match('/authorize/mfa/verify') || loginRet?.match(/passcode/)) {
      const isMfaVerifyOk = await mfaVerify(baseUrl)(form.transaction_id, mfaDeviceName, mfaPassCode, form._csrf)
      location = isMfaVerifyOk ? await getLocation(authorize_url, params, form.transaction_id) : null
    }

    if (!location) throw new Error('Login credentials rejected')
    log(API_RESPONSE_LEVEL, `\nlocation: ${location}`)

    // Tesla 账户登录验证成功会重定向到callback地址并且带有code与issuer 参数
    // const loc_url = url.parse(location, true)
    const loc_url = url.parse(location, true)

    const to_query = loc_url?.query ?? {}
    const { issuer, code } = to_query

    if (!code) {
      log(API_ERROR_LEVEL, JSON.stringify(to_query))
      throw new Error('No authorization code issued; credentials likely incorrect')
    }

    // Tesla Token数据
    const tokenRes = await post<AccessToken>(
      `${issuer ?? `${baseUrl}/oauth2/v3`}/token`,
      {
        grant_type: 'authorization_code',
        client_id: clientId,
        code_verifier: codeVerifier,
        code,
        redirect_uri: `${loc_url.protocol}//${loc_url.host}${loc_url.pathname}`
      },
      {
        headers: {
          Accept: '*/*'
        }
      }
    )

    log(API_RETURN_LEVEL, 'TeslaAPI.login() completed.')
    return tokenRes?.data
  }

/**
 * Logout and invalidate the current auth token
 * @param {string} accessToken - Tesla provided OAuth token
 */
export const logout = async (baseUrl: string, accessToken: string) => {
  log(API_CALL_LEVEL, 'TeslaJS.logout()')
  const { request } = BaseFetch.instance().getFetch()
  const { data } = await request<Record<string, any>>({
    url: `${baseUrl}/oauth/revoke`,
    method: 'POST',
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders(),
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
  log(API_RETURN_LEVEL, 'TeslaJS.logout() completed.')
  return data
}

/**
 * 刷新TOKEN.
 *
 * @param refresh_token
 * @param scope
 * @param baseUrl
 * @returns
 */
export const refreshAccessToken = (baseUrl: string) =>
  async (refresh_token: string, scope: string = 'openid email offline_access'): Promise<AccessToken> => {
    const { post } = BaseFetch.instance().getFetch()
    const res = await post<AccessToken>(
      `${baseUrl}/oauth2/v3/token`,
      {
        grant_type: 'refresh_token',
        client_id: CLIENT_ID,
        refresh_token,
        scope
      },
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    )

    return res?.data
  }

export const getUsersInformation = (baseUrl: string) => (accessToken: string) => async () => {
  const { get } = BaseFetch.instance().getFetch()
  const users = await get<TeslaHttpResponse<UserMe | null>>(`${baseUrl}/api/1/users/me`, {
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders()
    }
  })
  return users?.data?.response ?? null
}

export const getVaultProfile = (baseUrl: string) => (accessToken: string) => async () => {
  const { get } = BaseFetch.instance().getFetch()

  const vaultProfile = await get<TeslaHttpResponse<{ vault: string }>>(`${baseUrl}/api/1/users/vault_profile`, {
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders()
    }
  })
  return vaultProfile?.data?.response ?? null
}

export const getFeatureConfig = (baseUrl: string) => (accessToken: string) => async () => {
  const { get } = BaseFetch.instance().getFetch()

  const res = await get<TeslaHttpResponse<FeatureConfig>>(`${baseUrl}/api/1/users/feature_config`, {
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders()
    }
  })
  return res?.data?.response ?? null
}

export const getUsersKeys = (baseUrl: string) => (accessToken: string) => async (kind: string, public_key: string, name: string, model: string) => {
  const { post } = BaseFetch.instance().getFetch()
  const vehiclesRes = await post<TeslaHttpResponse<boolean>>(
    `${baseUrl}/api/1/users/keys`,
    {},
    {
      headers: {
        ...generateBearerToken(accessToken),
        ...getTeslaAppHeaders()
      },
      params: {
        kind,
        public_key,
        name,
        model
      }
    }
  )
  return vehiclesRes?.data.response ?? null
}

export const getNotificationPreferences = (baseUrl: string) => (accessToken: string) => async (params: NotificationPreferencesParams) => {
  const { get } = BaseFetch.instance().getFetch()
  const { data } = await get<TeslaHttpResponse<NotificationSettings>>(`${baseUrl}/api/1/notification_preferences`, {
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders()
    },
    params
  })
  return data?.response ?? null
}
export const getServiceSchedulingData = (baseUrl: string) => (accessToken: string) => async () => {
  const { get } = BaseFetch.instance().getFetch()
  const { data } = await get<TeslaHttpResponse<Array<EnabledVin>>>(`${baseUrl}/api/1/users/service_scheduling_data`, {
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders()
    }
  })
  return data?.response ?? null
}

export const getProducts = (baseUrl: string) => (accessToken: string) => async () => {
  const { get } = BaseFetch.instance().getFetch()
  const { data } = await get<{ count: number } & TeslaHttpResponse<Array<ProductsData | TeslaVehicleConfig>>>(`${baseUrl}/api/1/products`, {
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders()
    }
  })
  return data?.response ?? null
}

/**
 *
 */
export const getEnergySites = <T>(baseUrl: string, name: EnergySitesNames) => (accessToken: string) =>
  async (siteId: string, params: Record<string, any>) => {
    const { get } = BaseFetch.instance().getFetch()
    const { data } = await get<TeslaHttpResponse<T>>(getEnergySitesUri(baseUrl, name)(siteId), {
      headers: {
        ...generateBearerToken(accessToken),
        ...getTeslaAppHeaders()
      },
      params
    })
    return data?.response ?? null
  }

export const getVehiclesList = (baseUrl: string) => (accessToken: string) => async () => {
  const { get } = BaseFetch.instance().getFetch()
  const { data } = await get<{ count: number } & TeslaHttpResponse<Array<VehicleData>>>(`${baseUrl}/api/1/vehicles`, {
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders()
    }
  })

  return data?.response ?? null
}

/**
 *
 * @param id - The id of the car. (Not the vehicle_id!).
 * @param baseUrl
 */
export const getVehicles = (baseUrl: string) => (accessToken: string) => async (id: number) => {
  const { get } = BaseFetch.instance().getFetch()
  const { data } = await get<{ count: number } & TeslaHttpResponse<Array<VehicleData>>>(`${baseUrl}/api/1/vehicles/${id}`, {
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders()
    }
  })
  return data?.response ?? null
}

/**
 * "honk_horn" 是指按下车辆喇叭，发出声音来产生警示或传达信息的功能。特斯拉车辆也具备这个功能。
 * 特斯拉车辆的 "honk_horn" 功能可以用于以下情况：
 * 警示： 当驾驶员需要提醒其他交通参与者注意时，例如在紧急情况下需要停车或避让。
 * 传达信息： 驾驶员可能使用喇叭来向其他驾驶员、行人或其他人传达信息，例如在需要提醒前方车辆行驶不当或不安全的情况下。
 * 报警： 在有危险情况或紧急情况下，驾驶员可以使用喇叭来引起其他交通参与者的注意。
 * 特斯拉车辆的 "honk_horn" 功能通常可以通过车辆的控制面板、车辆的遥控应用程序或车辆钥匙等方式来触发。在使用这个功能时，务必注意周围的环境和其他交通参与者，并遵循道路交通规则和安全法规。
 * @param id 非vehicle id
 * @param baseUrl
 */
export const honkHorn = (baseUrl: string) => (accessToken: string) => async (id: number) => {
  const res = await postCommond<TeslaHttpResponse<ICommondResult<boolean>>>(baseUrl)(accessToken)(id, 'honk_horn')
  return res?.response ?? null
}

/**
 * "Flash Lights" 是指在特定情况下，特斯拉车辆的前后灯光会快速闪烁的功能。这通常用于吸引注意、传递信息或警示其他车辆、行人或驾驶员。
 *  特斯拉车辆的 "Flash Lights" 功能可能在以下情况下使用：
 *  警示： 当驾驶员需要提醒其他交通参与者注意时，例如在紧急情况下需要停车或避让。
 *  通信： 有时驾驶员可能使用 "Flash Lights" 来与其他车辆或行人进行简单的交流，例如示意其他车辆先行通过或表示感谢。
 *  报警： 在一些情况下，驾驶员可能使用 "Flash Lights" 来引起其他驾驶员的注意，例如当他们可能未注意到停在路边的特斯拉车辆时。
 *  请注意，不同的车型和软件版本可能具有不同的 "Flash Lights" 功能和操作方式。在使用这个功能时，请始终遵循特斯拉的操作指南，并在适当的情况下使用。.
 * @param baseUrl
 * @returns
 */
export const flashLights = (baseUrl: string) => (accessToken: string) => async (id: number) => {
  const res = await postCommond<TeslaHttpResponse<ICommondResult<boolean>>>(baseUrl)(accessToken)(id, 'flash_lights')
  return res?.response ?? null
}

export const chargePortDoorClose = (baseUrl: string) => (accessToken: string) => async (id: number) => {
  const res = await postCommond<TeslaHttpResponse<ICommondResult<boolean>>>(baseUrl)(accessToken)(id, 'charge_port_door_close')
  return res?.response ?? null
}

export const chargePortDoorOpen = (baseUrl: string) => (accessToken: string) => async (id: number) => {
  const res = await postCommond<TeslaHttpResponse<ICommondResult<boolean>>>(baseUrl)(accessToken)(id, 'charge_port_door_open')
  return res?.response ?? null
}

export const chargeStart = (baseUrl: string) => (accessToken: string) => async (id: number) => {
  const res = await postCommond<TeslaHttpResponse<ICommondResult<boolean>>>(baseUrl)(accessToken)(id, 'charge_start')
  return res?.response ?? null
}

export const chargeStop = (baseUrl: string) => (accessToken: string) => async (id: number) => {
  const res = await postCommond<TeslaHttpResponse<ICommondResult<boolean>>>(baseUrl)(accessToken)(id, 'charge_stop')
  return res?.response ?? null
}

export const doorLock = (host: string) => (accessToken: string) => async (id: number) => {
  const honkHornRes = await postCommond<TeslaHttpResponse<ICommondResult<boolean>>>(host)(accessToken)(id, 'door_lock')
  return honkHornRes?.response ?? null
}

export const doorUnlock = (host: string) => (accessToken: string) => async (id: number) => {
  const flashLightsRes = await postCommond<TeslaHttpResponse<ICommondResult<boolean>>>(host)(accessToken)(id, 'door_unlock')
  return flashLightsRes?.response ?? null
}

export const homelink = (baseUrl: string) => (accessToken: string) => async (id: number) => {
  const res = await postCommond<TeslaHttpResponse<ICommondResult<boolean>>>(baseUrl)(accessToken)(id, 'trigger_homelink')
  return res?.response ?? null
}

export const mediaTogglePlayback = (baseUrl: string) => (accessToken: string) => async (id: number) => {
  const honkHornRes = await postCommond<TeslaHttpResponse<ICommondResult<boolean>>>(baseUrl)(accessToken)(id, 'media_toggle_playback')
  return honkHornRes?.response ?? null
}

export const mediaNextTrack = (baseUrl: string) => (accessToken: string) => async (id: number) => {
  const res = await postCommond<TeslaHttpResponse<ICommondResult<boolean>>>(baseUrl)(accessToken)(id, 'media_next_track')
  return res?.response ?? null
}

export const mediaPrevTrack = (baseUrl: string) => (accessToken: string) => async (id: number) => {
  const res = await postCommond<TeslaHttpResponse<ICommondResult<boolean>>>(baseUrl)(accessToken)(id, 'media_prev_track')
  return res?.response ?? null
}

export const mediaNextFav = (baseUrl: string) => (accessToken: string) => async (id: number) => {
  const res = await postCommond<TeslaHttpResponse<ICommondResult<boolean>>>(baseUrl)(accessToken)(id, 'media_next_fav')
  return res?.response ?? null
}

export const mediaPrevFav = (baseUrl: string) => (accessToken: string) => async (id: number) => {
  const res = await postCommond<TeslaHttpResponse<ICommondResult<boolean>>>(baseUrl)(accessToken)(id, 'media_prev_fav')
  return res?.response ?? null
}

export const mediaVolumeUp = (baseUrl: string) => (accessToken: string) => async (id: number) => {
  const res = await postCommond<TeslaHttpResponse<ICommondResult<boolean>>>(baseUrl)(accessToken)(id, 'media_volume_up')
  return res?.response ?? null
}

export const mediaVolumeDown = (baseUrl: string) => (accessToken: string) => async (id: number) => {
  const res = await postCommond<TeslaHttpResponse<ICommondResult<boolean>>>(baseUrl)(accessToken)(id, 'media_volume_down')
  return res?.response ?? null
}

/**
 *
 * @param volume 0 - 11
 * @returns
 */
export const adjustVolume = (baseUrl: string) => (accessToken: string) => async (id: number, volume: number) => {
  const res = await postCommond<TeslaHttpResponse<ICommondResult<boolean>>>(baseUrl, { volume })(accessToken)(id, 'adjust_volume')
  return res?.response ?? null
}

export const remoteStartDrive = (baseUrl: string) => (accessToken: string) => async (id: number) => {
  const res = await postCommond<TeslaHttpResponse<ICommondResult<boolean>>>(baseUrl)(accessToken)(id, 'remote_start_drive')
  return res?.response ?? null
}

export const sunRoofControl = (baseUrl: string, state: string | 'vent' | 'close') => (accessToken: string) => async (id: number) => {
  const res = await postCommond<TeslaHttpResponse<ICommondResult<boolean>>>(baseUrl, { state })(accessToken)(id, 'sun_roof_control')
  return res?.response ?? null
}

export const wakeUp = (baseUrl: string) => (accessToken: string) => async (id: number) => {
  const res = await postCommond<TeslaHttpResponse<ICommondResult<boolean>>>(baseUrl)(accessToken)(id, 'wake_up')
  return res?.response ?? null
}

export const getRequestData = (url: string) => (accessToken: string) =>
  async <T>() => {
    const { get } = BaseFetch.instance().getFetch()

    const res = await get<TeslaHttpResponse<T>>(url, {
      headers: {
        ...generateBearerToken(accessToken),
        ...getTeslaAppHeaders()
      }
    })
    return res?.data?.response ?? null
  }

/**
 *
 * @param baseUrl
 * @returns
 */
export const getDataRequest = (baseUrl: string) => (accessToken: string) => async (id: number, dataName: VehicleDataNames, params: Record<string, any>) => {
  const { get } = BaseFetch.instance().getFetch()

  const { data } = await get<TeslaHttpResponse<VehicleData>>(`${baseUrl}${getVehicleDataUri(id, dataName)}`, {
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders()
    },
    params
  })
  return data?.response ?? null
}

/**
 * 根据应用版本、平台和平台版本生成 Tesla 应用的版本信息。
 *
 * @param appVersion - 应用版本号。
 * @param platform - 平台名称。
 * @param platformVer - 平台版本号。
 * @returns 格式化后的 Tesla 应用版本信息字符串。
 */
export const TeslaAppVersion = (appVersion: string, patch: string, platform: string, platformVer: string) => `TeslaApp/${appVersion}/${patch}/${platform}/${platformVer}`

/**
 * 获取用于 Tesla 应用的请求头信息。
 *
 * @returns 包含 Tesla 应用请求头的对象。
 */
export const getTeslaAppHeaders = () => ({
  'user-agent': _USER_AGENT,
  'x-tesla-user-agent': _APP_USER_AGENT
})

/**
 * 生成带有 Bearer 认证头的令牌对象。
 *
 * @param accessToken - 访问令牌字符串。
 * @param typeName - 认证类型，默认为 'Bearer'。
 * @returns 包含认证头的对象。
 */
export const generateBearerToken = (accessToken: string, typeName: string = 'Bearer'): Record<string, string> => ({
  Authorization: `${typeName} ${accessToken}`
})

export const getCommandUri = (id: string | number, commandName: CommandNames) => `/api/1/vehicles/${id}/command/${commandName}`

/**
 * 定义一个 postCommond 函数，用于发送 POST 请求并执行命令。
 *
 * @param baseUrl - 请求的基础 URL。
 * @param query - 可选，查询参数的对象。
 * @returns 接收访问令牌并返回一个函数，该函数用于执行命令。
 *
 */
export const postCommond = <T>(baseUrl: string, body?: Record<string, any>) => (accessToken: string) =>
  async (id: number, commandName: CommandNames): Promise<T | null> => {
    const { post } = BaseFetch.instance().getFetch()
    try {
      // 发送 POST 请求以执行命令，并获取响应数据

      const reqData = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          ...generateBearerToken(accessToken),
          ...getTeslaAppHeaders()
        },
        data: body
      }

      console.log(API_REQUEST_LEVEL, '\nRequest: ' + JSON.stringify(reqData))
      const res = await post<T>(`${baseUrl}${getCommandUri(id, commandName)}`, reqData)
      console.log(API_RESPONSE_LEVEL, '\nResponse: ' + JSON.stringify(res))

      // 返回响应数据，如果数据为空则返回 null
      return res?.data ?? null
    } catch (e) {
      console.error(API_ERROR_LEVEL, e)
    }
    return null
  }

const generateCodeVerifier = (): string => {
  // Tesla might use something more sophisticated, but in my experience it's a 112-char alphanumeric string so let's just do that
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  const random = crypto.randomBytes(86)
  let output = ''
  for (let i = 0; i < random.length; i++) {
    output += chars[random[i] % chars.length]
  }
  return output
}

const generateCodeChallenge = (verifier: string): string => {
  const hash = crypto.createHash('sha256')
  hash.update(verifier)
  return hash.digest('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

export const randomString = (length: number) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const extractHidden = (body: string) => {
  const returnObject: Record<string, string> = {}
  let matches: IterableIterator<RegExpMatchArray> | RegExpExecArray[] | null = null
  if (body.matchAll) {
    matches = body.matchAll(/<input (?=[^>]* name=["']([^'"]*)|)(?=[^>]* value=["']([^'"]*)|)/g)
  } else {
    // this.log.warn(
    //     "The adapter needs in the future NodeJS v12. https://forum.iobroker.net/topic/22867/how-to-node-js-f%C3%BCr-iobroker-richtig-updaten",
    // )
    matches = matchAllPolyfill(/<input (?=[^>]* name=["']([^'"]*)|)(?=[^>]* value=["']([^'"]*)|)/g, body)
  }

  for (const match of matches) returnObject[match[1]] = match[2]
  return returnObject
}

const matchAllPolyfill = (regex: RegExp, input: string) => {
  const matches: RegExpExecArray[] = []
  let match: RegExpExecArray | null
  while (null !== (match = regex.exec(input))) matches.push(match)
  return matches[Symbol.iterator]() // Convert array to an iterable
}

/*
 * Adjustable console logging
 * @param {int} level - logging level
 * @param {string} str - text to log
 */
const log = (level: number, str: string) => {
  if (logLevel < level) return
  //    console.log('[' + new Date().toISOString() + '] ' + str)

  if (level === API_ERROR_LEVEL) {
    // Logger.error('[Tesla-API]', str)
    console.error('[Tesla-API]', str)
  } else {
    // Logger.debug('[Tesla-API]', str)
    console.log('[Tesla-API]', str)
  }
}
