import { Api } from '@/ext'

import { VehicleStateNames, ApiOptions } from '@/typings.d'
import { APIs } from '@/kits'

/**
 * @deprecated
 */
export class VehicleStateApi extends Api {
  constructor(props: ApiOptions) {
    super(props)
  }

  // public async getState<T>(id: string | number, stateName: VehicleStateNames) {
  //   const url = `${this.getTeslamotorsUrl()}${getStateUri(id, stateName)}`

  //   const accessToken = await this.obtainAccessToken!!()
  //   const act = accessToken?.access_token
  //   return act ? await getRequestData(url)(act)<T>() : null
  // }
  public getState<T>(id: string | number, stateName: VehicleStateNames) {
    return this.execute<T>(({ teslamotorsHost }, accessToken) => APIs.getRequestData(`${teslamotorsHost}${APIs.getStateUri(id, stateName)}`)(accessToken)<T>())
  }
}
