import { AuthorizeApi } from '@/authorize'
import { UsersApi } from '@/users'
import { ProductsApi } from '@/products'
import { StreamsApi } from '@/streams'
import { VehiclesApi } from '@/vehicles'
import { VehicleDataApi } from '@/vehicle/data'
import { AccessToken, ApiConfig, ApiOptions, OrNullable } from '@/typings.d'
import { AlertsApi, DoorsApi, HomelinkApi, MediaApi, RemoteControlApi, VehicleStateApi } from '@/vehicle'

import { Api } from '@/ext'
import { config } from '@/config'
import { BaseFetch, Fetch, Logger, Logwatch } from '@/helper'
import { InMemoryAccessTokenManager, AccessTokenDataSource } from '@/token-manager'

const { REDIRECT_URL, SSO_BASE_HOST, LOCALE, API_BASE_HOST, STREAMING_HOST, SSO_CLIENT_ID } = config.tesla

/**
 * Tesla API 合集
 * authorize: Tesla账户认证
 * vehicles： 车辆信息.
 *
 */
export class TeslaAPI {
  
  private _config: ApiConfig = {
    redirectUrl: '',
    ossAuthorizeHost: '',
    streamingHost: '',
    teslamotorsHost: '',
    locale: null,
    clientId: null,
    userAgent: null,
    appUserAgent: null
  }

  private _dataSource: AccessTokenDataSource = new InMemoryAccessTokenManager()

  private constructor() {
    this.toDefault()
  }

  /**
   * 初始化默认环境变量参数.
   *
   * @returns
   */
  public toDefault() {
    this._config.locale = LOCALE
    this._config.clientId = SSO_CLIENT_ID
    this._config.ossAuthorizeHost = SSO_BASE_HOST
    this._config.streamingHost = STREAMING_HOST
    this._config.teslamotorsHost = API_BASE_HOST
    this._config.redirectUrl = REDIRECT_URL
    return this
  }

  public fetch(fetch: Fetch) {
    BaseFetch.instance().fetch(fetch)
    return this
  }

  public datasource(datasource: AccessTokenDataSource) {
    this._dataSource = datasource
    return this
  }

  public logger(logger: Logger) {
    Logwatch.instance().logger(logger)
    return this
  }

  public userTeslaAPIs = (userId: string) => {
    const t = this._dataSource.findLastOneAccessToken(userId)
    if (!t) throw new Error(`${userId} isn't logged in.`)

    return {
      vehicles: this.vehicles(userId),
      users: this.users(userId),
      products: this.products(userId),
      streams: this.streams(userId),
      vehicleState: this.vehicleState(userId),
      vehicleData: this.vehicleData(userId),
      vehicleCommonds_Alerts: this.vehicleCommonds_Alerts(userId),
      vehicleCommonds_Doors: this.vehicleCommonds_Doors(userId),
      vehicleCommonds_Homelink: this.vehicleCommonds_Homelink(userId),
      vehicleCommonds_Media: this.vehicleCommonds_Media(userId),
      vehicleCommonds_RemoteControl: this.vehicleCommonds_RemoteControl(userId)
    }
  }

  /**
   *  创建并返回 AuthorizeApi 实例
   * @returns
   */
  public authorize(): AuthorizeApi {
    const { ossAuthorizeHost, locale, clientId, userAgent, redirectUrl, appUserAgent } = this._config
    if (!(ossAuthorizeHost && redirectUrl && locale && clientId)) throw new Error('TelsaAPI.authorize() occur exception !!!')

    return new AuthorizeApi({
      redirect_url: redirectUrl,
      authorize_url: ossAuthorizeHost,
      client_id: clientId!!,
      locale,
      user_agent: userAgent,
      app_user_agent: appUserAgent
    })
  }

  /**
   * 登录,
   * 注:该函数需要rest API client支持携带cookie
   * 特斯拉在oauth鉴权后每次在cookie中携带 bm_sv\ak_bmsc\bm_sz\tesla-auth.sid 鉴权字段
   * 当检测到这些字段不存在，oauth会一直重定向到登录页面
   *
   * @param username - 登录 email/手机号码.
   * @param password - 登录密码.
   * @param mfaDeviceName  - MFA 设备名称.
   * @param mfaPassCode  - MFA 动态验证码.
   * @returns 登录结果
   */
  public login = (username: string, password: string, mfaDeviceName: OrNullable<string> = null, mfaPassCode: OrNullable<string> = null): Promise<AccessToken | null> => {
    return this.authorize().login(username, password, mfaDeviceName, mfaPassCode).then(res => {
      if (res) this._dataSource.toAccessToken(username, res)
      return res
    })
  }

  /**
   * 根据tokenId 获取登录信息
   * 
   * @param tokenId 
   * @returns 
   */
  public loginFromTokenId = (tokenId: string) => this._dataSource.findAccessTokenFromTokenId(tokenId)

  private checkTeslamotorsHost = () => {
    if (!this._config.teslamotorsHost) throw new Error('teslamotors_host is NULL.')
  }

  /**
   * 构建 ApiOptions参数，调用 createApiInstance() 方法来创建 Api 实例
   * 
   * @param userId 
   * @returns TeslaAPI调用所需的参数
   */
  private options = (userId: string): ApiOptions => {
    const obtainAccessTokenFn = () => new Promise<AccessToken>((resolve, reject) => {
      this._dataSource.findLastOneAccessToken(userId)
        .then(res => {
          if (res) {
            resolve(res)
          } else {
            reject(new Error(`${userId} isn't logged in.`))
          }
        }).catch(e => reject(e))
    })
    const { _config: config } = this

    return {
      obtainAccessTokenFn,
      config
    }
  }

  /**
   * vehicles: 通过调用 createApiInstance(VehiclesApi, this.options(userId)) 来创建并返回一个 VehiclesApi 实例，用于处理与车辆信息相关的操作。
   * @returns
   */
  public vehicles = (userId: string): VehiclesApi => this.createApiInstance(VehiclesApi, this.options(userId))

  /**
   * users: 通过调用 createApiInstance(UsersApi, this.options(userId)) 来创建并返回一个 UsersApi 实例，用于处理与用户信息相关的操作。
   * @returns
   */
  public users = (userId: string): UsersApi => this.createApiInstance(UsersApi, this.options(userId))

  /**
   * streams: 通过调用 createApiInstance(StreamsApi, this.options(userId)) 来创建并返回一个 StreamsApi 实例，用于处理与数据流相关的操作。
   * @returns
   */
  public streams = (userId: string): StreamsApi => this.createApiInstance(StreamsApi, this.options(userId))

  /**
   * vehicleState: 通过调用 createApiInstance(VehicleStateApi, this.options(userId)) 来创建并返回一个 VehicleStateApi 实例，用于处理与车辆状态相关的操作。
   * @deprecated
   * @returns  目前返回可能为404
   */
  public vehicleState = (userId: string): VehicleStateApi => this.createApiInstance(VehicleStateApi, this.options(userId))

  public vehicleData = (userId: string): VehicleDataApi => this.createApiInstance(VehicleDataApi, this.options(userId))

  public vehicleCommonds_Alerts = (userId: string): AlertsApi => this.createApiInstance(AlertsApi, this.options(userId))

  public vehicleCommonds_Doors = (userId: string): DoorsApi => this.createApiInstance(DoorsApi, this.options(userId))

  public vehicleCommonds_Homelink = (userId: string): HomelinkApi => this.createApiInstance(HomelinkApi, this.options(userId))

  public vehicleCommonds_RemoteControl = (userId: string): RemoteControlApi => this.createApiInstance(RemoteControlApi, this.options(userId))

  public vehicleCommonds_Media = (userId: string): MediaApi => this.createApiInstance(MediaApi, this.options(userId))

  /**
   * products: 通过调用 createApiInstance(ProductsApi, this.options(userId)) 来创建并返回一个 ProductsApi 实例，用于处理与产品信息相关的操作。
   */
  public products = (userId: string): ProductsApi => this.createApiInstance(ProductsApi, this.options(userId))

  public locale(locale: string | 'zh_CN' | 'en_US') {
    this._config.locale = locale
    return this
  }

  public authorizeHost(authorizeUrl: string) {
    this._config.ossAuthorizeHost = authorizeUrl
    return this
  }

  public teslamotorsHost(url: string) {
    this._config.teslamotorsHost = url
    return this
  }

  public streamingHost(url: string) {
    this._config.streamingHost = url
    return this
  }

  public clientId(clientId: string) {
    this._config.clientId = clientId
    return this
  }

  public static Builder() {
    return new TeslaAPI()
  }

  /**
   *  通过 options 创建不同类型的 API 实例
   * @param apiClass 构造函数，用于创建指定类型的 API 实例。
   * @param confg 这是一个包含 obtainAccessTokenFn 和 config 的对象，用于为 API 实例提供配置和获取 AccessToken 函数。
   * @returns
   */
  private createApiInstance<T extends Api>(apiClass: new (options: ApiOptions) => T, confg: ApiOptions): T {
    this.checkTeslamotorsHost()
    return new apiClass(confg)
  }
}

export default {
  TeslaAPI
}
