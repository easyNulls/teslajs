import { Api } from '@/ext'

import { ApiOptions } from '@/typings.d'
import { APIs } from '@/kits'

export class VehiclesApi extends Api {
  constructor(props: ApiOptions) {
    super(props)
  }

  public async getVehiclesList() {
    const accessToken = await this.obtainAccessToken()
    const act = accessToken?.access_token
    return act ? await APIs.getVehiclesList(this.getTeslamotorsHost())(act)() : null
  }

  public async getVehicles(id: number) {
    const accessToken = await this.obtainAccessToken()
    const act = accessToken?.access_token
    return act ? await APIs.getVehicles(this.getTeslamotorsHost())(act)(id) : null
  }
}
