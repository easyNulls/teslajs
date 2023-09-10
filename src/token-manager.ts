import { AccessToken } from '@/typings.d'

export interface AccessTokenDataSource {
  // accessToken(userId: string): Promise<AccessToken | null>
  // findLastAccessTokenByAccessToken(accessToken: string): Promise<AccessToken | null>

  /**
   * 根据用户ID获取AcessToken数据，如未登录过则返回null
   * 
   * @param userId 用户ID/根据需求来选择email/手机号/UNIQUE_ID
   */
  findLastOneAccessToken(userId: string): Promise<AccessToken | null>

  /**
   * 根据TOKEN ID获取AccessToken
   * @param tokenId TESLA 登录成功后返回的token中包含的tokenId
   */
  findAccessTokenFromTokenId(tokenId: string): Promise<AccessToken | null>

  /**
   * 存储/更新AccessToken
   * @param userId 
   * @param token 
   */
  toAccessToken(userId: string, token: AccessToken): void

  /**
   * 清除所有的AccessToken
   */
  clean(): void

  /**
   * 获取所有的AccessToken
   */
  findAll(): Promise<Record<string, AccessToken>>
}


/**
 * 内存方式存储/更新AccessToken
 * 
 * @default 默认方式
 * 
 */
export class InMemoryAccessTokenManager implements AccessTokenDataSource {
  private static _accessTokens: Record<string, AccessToken> = {}

  findAll(): Promise<Record<string, AccessToken>> {
    return new Promise(resolve => resolve(InMemoryAccessTokenManager._accessTokens ?? {}))
  }

  findLastOneAccessToken(userId: string): Promise<AccessToken | null> {
    return new Promise(resolve => resolve(InMemoryAccessTokenManager._accessTokens?.[userId] ?? null))
  }

  findAccessTokenFromTokenId(tokenId: string): Promise<AccessToken | null> {
    const values = Object.values(InMemoryAccessTokenManager._accessTokens ?? {}).filter(item => item.id_token === tokenId)
    const lastOne = values.length > 0 ? values[values.length - 1] : null
    return new Promise(resolve => resolve(lastOne))
  }

  toAccessToken(userId: string, token: AccessToken): void {
    InMemoryAccessTokenManager._accessTokens[`${userId}`] = token
  }

  clean(): void {
    InMemoryAccessTokenManager._accessTokens = {}
  }
}
