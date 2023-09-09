import { Api } from '@/ext'
import { EnabledVin, NotificationSettings, ApiOptions, NotificationPreferencesParams, UserMe, FeatureConfig } from '@/typings.d'
import { APIs } from '@/kits'

/// https://github.com/timdorr/tesla-api/blob/master/docs/api-basics/users.md

export class UsersApi extends Api {
  constructor(props: ApiOptions) {
    super(props)
  }

  public async getUsersInformation() {
    // const accessToken = await this.obtainAccessToken!!()
    // const act = accessToken?.access_token
    // return act ? await getUsersInformation(this.getTeslamotorsHost())(act)() : null
    return this.execute<UserMe>(({ teslamotorsHost }, accessToken) => APIs.getUsersInformation(teslamotorsHost)(accessToken)())
  }

  public async getVaultProfile() {
    // const accessToken = await this.obtainAccessToken!!()
    // const act = accessToken?.access_token
    // return act ? await getVaultProfile(this.getTeslamotorsHost())(act)() : null
    return this.execute<{ vault: string }>(({ teslamotorsHost }, accessToken) => APIs.getVaultProfile(teslamotorsHost)(accessToken)())
  }

  public async getFeatureConfig() {
    return this.execute<FeatureConfig>(({ teslamotorsHost }, accessToken) => APIs.getFeatureConfig(teslamotorsHost)(accessToken)())

    // const accessToken = await this.obtainAccessToken!!()
    // const act = accessToken?.access_token
    // return act ? await getFeatureConfig(this.getTeslamotorsHost())(act)() : null
  }

  public async getServiceSchedulingData() {
    // const accessToken = await this.obtainAccessToken!!()
    // const act = accessToken?.access_token
    // return act ? await getServiceSchedulingData(this.getTeslamotorsHost())(act)() : null
    return this.execute<Array<EnabledVin>>(({ teslamotorsHost }, accessToken) => APIs.getServiceSchedulingData(teslamotorsHost)(accessToken)())
  }

  public async getNotificationPreferences(params: NotificationPreferencesParams) {
    // const accessToken = await this.obtainAccessToken!!()
    // const act = accessToken?.access_token
    // return act ? await getNotificationPreferences(this.getTeslamotorsHost())(act)(params) : null
    return this.execute<NotificationSettings>(({ teslamotorsHost }, accessToken) => APIs.getNotificationPreferences(teslamotorsHost)(accessToken)(params))
  }

  public async getUsersKeys(kind: string, public_key: string, name: string, model: string) {
    // const accessToken = await this.obtainAccessToken!!()
    // const act = accessToken?.access_token
    // return act ? await getUsersKeys(this.getTeslamotorsHost())(act)(kind, public_key, name, model) : null
    return this.execute<boolean>(({ teslamotorsHost }, accessToken) => APIs.getUsersKeys(teslamotorsHost)(accessToken)(kind, public_key, name, model))
  }
}
