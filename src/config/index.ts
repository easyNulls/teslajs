export const CLIENT_ID = 'ownerapi'

export const OSS_HOST_CN = 'https://auth.tesla.cn'
export const OSS_HOST = 'https://auth.tesla.com'

export const AUTHORIZE_URL = `${OSS_HOST}/oauth2/v3/authorize`
export const REDIRECT_URL = 'https://auth.tesla.com/void/callback'

// export const TOKEN_URL = `${OSS_HOST}/oauth2/v3/token`
// export const TOKEN_URL_CN = `${OSS_HOST_CN}/oauth2/v3/token`

export const _USER_AGENT = 'Tesla/4.23.6 (com.teslamotors.TeslaApp; build:1844; iOS 16.6.0) Alamofire/5.2.1'
export const _APP_USER_AGENT = 'TeslaApp/4.23.6-1844/074a3374b7/ios/16.6'

// export const _USER_AGENT_WEBVIEW_IOS = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
// export const _USER_AGENT_CHROME_MACOSX = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'

// :chinese -> "wss://streaming.vn.cloud.tesla.cn/streaming/"
// _global -> "wss://streaming.vn.teslamotors.com/streaming/"
type IConfig = {
  tesla: {
    LOCALE: string
    SSO_BASE_HOST: string
    API_BASE_HOST: string
    STREAMING_HOST: string
    APP_USER_AGENT: string
    SSO_CLIENT_ID: string
    REDIRECT_URL: string
  }
}

export const config: IConfig = {
  // https://tesla-api.timdorr.com/
  tesla: {
    LOCALE: 'zh-CN',
    REDIRECT_URL,
    SSO_BASE_HOST: OSS_HOST_CN,
    // API_BASE_URL: 'https://owner-api.teslamotors.com',
    API_BASE_HOST: 'https://owner-api.vn.cloud.tesla.cn',
    STREAMING_HOST: 'wss://streaming.vn.teslamotors.com',
    SSO_CLIENT_ID: CLIENT_ID,
    APP_USER_AGENT: _USER_AGENT
  }
}
