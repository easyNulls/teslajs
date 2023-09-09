import { APIs } from '@/kits'
import { Api } from '@/ext'
import { ApiOptions, ICommondResult } from '@/typings.d'

// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/media.md
export class MediaApi extends Api {
  constructor(props: ApiOptions) {
    super(props)
  }

  public mediaTogglePlayback(id: number) {
    return this.execute<ICommondResult<boolean>>(({ teslamotorsHost }, accessToken) => APIs.mediaTogglePlayback(teslamotorsHost)(accessToken)(id))
  }

  public mediaNextTrack(id: number) {
    return this.execute<ICommondResult<boolean>>(({ teslamotorsHost }, accessToken) => APIs.mediaNextTrack(teslamotorsHost)(accessToken)(id))
  }

  public mediaPrevTrack(id: number) {
    return this.execute<ICommondResult<boolean>>(({ teslamotorsHost }, accessToken) => APIs.mediaPrevTrack(teslamotorsHost)(accessToken)(id))
  }

  public mediaNextFav(id: number) {
    return this.execute<ICommondResult<boolean>>(({ teslamotorsHost }, accessToken) => APIs.mediaNextFav(teslamotorsHost)(accessToken)(id))
  }

  public mediaPrevFav(id: number) {
    return this.execute<ICommondResult<boolean>>(({ teslamotorsHost }, accessToken) => APIs.mediaPrevFav(teslamotorsHost)(accessToken)(id))
  }

  public mediaVolumeUp(id: number) {
    return this.execute<ICommondResult<boolean>>(({ teslamotorsHost }, accessToken) => APIs.mediaVolumeUp(teslamotorsHost)(accessToken)(id))
  }

  public mediaVolumeDown(id: number) {
    return this.execute<ICommondResult<boolean>>(({ teslamotorsHost }, accessToken) => APIs.mediaVolumeDown(teslamotorsHost)(accessToken)(id))
  }

  public adjustVolume(userId: string, id: number, volume: number) {
    return this.execute<ICommondResult<boolean>>(({ teslamotorsHost }, accessToken) => APIs.adjustVolume(teslamotorsHost)(accessToken)(id, volume))
  }
}
