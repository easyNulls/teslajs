import { APIs } from '@/kits'
import { Api } from '@/ext'
import { ApiOptions, ICommondResult } from '@/typings.d'

export class ChargingApi extends Api {
  constructor(props: ApiOptions) {
    super(props)
  }

  public chargePortDoorClose(id: number) {
    return this.execute<ICommondResult<boolean>>(({ teslamotorsHost }, accessToken) => APIs.chargePortDoorClose(teslamotorsHost)(accessToken)(id))
  }

  public chargePortDoorOpen(id: number) {
    return this.execute<ICommondResult<boolean>>(({ teslamotorsHost }, accessToken) => APIs.chargePortDoorOpen(teslamotorsHost)(accessToken)(id))
  }

  public chargeStart(id: number) {
    return this.execute<ICommondResult<boolean>>(({ teslamotorsHost }, accessToken) => APIs.chargeStart(teslamotorsHost)(accessToken)(id))
  }

  public chargeStop(id: number) {
    return this.execute<ICommondResult<boolean>>(({ teslamotorsHost }, accessToken) => APIs.chargeStop(teslamotorsHost)(accessToken)(id))
  }
}
