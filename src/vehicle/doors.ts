import { APIs } from '@/kits'
import { Api } from '@/ext'
import { ApiOptions, ICommondResult } from '@/typings.d'

// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/alerts.md
export class DoorsApi extends Api {
  constructor(props: ApiOptions) {
    super(props)
  }

  public doorLock(id: number) {
    return this.execute<ICommondResult<boolean>>(({ teslamotorsHost }, accessToken) => APIs.doorLock(teslamotorsHost)(accessToken)(id))
  }

  public doorUnlock(id: number) {
    return this.execute<ICommondResult<boolean>>(({ teslamotorsHost }, accessToken) => APIs.doorUnlock(teslamotorsHost)(accessToken)(id))
  }
}
