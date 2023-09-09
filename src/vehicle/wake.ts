import { APIs } from '@/kits'
import { Api } from '@/ext'
import { ApiOptions, ICommondResult } from '@/typings.d'

// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/wake.md
export class WakeApi extends Api {
  constructor(props: ApiOptions) {
    super(props)
  }

  public wakeUp(id: number) {
    return this.execute<ICommondResult<boolean>>(({ teslamotorsHost }, accessToken) => APIs.wakeUp(teslamotorsHost)(accessToken)(id))
  }
}
