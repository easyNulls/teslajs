export interface Fetch {
  request<T = any, R = Response<T>, D = any>(config: RequestConfig<D>): Promise<R>
  get<T = any, R = Response<T>, D = any>(url: string, config?: RequestConfig<D>): Promise<R>
  post<T = any, R = Response<T>, D = any>(url: string, data?: D, config?: RequestConfig<D>): Promise<R>
}

export interface Response<T = any> {
  data: T
  status: number
  statusText: string
  headers?: any
  config: RequestConfig
}

export interface RequestConfig<D = any> {
  url?: string
  method?: string | 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD'
  baseURL?: string
  headers?: any
  params?: any
  data?: D
  timeout?: number
  withCredentials?: boolean
  maxRedirects?: number
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

  responseEncoding?: Encoding | string

  httpAgent?: any
  httpsAgent?: any
}

export type Encoding =
  | 'ascii'
  | 'ASCII'
  | 'ansi'
  | 'ANSI'
  | 'binary'
  | 'BINARY'
  | 'base64'
  | 'BASE64'
  | 'base64url'
  | 'BASE64URL'
  | 'hex'
  | 'HEX'
  | 'latin1'
  | 'LATIN1'
  | 'ucs-2'
  | 'UCS-2'
  | 'ucs2'
  | 'UCS2'
  | 'utf-8'
  | 'UTF-8'
  | 'utf8'
  | 'UTF8'
  | 'utf16le'
  | 'UTF16LE'

export class BaseFetch {
  private static _instance: BaseFetch = new BaseFetch()

  private _fetch: Fetch | null = null

  private constructor() { }

  public static instance() {
    return BaseFetch._instance
  }

  public fetch(fetch: Fetch) {
    BaseFetch._instance._fetch = fetch
    return BaseFetch._instance
  }

  public getFetch() {
    const { _fetch } = BaseFetch._instance
    if (!_fetch) throw new Error('BaseFetch.fetchInstance() occur exception !!!')
    return _fetch
  }
}



export interface Logger {

  d(level: number, message: string): void
  e(level: number, message: string): void
  // e(level: number, e: Error): void

  w(level: number, message: string): void
  i(level: number, message: string): void
}

export class ConsoleLogger implements Logger {
  constructor() { }

  public d(level: number, message: string) {
    console.log(`[logger.${level}]`, message)
  }

  public e(level: number, message: string) {
    console.error(`[logger.${level}]`, message)
  }

  public w(level: number, message: string) {
    console.log(`[logger.${level}]`, message)
  }

  public i(level: number, message: string) {
    console.log(`[logger.${level}]`, message)
  }

}

export class NoLogger implements Logger {

  constructor() { }

  public d(_level: number, _message: string) { }
  public e(_level: number, _message: string) { }

  public w(_level: number, _message: string) { }
  public i(_level: number, _message: string) { }
}


export class Logwatch {
  private static _instance: Logwatch = new Logwatch()
  private _logger: Logger = new NoLogger()

  private constructor() { }

  public static instance() {
    return Logwatch._instance
  }

  public logger(logger: Logger) {
    this._logger = logger
    return this
  }

  public getLogger() {
    return this._logger
  }
}
