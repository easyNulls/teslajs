import { AccessToken } from '@/typings.d'

export interface AccessTokenDataSource {
  // accessToken(userId: string): Promise<AccessToken | null>
  // findLastAccessTokenByAccessToken(accessToken: string): Promise<AccessToken | null>

  findLastAccessToken(userId: string): Promise<AccessToken | null>

  toAccessToken(userId: string, token: AccessToken): void

  clean(): void

  findAll(): Promise<Record<string, AccessToken>>
}

export class InMemoryAccessTokenManager implements AccessTokenDataSource {
  private static _accessTokens: Record<string, AccessToken> = {}

  findAll(): Promise<Record<string, AccessToken>> {
    return new Promise(resolve => resolve(InMemoryAccessTokenManager._accessTokens ?? {}))
  }

  // accessToken(userId: string): Promise<AccessToken | null> {
  //   return new Promise(resolve => resolve(InMemoryAccessTokenManager._accessTokens?.[userId] ?? null))
  // }

  findLastAccessToken(userId: string): Promise<AccessToken | null> {
    return new Promise(resolve => resolve(InMemoryAccessTokenManager._accessTokens?.[userId] ?? null))
  }

  toAccessToken(userId: string, token: AccessToken): void {
    InMemoryAccessTokenManager._accessTokens[`${userId}`] = token
  }

  clean(): void {
    InMemoryAccessTokenManager._accessTokens = {}
  }
}
