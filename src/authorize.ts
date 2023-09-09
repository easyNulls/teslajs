import { OrNullable } from '@/typings.d'

import { AccessToken } from '@/typings.d'
import { APIs } from '@/kits'

export class AuthorizeApi {
  private _authorize_host: OrNullable<string> = null

  private _redirect_url: OrNullable<string> = null

  private _locale: OrNullable<string> = null

  private _client_id: OrNullable<string> = null

  constructor(props: { client_id: string; authorize_url: string; locale: OrNullable<string>; user_agent: OrNullable<string>; app_user_agent: OrNullable<string>; redirect_url: OrNullable<string> }) {
    this._authorize_host = props.authorize_url
    this._locale = props.locale
    this._client_id = props.client_id
    this._redirect_url = props.redirect_url
  }

  public login(username: string, password: string, mfaDeviceName?: OrNullable<string>, mfaPassCode?: OrNullable<string>): Promise<AccessToken | null> {
    return APIs.login(this._authorize_host!!, this._redirect_url!!, this._client_id!!, this._locale!!)(username, password, mfaDeviceName, mfaPassCode)
  }

  public logout(accessToken: string): Promise<Record<string, any>> {
    return APIs.logout(this._authorize_host!!, accessToken)
  }

  public refreshAccessToken(refreshToken: string): Promise<AccessToken> {
    return APIs.refreshAccessToken(this._authorize_host!!)(refreshToken)
  }
}

export default {
  login: APIs.login,
  logout: APIs.logout,
  refreshAccessToken: APIs.refreshAccessToken
}
