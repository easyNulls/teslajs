"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BaseFetch: () => BaseFetch,
  ConsoleLogger: () => ConsoleLogger,
  InMemoryTokenManager: () => InMemoryTokenManager,
  Logwatch: () => Logwatch,
  NoLogger: () => NoLogger,
  TeslaAPI: () => TeslaAPI,
  TeslaAppVersion: () => TeslaAppVersion,
  adjustVolume: () => adjustVolume,
  chargePortDoorClose: () => chargePortDoorClose,
  chargePortDoorOpen: () => chargePortDoorOpen,
  chargeStart: () => chargeStart,
  chargeStop: () => chargeStop,
  doorLock: () => doorLock,
  doorUnlock: () => doorUnlock,
  extractHidden: () => extractHidden,
  flashLights: () => flashLights,
  generateBearerToken: () => generateBearerToken,
  getCommandUri: () => getCommandUri,
  getDataRequest: () => getDataRequest,
  getEnergySites: () => getEnergySites,
  getEnergySitesUri: () => getEnergySitesUri,
  getFeatureConfig: () => getFeatureConfig,
  getNotificationPreferences: () => getNotificationPreferences,
  getProducts: () => getProducts,
  getRequestData: () => getRequestData,
  getServiceSchedulingData: () => getServiceSchedulingData,
  getStateUri: () => getStateUri,
  getStateUri_Special: () => getStateUri_Special,
  getTeslaAppHeaders: () => getTeslaAppHeaders,
  getUsersInformation: () => getUsersInformation,
  getUsersKeys: () => getUsersKeys,
  getVaultProfile: () => getVaultProfile,
  getVehicleDataUri: () => getVehicleDataUri,
  getVehicles: () => getVehicles,
  getVehiclesList: () => getVehiclesList,
  homelink: () => homelink,
  honkHorn: () => honkHorn,
  login: () => login,
  logout: () => logout,
  mediaNextFav: () => mediaNextFav,
  mediaNextTrack: () => mediaNextTrack,
  mediaPrevFav: () => mediaPrevFav,
  mediaPrevTrack: () => mediaPrevTrack,
  mediaTogglePlayback: () => mediaTogglePlayback,
  mediaVolumeDown: () => mediaVolumeDown,
  mediaVolumeUp: () => mediaVolumeUp,
  postCommond: () => postCommond,
  randomString: () => randomString,
  refreshAccessToken: () => refreshAccessToken,
  remoteStartDrive: () => remoteStartDrive,
  sunRoofControl: () => sunRoofControl,
  wakeUp: () => wakeUp
});
module.exports = __toCommonJS(src_exports);

// src/kits/apis.ts
var apis_exports = {};
__export(apis_exports, {
  TeslaAppVersion: () => TeslaAppVersion,
  adjustVolume: () => adjustVolume,
  chargePortDoorClose: () => chargePortDoorClose,
  chargePortDoorOpen: () => chargePortDoorOpen,
  chargeStart: () => chargeStart,
  chargeStop: () => chargeStop,
  doorLock: () => doorLock,
  doorUnlock: () => doorUnlock,
  extractHidden: () => extractHidden,
  flashLights: () => flashLights,
  generateBearerToken: () => generateBearerToken,
  getCommandUri: () => getCommandUri,
  getDataRequest: () => getDataRequest,
  getEnergySites: () => getEnergySites,
  getEnergySitesUri: () => getEnergySitesUri,
  getFeatureConfig: () => getFeatureConfig,
  getNotificationPreferences: () => getNotificationPreferences,
  getProducts: () => getProducts,
  getRequestData: () => getRequestData,
  getServiceSchedulingData: () => getServiceSchedulingData,
  getStateUri: () => getStateUri,
  getStateUri_Special: () => getStateUri_Special,
  getTeslaAppHeaders: () => getTeslaAppHeaders,
  getUsersInformation: () => getUsersInformation,
  getUsersKeys: () => getUsersKeys,
  getVaultProfile: () => getVaultProfile,
  getVehicleDataUri: () => getVehicleDataUri,
  getVehicles: () => getVehicles,
  getVehiclesList: () => getVehiclesList,
  homelink: () => homelink,
  honkHorn: () => honkHorn,
  login: () => login,
  logout: () => logout,
  mediaNextFav: () => mediaNextFav,
  mediaNextTrack: () => mediaNextTrack,
  mediaPrevFav: () => mediaPrevFav,
  mediaPrevTrack: () => mediaPrevTrack,
  mediaTogglePlayback: () => mediaTogglePlayback,
  mediaVolumeDown: () => mediaVolumeDown,
  mediaVolumeUp: () => mediaVolumeUp,
  postCommond: () => postCommond,
  randomString: () => randomString,
  refreshAccessToken: () => refreshAccessToken,
  remoteStartDrive: () => remoteStartDrive,
  sunRoofControl: () => sunRoofControl,
  wakeUp: () => wakeUp
});
var import_crypto = __toESM(require("crypto"));
var import_node_url = __toESM(require("node:url"));

// src/ext.ts
var API_ERROR_LEVEL = 1;
var API_CALL_LEVEL = 2;
var API_RETURN_LEVEL = 3;
var API_URL_LEVEL = 4;
var API_PARAMS_LEVEL = 6;
var API_REQUEST_LEVEL = 7;
var API_RESPONSE_LEVEL = 8;
var API_LOG_ALL = 1024;
var Api = class {
  obtainAccessToken;
  config;
  /**
   * 构造函数，用于初始化 Api 实例。
   * @param props - Api 配置选项。
   */
  constructor(props) {
    const { obtainAccessTokenFn, config: config2 } = props;
    this.obtainAccessToken = obtainAccessTokenFn;
    this.config = config2;
  }
  /**
   * 获取流式 URL。
   * @returns 流式 URL。
   */
  getStreamingHost = () => this.config?.streamingHost;
  /**
   * 获取 Teslamotors URL。
   * @returns Teslamotors URL。
   */
  getTeslamotorsHost = () => this.config?.teslamotorsHost;
  /**
   * 设置获取访问令牌的函数。
   * @param fn - 获取访问令牌的函数。
   */
  accessTokenFn(fn) {
    this.obtainAccessToken = fn;
  }
  /**
   * 执行一个 API 函数并返回结果。
   * @param fn - 要执行的 API 函数。
   * @returns API 函数的结果。
   */
  async execute(fn) {
    const accessToken = await this.obtainAccessToken();
    const act = accessToken.access_token;
    return act ? await fn(this.config, act) : null;
  }
};

// src/helper.ts
var BaseFetch = class _BaseFetch {
  static _instance = new _BaseFetch();
  _fetch = null;
  constructor() {
  }
  static instance() {
    return _BaseFetch._instance;
  }
  fetch(fetch) {
    _BaseFetch._instance._fetch = fetch;
    return _BaseFetch._instance;
  }
  getFetch() {
    const { _fetch } = _BaseFetch._instance;
    if (!_fetch)
      throw new Error("BaseFetch.fetchInstance() occur exception !!!");
    return _fetch;
  }
};
var ConsoleLogger = class {
  constructor() {
  }
  d(level, message) {
    console.log(`[logger.${level}]`, message);
  }
  e(level, message) {
    console.error(`[logger.${level}]`, message);
  }
  w(level, message) {
    console.log(`[logger.${level}]`, message);
  }
  i(level, message) {
    console.log(`[logger.${level}]`, message);
  }
};
var NoLogger = class {
  constructor() {
  }
  d(_level, _message) {
  }
  e(_level, _message) {
  }
  w(_level, _message) {
  }
  i(_level, _message) {
  }
};
var Logwatch = class _Logwatch {
  static _instance = new _Logwatch();
  _logger = new NoLogger();
  constructor() {
  }
  static instance() {
    return _Logwatch._instance;
  }
  logger(logger) {
    this._logger = logger;
    return this;
  }
  getLogger() {
    return this._logger;
  }
};

// src/config/index.ts
var CLIENT_ID = "ownerapi";
var OSS_HOST_CN = "https://auth.tesla.cn";
var OSS_HOST = "https://auth.tesla.com";
var AUTHORIZE_URL = `${OSS_HOST}/oauth2/v3/authorize`;
var REDIRECT_URL = "https://auth.tesla.com/void/callback";
var _USER_AGENT = "Tesla/4.23.6 (com.teslamotors.TeslaApp; build:1844; iOS 16.6.0) Alamofire/5.2.1";
var _APP_USER_AGENT = "TeslaApp/4.23.6-1844/074a3374b7/ios/16.6";
var config = {
  // https://tesla-api.timdorr.com/
  tesla: {
    LOCALE: "zh-CN",
    REDIRECT_URL,
    SSO_BASE_HOST: OSS_HOST_CN,
    // API_BASE_URL: 'https://owner-api.teslamotors.com',
    API_BASE_HOST: "https://owner-api.vn.cloud.tesla.cn",
    STREAMING_HOST: "wss://streaming.vn.teslamotors.com",
    SSO_CLIENT_ID: CLIENT_ID,
    APP_USER_AGENT: _USER_AGENT
  }
};

// src/kits/apis.ts
var logLevel = Number(process.env.TESLA_API_LOG || API_LOG_ALL);
var getEnergySitesUri = (host, name) => (siteId) => `${host}api/1/energy_sites/${siteId}/${name}`;
var getStateUri_Special = (id, stateName) => `/api/1/vehicles/${id}/${stateName}`;
var getVehicleDataUri = (id, dataName) => `/api/1/vehicles/${id}/${dataName}`;
var getStateUri = (id, stateName) => `/api/1/vehicles/${id}/data_request/${stateName}`;
var login = (baseUrl, redirect_uri, clientId, locale, scope = "openid email offline_access phone") => async (username, password, mfaDeviceName, mfaPassCode) => {
  log(API_CALL_LEVEL, "TeslaAPI.login()");
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const state = generateCodeChallenge(generateCodeVerifier());
  const params = {
    audience: "",
    client_id: clientId,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    locale,
    prompt: "login",
    redirect_uri,
    response_type: "code",
    scope,
    // profile ou_code
    state,
    is_in_app: scope.includes("phone"),
    login_hint: username
  };
  const authorize_url = `${baseUrl}/oauth2/v3/authorize`;
  const { get, request, post } = BaseFetch.instance().getFetch();
  log(API_URL_LEVEL, `
URL: ${authorize_url}`);
  log(API_PARAMS_LEVEL, `
PARAMS: ${JSON.stringify(params)}`);
  const authRes = await get(authorize_url, { params });
  log(API_RESPONSE_LEVEL, `
 Body: ${JSON.stringify(authRes?.data ?? {})}`);
  const form = authRes?.data.match(/<input type="hidden" [^>]+>/g).reduce((total, currentValue) => {
    const nameArr = currentValue?.match(/name="([^"]+)"/);
    const valueArr = currentValue?.match(/value="([^"]*)"/);
    const currentResult = nameArr && valueArr ? { [`${nameArr[1]}`]: valueArr[1] } : null;
    return Object.assign(total, currentResult);
  }, {});
  log(API_RESPONSE_LEVEL, `
 FORM_DATA: ${JSON.stringify(form)}`);
  form.identity = username;
  form.credential = password;
  const loginRes = await request({
    url: authorize_url,
    withCredentials: true,
    method: "POST",
    maxRedirects: 0,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: form,
    params
  });
  log(API_URL_LEVEL, `
URL: ${authorize_url}`);
  log(API_PARAMS_LEVEL, `
URL: ${JSON.stringify(params)}`);
  const { data: loginRet, headers: loginHeaders } = loginRes ?? {};
  let location = loginHeaders?.location ?? null;
  const mfaVerify = (baseUrl2) => (transaction_id, mfaDeviceName2, mfaPassCode2, _csrf) => {
    if (!mfaPassCode2)
      throw new Error("MFA passcode required");
    log(API_PARAMS_LEVEL, "\nPARAMS: " + JSON.stringify({ transaction_id, mfaPassCode: mfaPassCode2, mfaDeviceName: mfaDeviceName2 }));
    const { get: get2, post: post2 } = BaseFetch.instance().getFetch();
    return new Promise((resolve, reject) => {
      get2(`${baseUrl2}/oauth2/v3/authorize/mfa/factors`, {
        withCredentials: true,
        // headers: {
        //     'Content-Type': 'application/json;charset=utf-8',
        // },
        params: { transaction_id }
      }).then((res) => {
        const { data: responseData, config: config2 } = res ?? {};
        log(API_URL_LEVEL, `
URL: ${config2?.url}`);
        log(API_RESPONSE_LEVEL, `
Response: ${JSON.stringify(responseData)}`);
        if (!responseData || responseData?.data?.length === 0)
          return reject(new Error("No MFA devices found"));
        const devices = responseData.data ?? [];
        const device = devices.length === 1 ? devices[0] : devices.find((dev) => dev.name === mfaDeviceName2);
        if (mfaDeviceName2 && !device)
          return reject(new Error(`No MFA device found with name ${mfaDeviceName2}`));
        return device;
      }).then(
        (device) => post2(
          `${baseUrl2}/oauth2/v3/authorize/mfa/verify`,
          {
            factor_id: device.id,
            passcode: mfaPassCode2,
            transaction_id,
            _csrf
          },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        )
      ).then((authRes2) => {
        const ret = authRes2?.data?.data;
        if (!(ret?.approved && ret?.valid)) {
          return reject(new Error("MFA passcode rejected"));
        }
        resolve(true);
      }).catch((e) => reject(e));
    });
  };
  const getLocation = async (authorize_url2, params2, transaction_id) => {
    const { request: request2 } = BaseFetch.instance().getFetch();
    const { status, headers } = await request2({
      url: authorize_url2,
      withCredentials: true,
      method: "POST",
      maxRedirects: 0,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      params: params2,
      data: {
        transaction_id
      }
    });
    return status === 302 ? headers?.location : null;
  };
  if (loginRet?.match("/authorize/mfa/verify") || loginRet?.match(/passcode/)) {
    const isMfaVerifyOk = await mfaVerify(baseUrl)(form.transaction_id, mfaDeviceName, mfaPassCode, form._csrf);
    location = isMfaVerifyOk ? await getLocation(authorize_url, params, form.transaction_id) : null;
  }
  if (!location)
    throw new Error("Login credentials rejected");
  log(API_RESPONSE_LEVEL, `
location: ${location}`);
  const loc_url = import_node_url.default.parse(location, true);
  const to_query = loc_url?.query ?? {};
  const { issuer, code } = to_query;
  if (!code) {
    log(API_ERROR_LEVEL, JSON.stringify(to_query));
    throw new Error("No authorization code issued; credentials likely incorrect");
  }
  const tokenRes = await post(
    `${issuer ?? `${baseUrl}/oauth2/v3`}/token`,
    {
      grant_type: "authorization_code",
      client_id: clientId,
      code_verifier: codeVerifier,
      code,
      redirect_uri: `${loc_url.protocol}//${loc_url.host}${loc_url.pathname}`
    },
    {
      headers: {
        Accept: "*/*"
      }
    }
  );
  log(API_RETURN_LEVEL, "TeslaAPI.login() completed.");
  return tokenRes?.data;
};
var logout = async (baseUrl, accessToken) => {
  log(API_CALL_LEVEL, "TeslaJS.logout()");
  const { request } = BaseFetch.instance().getFetch();
  const { data } = await request({
    url: `${baseUrl}/oauth/revoke`,
    method: "POST",
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders(),
      "Content-Type": "application/json; charset=utf-8"
    }
  });
  log(API_RETURN_LEVEL, "TeslaJS.logout() completed.");
  return data;
};
var refreshAccessToken = (baseUrl) => async (refresh_token, scope = "openid email offline_access") => {
  const { post } = BaseFetch.instance().getFetch();
  const res = await post(
    `${baseUrl}/oauth2/v3/token`,
    {
      grant_type: "refresh_token",
      client_id: CLIENT_ID,
      refresh_token,
      scope
    },
    {
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    }
  );
  return res?.data;
};
var getUsersInformation = (baseUrl) => (accessToken) => async () => {
  const { get } = BaseFetch.instance().getFetch();
  const users = await get(`${baseUrl}/api/1/users/me`, {
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders()
    }
  });
  return users?.data?.response ?? null;
};
var getVaultProfile = (baseUrl) => (accessToken) => async () => {
  const { get } = BaseFetch.instance().getFetch();
  const vaultProfile = await get(`${baseUrl}/api/1/users/vault_profile`, {
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders()
    }
  });
  return vaultProfile?.data?.response ?? null;
};
var getFeatureConfig = (baseUrl) => (accessToken) => async () => {
  const { get } = BaseFetch.instance().getFetch();
  const res = await get(`${baseUrl}/api/1/users/feature_config`, {
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders()
    }
  });
  return res?.data?.response ?? null;
};
var getUsersKeys = (baseUrl) => (accessToken) => async (kind, public_key, name, model) => {
  const { post } = BaseFetch.instance().getFetch();
  const vehiclesRes = await post(
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
  );
  return vehiclesRes?.data.response ?? null;
};
var getNotificationPreferences = (baseUrl) => (accessToken) => async (params) => {
  const { get } = BaseFetch.instance().getFetch();
  const { data } = await get(`${baseUrl}/api/1/notification_preferences`, {
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders()
    },
    params
  });
  return data?.response ?? null;
};
var getServiceSchedulingData = (baseUrl) => (accessToken) => async () => {
  const { get } = BaseFetch.instance().getFetch();
  const { data } = await get(`${baseUrl}/api/1/users/service_scheduling_data`, {
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders()
    }
  });
  return data?.response ?? null;
};
var getProducts = (baseUrl) => (accessToken) => async () => {
  const { get } = BaseFetch.instance().getFetch();
  const { data } = await get(`${baseUrl}/api/1/products`, {
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders()
    }
  });
  return data?.response ?? null;
};
var getEnergySites = (baseUrl, name) => (accessToken) => async (siteId, params) => {
  const { get } = BaseFetch.instance().getFetch();
  const { data } = await get(getEnergySitesUri(baseUrl, name)(siteId), {
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders()
    },
    params
  });
  return data?.response ?? null;
};
var getVehiclesList = (baseUrl) => (accessToken) => async () => {
  const { get } = BaseFetch.instance().getFetch();
  const { data } = await get(`${baseUrl}/api/1/vehicles`, {
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders()
    }
  });
  return data?.response ?? null;
};
var getVehicles = (baseUrl) => (accessToken) => async (id) => {
  const { get } = BaseFetch.instance().getFetch();
  const { data } = await get(`${baseUrl}/api/1/vehicles/${id}`, {
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders()
    }
  });
  return data?.response ?? null;
};
var honkHorn = (baseUrl) => (accessToken) => async (id) => {
  const res = await postCommond(baseUrl)(accessToken)(id, "honk_horn");
  return res?.response ?? null;
};
var flashLights = (baseUrl) => (accessToken) => async (id) => {
  const res = await postCommond(baseUrl)(accessToken)(id, "flash_lights");
  return res?.response ?? null;
};
var chargePortDoorClose = (baseUrl) => (accessToken) => async (id) => {
  const res = await postCommond(baseUrl)(accessToken)(id, "charge_port_door_close");
  return res?.response ?? null;
};
var chargePortDoorOpen = (baseUrl) => (accessToken) => async (id) => {
  const res = await postCommond(baseUrl)(accessToken)(id, "charge_port_door_open");
  return res?.response ?? null;
};
var chargeStart = (baseUrl) => (accessToken) => async (id) => {
  const res = await postCommond(baseUrl)(accessToken)(id, "charge_start");
  return res?.response ?? null;
};
var chargeStop = (baseUrl) => (accessToken) => async (id) => {
  const res = await postCommond(baseUrl)(accessToken)(id, "charge_stop");
  return res?.response ?? null;
};
var doorLock = (host) => (accessToken) => async (id) => {
  const honkHornRes = await postCommond(host)(accessToken)(id, "door_lock");
  return honkHornRes?.response ?? null;
};
var doorUnlock = (host) => (accessToken) => async (id) => {
  const flashLightsRes = await postCommond(host)(accessToken)(id, "door_unlock");
  return flashLightsRes?.response ?? null;
};
var homelink = (baseUrl) => (accessToken) => async (id) => {
  const res = await postCommond(baseUrl)(accessToken)(id, "trigger_homelink");
  return res?.response ?? null;
};
var mediaTogglePlayback = (baseUrl) => (accessToken) => async (id) => {
  const honkHornRes = await postCommond(baseUrl)(accessToken)(id, "media_toggle_playback");
  return honkHornRes?.response ?? null;
};
var mediaNextTrack = (baseUrl) => (accessToken) => async (id) => {
  const res = await postCommond(baseUrl)(accessToken)(id, "media_next_track");
  return res?.response ?? null;
};
var mediaPrevTrack = (baseUrl) => (accessToken) => async (id) => {
  const res = await postCommond(baseUrl)(accessToken)(id, "media_prev_track");
  return res?.response ?? null;
};
var mediaNextFav = (baseUrl) => (accessToken) => async (id) => {
  const res = await postCommond(baseUrl)(accessToken)(id, "media_next_fav");
  return res?.response ?? null;
};
var mediaPrevFav = (baseUrl) => (accessToken) => async (id) => {
  const res = await postCommond(baseUrl)(accessToken)(id, "media_prev_fav");
  return res?.response ?? null;
};
var mediaVolumeUp = (baseUrl) => (accessToken) => async (id) => {
  const res = await postCommond(baseUrl)(accessToken)(id, "media_volume_up");
  return res?.response ?? null;
};
var mediaVolumeDown = (baseUrl) => (accessToken) => async (id) => {
  const res = await postCommond(baseUrl)(accessToken)(id, "media_volume_down");
  return res?.response ?? null;
};
var adjustVolume = (baseUrl) => (accessToken) => async (id, volume) => {
  const res = await postCommond(baseUrl, { volume })(accessToken)(id, "adjust_volume");
  return res?.response ?? null;
};
var remoteStartDrive = (baseUrl) => (accessToken) => async (id) => {
  const res = await postCommond(baseUrl)(accessToken)(id, "remote_start_drive");
  return res?.response ?? null;
};
var sunRoofControl = (baseUrl, state) => (accessToken) => async (id) => {
  const res = await postCommond(baseUrl, { state })(accessToken)(id, "sun_roof_control");
  return res?.response ?? null;
};
var wakeUp = (baseUrl) => (accessToken) => async (id) => {
  const res = await postCommond(baseUrl)(accessToken)(id, "wake_up");
  return res?.response ?? null;
};
var getRequestData = (url2) => (accessToken) => async () => {
  const { get } = BaseFetch.instance().getFetch();
  const res = await get(url2, {
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders()
    }
  });
  return res?.data?.response ?? null;
};
var getDataRequest = (baseUrl) => (accessToken) => async (id, dataName, params) => {
  const { get } = BaseFetch.instance().getFetch();
  const { data } = await get(`${baseUrl}${getVehicleDataUri(id, dataName)}`, {
    headers: {
      ...generateBearerToken(accessToken),
      ...getTeslaAppHeaders()
    },
    params
  });
  return data?.response ?? null;
};
var TeslaAppVersion = (appVersion, patch, platform, platformVer) => `TeslaApp/${appVersion}/${patch}/${platform}/${platformVer}`;
var getTeslaAppHeaders = () => ({
  "user-agent": _USER_AGENT,
  "x-tesla-user-agent": _APP_USER_AGENT
});
var generateBearerToken = (accessToken, typeName = "Bearer") => ({
  Authorization: `${typeName} ${accessToken}`
});
var getCommandUri = (id, commandName) => `/api/1/vehicles/${id}/command/${commandName}`;
var postCommond = (baseUrl, body) => (accessToken) => async (id, commandName) => {
  const { post } = BaseFetch.instance().getFetch();
  try {
    const reqData = {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...generateBearerToken(accessToken),
        ...getTeslaAppHeaders()
      },
      data: body
    };
    console.log(API_REQUEST_LEVEL, "\nRequest: " + JSON.stringify(reqData));
    const res = await post(`${baseUrl}${getCommandUri(id, commandName)}`, reqData);
    console.log(API_RESPONSE_LEVEL, "\nResponse: " + JSON.stringify(res));
    return res?.data ?? null;
  } catch (e) {
    console.error(API_ERROR_LEVEL, e);
  }
  return null;
};
var generateCodeVerifier = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const random = import_crypto.default.randomBytes(86);
  let output = "";
  for (let i = 0; i < random.length; i++) {
    output += chars[random[i] % chars.length];
  }
  return output;
};
var generateCodeChallenge = (verifier) => {
  const hash = import_crypto.default.createHash("sha256");
  hash.update(verifier);
  return hash.digest("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};
var randomString = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
var extractHidden = (body) => {
  const returnObject = {};
  let matches = null;
  if (body.matchAll) {
    matches = body.matchAll(/<input (?=[^>]* name=["']([^'"]*)|)(?=[^>]* value=["']([^'"]*)|)/g);
  } else {
    matches = matchAllPolyfill(/<input (?=[^>]* name=["']([^'"]*)|)(?=[^>]* value=["']([^'"]*)|)/g, body);
  }
  for (const match of matches)
    returnObject[match[1]] = match[2];
  return returnObject;
};
var matchAllPolyfill = (regex, input) => {
  const matches = [];
  let match;
  while (null !== (match = regex.exec(input)))
    matches.push(match);
  return matches[Symbol.iterator]();
};
var log = (level, str) => {
  if (logLevel < level)
    return;
  if (level === API_ERROR_LEVEL) {
    console.error("[Tesla-API]", str);
  } else {
    console.log("[Tesla-API]", str);
  }
};

// src/authorize.ts
var AuthorizeApi = class {
  _authorize_host = null;
  _redirect_url = null;
  _locale = null;
  _client_id = null;
  constructor(props) {
    this._authorize_host = props.authorize_url;
    this._locale = props.locale;
    this._client_id = props.client_id;
    this._redirect_url = props.redirect_url;
  }
  login(username, password, mfaDeviceName, mfaPassCode) {
    return apis_exports.login(this._authorize_host, this._redirect_url, this._client_id, this._locale)(username, password, mfaDeviceName, mfaPassCode);
  }
  logout(accessToken) {
    return apis_exports.logout(this._authorize_host, accessToken);
  }
  refreshAccessToken(refreshToken) {
    return apis_exports.refreshAccessToken(this._authorize_host)(refreshToken);
  }
};
var authorize_default = {
  login: apis_exports.login,
  refreshAccessToken: apis_exports.refreshAccessToken
};

// src/users.ts
var UsersApi = class extends Api {
  constructor(props) {
    super(props);
  }
  async getUsersInformation() {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.getUsersInformation(teslamotorsHost)(accessToken)());
  }
  async getVaultProfile() {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.getVaultProfile(teslamotorsHost)(accessToken)());
  }
  async getFeatureConfig() {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.getFeatureConfig(teslamotorsHost)(accessToken)());
  }
  async getServiceSchedulingData() {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.getServiceSchedulingData(teslamotorsHost)(accessToken)());
  }
  async getNotificationPreferences(params) {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.getNotificationPreferences(teslamotorsHost)(accessToken)(params));
  }
  async getUsersKeys(kind, public_key, name, model) {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.getUsersKeys(teslamotorsHost)(accessToken)(kind, public_key, name, model));
  }
};

// src/products.ts
var ProductsApi = class extends Api {
  constructor(props) {
    super(props);
  }
  async getProducts() {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.getProducts(teslamotorsHost)(accessToken)());
  }
};

// src/streams.ts
var StreamsApi = class extends Api {
  _ws_client = null;
  constructor(props) {
    super(props);
  }
  async open() {
  }
  buildConnectMessage = async (userId, vehicleId, token) => {
    const accessToken = token ?? (await this.obtainAccessToken()).access_token;
    const message = {
      msg_type: "data:subscribe_oauth",
      token: accessToken,
      value: "speed,odometer,soc,elevation,est_heading,est_lat,est_lng,power,shift_state,range,est_range,heading",
      tag: vehicleId
    };
    this._ws_client?.send(JSON.stringify(message));
  };
};

// src/vehicles.ts
var VehiclesApi = class extends Api {
  constructor(props) {
    super(props);
  }
  async getVehiclesList() {
    const accessToken = await this.obtainAccessToken();
    const act = accessToken?.access_token;
    return act ? await apis_exports.getVehiclesList(this.getTeslamotorsHost())(act)() : null;
  }
  async getVehicles(id) {
    const accessToken = await this.obtainAccessToken();
    const act = accessToken?.access_token;
    return act ? await apis_exports.getVehicles(this.getTeslamotorsHost())(act)(id) : null;
  }
};

// src/vehicle/data.ts
var VehicleDataApi = class extends Api {
  constructor(props) {
    super(props);
  }
  getVehicleData(id, dataName, params) {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.getDataRequest(teslamotorsHost)(accessToken)(id, dataName, params));
  }
};

// src/vehicle/alerts.ts
var AlertsApi = class extends Api {
  constructor(props) {
    super(props);
  }
  /**
   * 点击指定ID的喇叭按钮。
   *
   * @param {number} id - 要为之鸣笛的项的ID。
   * @return {Promise<ICommondResult<boolean>>} 一个 Promise，它解析为喇叭操作的结果。
   */
  honkHorn(id) {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.honkHorn(teslamotorsHost)(accessToken)(id));
  }
  /**
   * 执行一个命令来闪烁特定ID的灯光。
   *
   * @param {number} id - 要闪烁的灯光的ID。
   * @return {Promise<ICommondResult<boolean>>} 一个解析为命令结果的Promise。
   */
  flashLights(id) {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.flashLights(teslamotorsHost)(accessToken)(id));
  }
};

// src/vehicle/doors.ts
var DoorsApi = class extends Api {
  constructor(props) {
    super(props);
  }
  doorLock(id) {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.doorLock(teslamotorsHost)(accessToken)(id));
  }
  doorUnlock(id) {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.doorUnlock(teslamotorsHost)(accessToken)(id));
  }
};

// src/vehicle/homelink.ts
var HomelinkApi = class extends Api {
  constructor(props) {
    super(props);
  }
  homelink(id, latitude, longitude) {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.homelink(`${teslamotorsHost}?lat=${latitude}&lon=${longitude}`)(accessToken)(id));
  }
};

// src/vehicle/media.ts
var MediaApi = class extends Api {
  constructor(props) {
    super(props);
  }
  mediaTogglePlayback(id) {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.mediaTogglePlayback(teslamotorsHost)(accessToken)(id));
  }
  mediaNextTrack(id) {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.mediaNextTrack(teslamotorsHost)(accessToken)(id));
  }
  mediaPrevTrack(id) {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.mediaPrevTrack(teslamotorsHost)(accessToken)(id));
  }
  mediaNextFav(id) {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.mediaNextFav(teslamotorsHost)(accessToken)(id));
  }
  mediaPrevFav(id) {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.mediaPrevFav(teslamotorsHost)(accessToken)(id));
  }
  mediaVolumeUp(id) {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.mediaVolumeUp(teslamotorsHost)(accessToken)(id));
  }
  mediaVolumeDown(id) {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.mediaVolumeDown(teslamotorsHost)(accessToken)(id));
  }
  adjustVolume(userId, id, volume) {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.adjustVolume(teslamotorsHost)(accessToken)(id, volume));
  }
};

// src/vehicle/remote_control.ts
var RemoteControlApi = class extends Api {
  constructor(props) {
    super(props);
  }
  remoteStartDrive(id) {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.remoteStartDrive(teslamotorsHost)(accessToken)(id));
  }
};

// src/vehicle/state.ts
var VehicleStateApi = class extends Api {
  constructor(props) {
    super(props);
  }
  // public async getState<T>(id: string | number, stateName: VehicleStateNames) {
  //   const url = `${this.getTeslamotorsUrl()}${getStateUri(id, stateName)}`
  //   const accessToken = await this.obtainAccessToken!!()
  //   const act = accessToken?.access_token
  //   return act ? await getRequestData(url)(act)<T>() : null
  // }
  getState(id, stateName) {
    return this.execute(({ teslamotorsHost }, accessToken) => apis_exports.getRequestData(`${teslamotorsHost}${apis_exports.getStateUri(id, stateName)}`)(accessToken)());
  }
};

// src/token-manager.ts
var InMemoryTokenManager = class _InMemoryTokenManager {
  static _accessTokens = {};
  findAll() {
    return new Promise((resolve) => resolve(_InMemoryTokenManager._accessTokens ?? {}));
  }
  accessToken(userId) {
    return new Promise((resolve) => resolve(_InMemoryTokenManager._accessTokens?.[userId] ?? null));
  }
  findLastAccessToken(userId) {
    return new Promise((resolve) => resolve(_InMemoryTokenManager._accessTokens?.[userId] ?? null));
  }
  toAccessToken(userId, token) {
    _InMemoryTokenManager._accessTokens[`${userId}`] = token;
  }
  clean() {
    _InMemoryTokenManager._accessTokens = {};
  }
};

// src/tesla-api.ts
var { REDIRECT_URL: REDIRECT_URL2, SSO_BASE_HOST, LOCALE, API_BASE_HOST, STREAMING_HOST, SSO_CLIENT_ID } = config.tesla;
var TeslaAPI = class _TeslaAPI {
  _config = {
    redirectUrl: "",
    ossAuthorizeHost: "",
    streamingHost: "",
    teslamotorsHost: "",
    locale: null,
    clientId: null,
    userAgent: null,
    appUserAgent: null
  };
  // private _authorizeApi: AuthorizeApi | null = null
  _dataSource = new InMemoryTokenManager();
  constructor() {
    this.toDefault();
  }
  /**
   * 初始化默认环境变量参数.
   *
   * @returns
   */
  toDefault() {
    this._config.locale = LOCALE;
    this._config.clientId = SSO_CLIENT_ID;
    this._config.ossAuthorizeHost = SSO_BASE_HOST;
    this._config.streamingHost = STREAMING_HOST;
    this._config.teslamotorsHost = API_BASE_HOST;
    this._config.redirectUrl = REDIRECT_URL2;
    return this;
  }
  fetch(fetch) {
    BaseFetch.instance().fetch(fetch);
    return this;
  }
  datasource(datasource) {
    this._dataSource = datasource;
    return this;
  }
  logger(logger) {
    Logwatch.instance().logger(logger);
    return this;
  }
  userTeslaAPIs = (userId) => {
    const t = this._dataSource.findLastAccessToken(userId);
    if (!t)
      throw new Error(`${userId} isn't logged in.`);
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
    };
  };
  /**
   *  创建并返回 AuthorizeApi 实例
   * @returns
   */
  authorize() {
    const { ossAuthorizeHost, locale, clientId, userAgent, redirectUrl, appUserAgent } = this._config;
    if (!(ossAuthorizeHost && redirectUrl && locale && clientId))
      throw new Error("TelsaAPI.authorize() occur exception !!!");
    return new AuthorizeApi({
      redirect_url: redirectUrl,
      authorize_url: ossAuthorizeHost,
      client_id: clientId,
      locale,
      user_agent: userAgent,
      app_user_agent: appUserAgent
    });
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
  login = (username, password, mfaDeviceName = null, mfaPassCode = null) => {
    return this.authorize().login(username, password, mfaDeviceName, mfaPassCode).then((res) => {
      if (res !== null)
        this._dataSource.toAccessToken(username, res);
      return res;
    });
  };
  // private checkAccessToken = () => {
  //   if (!this._authorizeApi) throw new Error('obtainAccessToken is NULL.')
  // }
  checkTeslamotorsHost = () => {
    if (!this._config.teslamotorsHost)
      throw new Error("teslamotors_host is NULL.");
  };
  options = (userId) => {
    const obtainAccessTokenFn = () => new Promise((resolve, reject) => {
      this._dataSource.findLastAccessToken(userId).then((res) => {
        if (res) {
          resolve(res);
        } else {
          reject(new Error(`${userId} isn't logged in.`));
        }
      }).catch((e) => reject(e));
    });
    const { ossAuthorizeHost, redirectUrl, streamingHost, teslamotorsHost, locale, clientId, userAgent, appUserAgent } = this._config;
    return {
      obtainAccessTokenFn,
      config: {
        redirectUrl,
        ossAuthorizeHost,
        streamingHost,
        teslamotorsHost,
        locale,
        clientId,
        userAgent,
        appUserAgent
      }
    };
  };
  /**
   * vehicles: 通过调用 createApiInstance(VehiclesApi, this.options(userId)) 来创建并返回一个 VehiclesApi 实例，用于处理与车辆信息相关的操作。
   * @returns
   */
  vehicles = (userId) => this.createApiInstance(VehiclesApi, this.options(userId));
  /**
   * users: 通过调用 createApiInstance(UsersApi, this.options(userId)) 来创建并返回一个 UsersApi 实例，用于处理与用户信息相关的操作。
   * @returns
   */
  users = (userId) => this.createApiInstance(UsersApi, this.options(userId));
  /**
   * streams: 通过调用 createApiInstance(StreamsApi, this.options(userId)) 来创建并返回一个 StreamsApi 实例，用于处理与数据流相关的操作。
   * @returns
   */
  streams = (userId) => this.createApiInstance(StreamsApi, this.options(userId));
  /**
   * vehicleState: 通过调用 createApiInstance(VehicleStateApi, this.options(userId)) 来创建并返回一个 VehicleStateApi 实例，用于处理与车辆状态相关的操作。
   * @deprecated
   * @returns  目前返回可能为404
   */
  vehicleState = (userId) => this.createApiInstance(VehicleStateApi, this.options(userId));
  vehicleData = (userId) => this.createApiInstance(VehicleDataApi, this.options(userId));
  vehicleCommonds_Alerts = (userId) => this.createApiInstance(AlertsApi, this.options(userId));
  vehicleCommonds_Doors = (userId) => this.createApiInstance(DoorsApi, this.options(userId));
  vehicleCommonds_Homelink = (userId) => this.createApiInstance(HomelinkApi, this.options(userId));
  vehicleCommonds_RemoteControl = (userId) => this.createApiInstance(RemoteControlApi, this.options(userId));
  vehicleCommonds_Media = (userId) => this.createApiInstance(MediaApi, this.options(userId));
  /**
   * products: 通过调用 createApiInstance(ProductsApi, this.options(userId)) 来创建并返回一个 ProductsApi 实例，用于处理与产品信息相关的操作。
   */
  products = (userId) => this.createApiInstance(ProductsApi, this.options(userId));
  locale(locale) {
    this._config.locale = locale;
    return this;
  }
  authorizeHost(authorizeUrl) {
    this._config.ossAuthorizeHost = authorizeUrl;
    return this;
  }
  teslamotorsHost(url2) {
    this._config.teslamotorsHost = url2;
    return this;
  }
  streamingHost(url2) {
    this._config.streamingHost = url2;
    return this;
  }
  clientId(clientId) {
    this._config.clientId = clientId;
    return this;
  }
  static Builder() {
    return new _TeslaAPI();
  }
  /**
   *  通过 options 创建不同类型的 API 实例
   * @param apiClass 构造函数，用于创建指定类型的 API 实例。
   * @param confg 这是一个包含 obtainAccessTokenFn 和 config 的对象，用于为 API 实例提供配置和获取 AccessToken 函数。
   * @returns
   */
  createApiInstance(apiClass, confg) {
    this.checkTeslamotorsHost();
    return new apiClass(confg);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseFetch,
  ConsoleLogger,
  InMemoryTokenManager,
  Logwatch,
  NoLogger,
  TeslaAPI,
  TeslaAppVersion,
  adjustVolume,
  chargePortDoorClose,
  chargePortDoorOpen,
  chargeStart,
  chargeStop,
  doorLock,
  doorUnlock,
  extractHidden,
  flashLights,
  generateBearerToken,
  getCommandUri,
  getDataRequest,
  getEnergySites,
  getEnergySitesUri,
  getFeatureConfig,
  getNotificationPreferences,
  getProducts,
  getRequestData,
  getServiceSchedulingData,
  getStateUri,
  getStateUri_Special,
  getTeslaAppHeaders,
  getUsersInformation,
  getUsersKeys,
  getVaultProfile,
  getVehicleDataUri,
  getVehicles,
  getVehiclesList,
  homelink,
  honkHorn,
  login,
  logout,
  mediaNextFav,
  mediaNextTrack,
  mediaPrevFav,
  mediaPrevTrack,
  mediaTogglePlayback,
  mediaVolumeDown,
  mediaVolumeUp,
  postCommond,
  randomString,
  refreshAccessToken,
  remoteStartDrive,
  sunRoofControl,
  wakeUp
});
