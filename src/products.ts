import { Api } from '@/ext'
import { TeslaVehicleConfig, ApiOptions, ProductsData } from '@/typings.d'
import { APIs } from '@/kits'

/// https://github.com/timdorr/tesla-api/blob/b0c8e90c7c7d10604866ec7262d2e7d96d5070b4/docs/api-basics/products.md
export class ProductsApi extends Api {
  constructor(props: ApiOptions) {
    super(props)
  }

  public async getProducts() {
    return this.execute<Array<ProductsData | TeslaVehicleConfig>>(({ teslamotorsHost }, accessToken) => APIs.getProducts(teslamotorsHost)(accessToken)())
  }
}
