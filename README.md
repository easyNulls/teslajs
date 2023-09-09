# @0tag/tesla-js
[![Version](http://img.shields.io/npm/v/@0tag/tesla-js.png)](https://www.npmjs.org/package/@0tag/tesla-js)
[![License](https://img.shields.io/npm/l/@0tag/tesla-js.svg)](https://github.com/easynulls/tesla-js/blob/master/LICENSE)
[![Dependencies](https://david-dm.org/easynulls/@0tag/tesla-js.svg)](https://david-dm.org/easynulls/@0tag/tesla-js)
[![Downloads](https://img.shields.io/npm/dt/@0tag/tesla-js.svg)](https://www.npmjs.org/package/@0tag/tesla-js)

Tesla APIs NodeJS版本(持续更新ing)

提供了车机状态查询、车机部分功能的控制

[![NPM](https://nodei.co/npm/@0tag/tesla-js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@0tag/tesla-js/)

## 📦 安装方式


```shell
npm install @0tag/tesla-js --save
```

```shell
yarn add @0tag/tesla-js
```

## 功能介绍
该库不依赖第三方fetch、故在使用该库需要自行实现Fetch与TokenDataSource接口来扩展。
TokenDataSource: 提供teslaAPI所需的AccessToken数据储存接口；
Fetch: 提供访问TeslaAPI所需的GET/POST/REQUEST函数接口。

```
import AxiosInstance from './index'
import { Response, RequestConfig, Fetch } from '@0tag/tesla-js'

export class AxiosFetch implements Fetch {

	async request<T = any, R = Response<T>, D = any>(config: RequestConfig<D>): Promise<R> {
		const res = await AxiosInstance.request<T>({
			...config
		})
		return <R>{
			data: res?.data,
			status: res?.status,
			statusText: res?.statusText,
			headers: res?.headers,
			config: {
				...res?.config
			}
		}
	}

	async get<T = any, R = Response<T>, D = any>(url: string, config?: RequestConfig<D>): Promise<R> {
		const res = await AxiosInstance.get<T>(url, { ...config })
		return <R>{
			data: res?.data,
			status: res?.status,
			statusText: res?.statusText,
			headers: res?.headers,
			config: {
				...res?.config
			}
		}
	}

	async post<T = any, R = Response<T>, D = any>(url: string, data?: D, config?: RequestConfig<D> | undefined): Promise<R> {
		const res = await AxiosInstance.post<T>(url, data, { ...config })
		return <R>{
			data: res?.data,
			status: res?.status,
			statusText: res?.statusText,
			headers: res?.headers,
			config: {
				...res?.config
			}
		}
	}
}


```

### TeslaAPI提供了以下的API
 可根存储的用户唯一编号来初始化并获取对应的API
```

	userTeslaAPIs: (userId: string) => {
		vehicles: VehiclesApi;     
		users: UsersApi;
		products: ProductsApi;      
		streams: StreamsApi;
		vehicleState: VehicleStateApi;
		vehicleData: VehicleDataApi;
		vehicleCommonds_Alerts: AlertsApi;
		vehicleCommonds_Doors: DoorsApi;
		vehicleCommonds_Homelink: HomelinkApi;
		vehicleCommonds_Media: MediaApi;
		vehicleCommonds_RemoteControl: RemoteControlApi;
	};
```

## 使用教程

``` typescript

//初始化
const TeslaAPIs = TeslaAPI.Builder()
	.toDefault()
	.datasource(new PrismaUserTeslaSource())
	.fetch(new AxiosFetch())

//tesla 账户登录 
TeslaAPIs.authorize()
  .login(username: string,                    // email账户
      password: string,                       // 密码
      mfaDeviceName?: OrNullable<string>,     // 开启了MFA功能的设备
      mfaPassCode?: OrNullable<string>)       // MFA验证码


TeslaAPIs.userTeslaAPIs(userId)
    .users.getUsersInformation()              //获取账户信息
```




