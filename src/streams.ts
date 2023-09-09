// import { WebSocket } from 'ws'
import { ApiOptions, OrNullable } from '@/typings.d'
// import { generateBearerToken, getTeslaAppHeaders } from '@/ext'
import { Api } from '@/ext'

export class StreamsApi extends Api {
  private _ws_client: WebSocket | null = null
  constructor(props: ApiOptions) {
    super(props)
  }

  public async open() {
    // const accessToken = (await this.obtainAccessToken!!())?.access_token
    // if (!accessToken) throw new Error('obtainAccessToken exception.')
    // // this._ws_client = new WebSocket(`wss://signaling.vn.cloud.tesla.cn/v1/mobile`, {
    // this._ws_client = new WebSocket(`${this.getStreamingUrl()}/streaming/`, {
    //   perMessageDeflate: false,
    //   headers: {
    //     ...generateBearerToken(accessToken),
    //     ...getTeslaAppHeaders()
    //   }
    // })
    // this._ws_client?.on('open', () => {
    //   console.log(`Connection opened`)
    // })
    // this._ws_client?.on('message', data => {
    // const jsonMessage = JSON.parse(data.toString('utf-8'))
    // WS received: {
    //     msg_type: 'data:update',
    //     tag: '1126258897479911',
    //     value: '1691806835082,14,18951.7,80,-37,120,32.087083,118.700685,5,D,211,210,120'
    // }
    // time: DateTime.strptime((attributes[0].to_i / 1000).to_s, "%s"),
    // speed: attributes[1].to_f,
    // odometer: attributes[2].to_f,
    // soc: attributes[3].to_f,
    // elevation: attributes[4].to_f,
    // est_heading: attributes[5].to_f,
    // est_lat: attributes[6].to_f,
    // est_lng: attributes[7].to_f,
    // power: attributes[8].to_f,
    // shift_state: attributes[9].to_s,
    // range: attributes[10].to_f,
    // est_range: attributes[11].to_f,
    // heading: attributes[12].to_f
    //   console.log('WS received:', data.toString('utf-8'))
    // })
    // this._ws_client?.on('error', err => {
    //   console.log(err.message)
    // })
    // this._ws_client?.on('close', (code, reason) => {
    //   console.log(code, reason)
    // })
    // this._ws_client?.on('ping', data => {
    //   console.log(data)
    // })
    // this._ws_client?.on('pong', data => {
    //   console.log(data)
    // })
  }

  public buildConnectMessage = async (vehicleId: string, token?: OrNullable<string>) => {
    const accessToken = token ?? (await this.obtainAccessToken())!!.access_token
    const message = {
      msg_type: 'data:subscribe_oauth',
      token: accessToken,
      value: 'speed,odometer,soc,elevation,est_heading,est_lat,est_lng,power,shift_state,range,est_range,heading',
      tag: vehicleId
    }
    this._ws_client?.send(JSON.stringify(message))
  }
}

// type MsgTypes = 'data:subscribe_oauth' | 'data:error' | 'data:update' | 'control:hello' | string
// type ErrorTypes = 'vehicle_disconnected' | 'client_error' | string

// type StreamingMessage = {
//   error_type?: ErrorTypes | null
//   msg_type: MsgTypes | null
//   token: string
//   value: string
//   tag: string
// }
