import { APIs } from '@/kits'
import { Api } from '@/ext'
import { ApiOptions, ICommondResult } from '@/typings.d'

// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/alerts.md
export class AlertsApi extends Api {
  constructor(props: ApiOptions) {
    super(props)
  }

  /**
   * 点击指定ID的喇叭按钮。
   *
   * @param {number} id - 要为之鸣笛的项的ID。
   * @return {Promise<ICommondResult<boolean>>} 一个 Promise，它解析为喇叭操作的结果。
   */
  public honkHorn(id: number) {
    return this.execute<ICommondResult<boolean>>(({ teslamotorsHost }, accessToken) => APIs.honkHorn(teslamotorsHost)(accessToken)(id))
  }

  /**
   * 执行一个命令来闪烁特定ID的灯光。
   *
   * @param {number} id - 要闪烁的灯光的ID。
   * @return {Promise<ICommondResult<boolean>>} 一个解析为命令结果的Promise。
   */
  public flashLights(id: number) {
    return this.execute<ICommondResult<boolean>>(({ teslamotorsHost }, accessToken) => APIs.flashLights(teslamotorsHost)(accessToken)(id))
  }
}
