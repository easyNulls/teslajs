import { Api } from '@/ext'
import { ApiOptions, ICommondResult } from '@/typings.d'
import { APIs } from '@/kits'

/**
 * https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/sunroof.md
 *
 */
export class SunRoofApi extends Api {
  constructor(props: ApiOptions) {
    super(props)
  }

  /**
   *  "open"：打开天窗。
      "close"：关闭天窗。
      "vent"：将天窗设置为通风状态。
      "comfort"：将天窗设置为舒适模式，可能会稍微打开以实现通风效果。
   * @param id 
   * @param {string} state - one of "vent", "close"
   * @returns 
   */
  public sunRoofControl(id: number, state: string | 'vent' | 'close') {
    return this.execute<ICommondResult<boolean>>(({ teslamotorsHost }, accessToken) => APIs.sunRoofControl(teslamotorsHost, state)(accessToken)(id))
  }
}
