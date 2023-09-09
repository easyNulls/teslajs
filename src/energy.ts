import { ApiOptions, EnergyInfo, GeneralSystemInfo, SiteInfo } from '@/typings.d'
import { Api } from '@/ext'
import { APIs } from '@/kits'

export class EnergyApi extends Api {
  constructor(props: ApiOptions) {
    super(props)
  }

  /**
   * 当前备用电源系统还能维持供电的剩余时间，通常以小时或分钟为单位。
   *
   * 获取备用电池蓄电系统在脱离电网情况下的剩余备用时间。
   * @param siteId  站点ID
   * @returns
   */
  public backupTimeRemaining(siteId: string, savings_forecast: string) {
    return this.execute<{ backup_time_remaining: number }>(({ teslamotorsHost: teslamotorsUrl }, accessToken) =>
      APIs.getEnergySites<{ backup_time_remaining: number }>(teslamotorsUrl, 'backup_time_remaining')(accessToken)(siteId, { savings_forecast })
    )
  }

  /**
   * 获取当前系统信息（例如太阳能发电、电网出口/进口、家庭消耗等）。
   * @param siteId  站点ID
   * @returns
   */
  public liveStatus(siteId: string, savings_forecast: string) {
    return this.execute<EnergyInfo>(({ teslamotorsHost }, accessToken) => APIs.getEnergySites<EnergyInfo>(teslamotorsHost, 'live_status')(accessToken)(siteId, { savings_forecast }))
  }

  /**
   * 获取一般系统信息。
   * @param siteId  站点ID
   * @returns
   */
  public siteStatus(siteId: string) {
    return this.execute<GeneralSystemInfo>(({ teslamotorsHost }, accessToken) => APIs.getEnergySites<GeneralSystemInfo>(teslamotorsHost, 'site_status')(accessToken)(siteId, {}))
  }

  /**
   * 获取一般系统信息。
   * @param siteId  站点ID
   * @returns
   */
  public siteInfo(siteId: string) {
    return this.execute<SiteInfo>(({ teslamotorsHost }, accessToken) => APIs.getEnergySites<SiteInfo>(teslamotorsHost, 'site_info')(accessToken)(siteId, {}))
  }
}
