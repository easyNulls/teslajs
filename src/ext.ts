import { _APP_USER_AGENT, _USER_AGENT } from '@/config'
import { ObtainAccessTokenFn, ApiConfig, ApiOptions } from '@/typings.d'

/**
 * API 日志级别：始终记录。
 */
export const API_LOG_ALWAYS: number = 0

/**
 * API 日志级别：错误。
 */
export const API_ERROR_LEVEL: number = 1

/**
 * API 日志级别：调用。
 */
export const API_CALL_LEVEL: number = 2

/**
 * API 日志级别：返回值。
 */
export const API_RETURN_LEVEL: number = 3

/**
 * API 日志级别：URL。
 */
export const API_URL_LEVEL: number = 4

/**
 * API 日志级别：请求体。
 */
export const API_BODY_LEVEL: number = 5

/**
 * API 日志级别：参数。
 */
export const API_PARAMS_LEVEL: number = 6

/**
 * API 日志级别：请求。
 */
export const API_REQUEST_LEVEL: number = 7

/**
 * API 日志级别：响应。
 */
export const API_RESPONSE_LEVEL: number = 8

export const API_LOG_ALL: number = 1024

/**
 * 抽象类 Api，用于定义共享的 API 功能和配置。
 */
export abstract class Api {
  protected obtainAccessToken: ObtainAccessTokenFn
  protected config: ApiConfig | null

  /**
   * 构造函数，用于初始化 Api 实例。
   * @param props - Api 配置选项。
   */
  constructor(props: ApiOptions) {
    const { obtainAccessTokenFn, config } = props
    this.obtainAccessToken = obtainAccessTokenFn
    this.config = config
  }

  /**
   * 获取流式 URL。
   * @returns 流式 URL。
   */
  protected getStreamingHost = () => this.config?.streamingHost!!

  /**
   * 获取 Teslamotors URL。
   * @returns Teslamotors URL。
   */
  protected getTeslamotorsHost = () => this.config?.teslamotorsHost!!

  /**
   * 设置获取访问令牌的函数。
   * @param fn - 获取访问令牌的函数。
   */
  protected accessTokenFn(fn: ObtainAccessTokenFn) {
    this.obtainAccessToken = fn
  }

  /**
   * 执行一个 API 函数并返回结果。
   * @param fn - 要执行的 API 函数。
   * @returns API 函数的结果。
   */
  protected async execute<T>(fn: (config: ApiConfig, accessToken: string) => Promise<T | null>) {
    const accessToken = await this.obtainAccessToken()
    const act = accessToken!!.access_token
    return act ? await fn(this.config!!, act) : null
  }
}
