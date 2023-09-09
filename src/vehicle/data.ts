import { VehicleData, ApiOptions, VehicleDataNames } from '@/typings.d'

import { Api } from '@/ext'
import { APIs } from '@/kits'

export class VehicleDataApi extends Api {
  constructor(props: ApiOptions) {
    super(props)
  }

  public getVehicleData(id: number, dataName: VehicleDataNames, params: Record<string, any>) {
    return this.execute<VehicleData>(({ teslamotorsHost }, accessToken) => APIs.getDataRequest(teslamotorsHost)(accessToken)(id, dataName, params))
  }
}
