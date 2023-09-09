import { Api } from '@/ext'
import { ApiOptions, ICommondResult } from '@/typings.d'
import { APIs } from '@/kits'

// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/remotestart.md
export class RemoteControlApi extends Api {
  constructor(props: ApiOptions) {
    super(props)
  }

  public remoteStartDrive(id: number) {
    return this.execute<ICommondResult<boolean>>(({ teslamotorsHost }, accessToken) => APIs.remoteStartDrive(teslamotorsHost)(accessToken)(id))
  }
}
