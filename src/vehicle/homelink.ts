import { APIs } from '@/kits'
import { Api } from '@/ext'
import { ApiOptions, ICommondResult } from '@/typings.d'

// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/alerts.md
export class HomelinkApi extends Api {
  constructor(props: ApiOptions) {
    super(props)
  }

  public homelink(id: number, latitude: number, longitude: number) {
    return this.execute<ICommondResult<boolean>>(({ teslamotorsHost }, accessToken) => APIs.homelink(`${teslamotorsHost}?lat=${latitude}&lon=${longitude}`)(accessToken)(id))
  }
}
