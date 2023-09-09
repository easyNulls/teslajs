export type OrNullable<T> = null | undefined | T

export interface TeslaError {
  error?: string
  error_description?: string
  error_uri?: string
}

export interface TeslaHttpResponse<T> {
  response?: OrNullable<T>
}

/**
 * 表示 OAuth 请求的参数。
 */
export interface OAuthParameters {
  audience?: OrNullable<string> /* 要求的资源 */
  client_id?: string /* 客户端 ID */
  code_challenge?: string /* 用于 PKCE（Proof Key for Code Exchange）的 code challenge */
  code_challenge_method?: string /* PKCE 中的 code challenge 方法 */
  locale?: OrNullable<string> /* 语言环境 */
  prompt?: string /* 提示用户进行某些操作 */
  redirect_uri?: string /* 重定向 URI */
  response_type?: string /* 授权响应类型 */
  scope?: string /* 请求的权限范围 */
  state?: string /* 用于防止 CSRF 攻击 */
  login_hint?: string /* 登录提示 */
  is_in_app?: boolean | null /* 是否在应用内 */
}

/**
 * 表示 OAuth 请求的请求体。
 */
export interface OAuthBody {
  _csrf?: string /* CSRF 令牌 */
  _phase?: string /* 请求阶段 */
  _process?: string /* 处理过程 */
  transaction_id?: string /* 事务 ID */
  cancel?: string /* 取消标志 */
  identity?: string /* 用户身份 */
  credential?: string /* 用户凭证 */
}

// /**
//  * 表示 OAuth 返回的令牌信息。
//  */
// export interface OauthToken {
//   access_token?: OrNullable<string> /* 访问令牌 */
//   refresh_token?: OrNullable<string> /* 刷新令牌 */
//   id_token?: OrNullable<string> /* ID 令牌 */
//   expires_in?: number | null /* 令牌过期时间 */
//   state?: OrNullable<string> /* 状态信息 */
//   token_type?: OrNullable<string> /* 令牌类型 */
// }

// /**
//  * 表示刷新 OAuth 令牌时返回的令牌信息。
//  */
// export interface RefreshOauthToken {
//   access_token?: OrNullable<string> /* 访问令牌 */
//   refresh_token?: OrNullable<string> /* 刷新令牌 */
//   id_token?: OrNullable<string> /* ID 令牌 */
//   expires_in?: number | null /* 令牌过期时间 */
//   token_type?: OrNullable<string> /* 令牌类型 */
// }

/**
 * 表示多因素认证设备信息。
 */
export interface MFA_Device {
  dispatchRequired?: boolean /* 是否需要调度 */
  id?: string /* 设备 ID */
  name?: string /* 设备名称 */
  factorType?: string /* 因素类型 */
  factorProvider?: string /* 因素提供者 */
  securityLevel?: number /* 安全级别 */
  activatedAt?: string /* 激活时间 */
  updatedAt?: string /* 更新时间 */
}

/**
 * 表示多因素认证验证信息。
 */
export interface MFA_Verify {
  id?: string /* 验证 ID */
  challengeId?: string /* 验证挑战 ID */
  factorId?: string /* 因素 ID */
  passCode?: string /* 验证码 */
  approved?: boolean /* 是否已批准 */
  flagged?: boolean /* 是否标记 */
  valid?: boolean /* 是否有效 */
  createdAt?: string /* 创建时间 */
  updatedAt?: string /* 更新时间 */
}

/**
 * 表示软件更新信息的类型。
 */
export type SoftwareUpdate = {
  /** 下载完成百分比 */
  download_perc?: number
  /** 预计安装持续时间（秒） */
  expected_duration_sec?: number
  /** 安装完成百分比 */
  install_perc?: number
  /** 更新状态 */
  status?: string
  /** 更新版本号 */
  version?: string
}

/**
 * 表示速限模式的类型。
 */
export type SpeedLimitMode = {
  /** 是否激活速限模式 */
  active?: boolean
  /** 当前速限值（英里/小时） */
  current_limit_mph?: number
  /** 最大速限值（英里/小时） */
  max_limit_mph?: number
  /** 最小速限值（英里/小时） */
  min_limit_mph?: number
  /** 是否设置了 PIN 码 */
  pin_code_set?: boolean
}

export type ProductsData = {
  energy_site_id: number // 能源站点 ID
  resource_type: string // 资源类型
  id: string // ID
  asset_site_id: string // 资产站点 ID
  solar_power: string // 太阳能功率
  solar_type: string // 太阳能类型
  sync_grid_alert_enabled: boolean // 同步电网警报是否启用
  breaker_alert_enabled: boolean // 断路器警报是否启用
  components: {
    battery: boolean // 是否有电池组件
    solar: boolean // 是否有太阳能组件
    solar_type: boolean // 是否有太阳能类型组件
    grid: boolean // 是否有电网组件
    load_meter: boolean // 是否有负载仪表组件
    market_type: string // 市场类型
  }
}

export type FeatureConfig = {
  signaling: {
    enabled: boolean
    subscribe_connectivity: boolean
  }
}

export type UserMe = {
  email: string
  full_name: string
  profile_image_url: string
}

export type NotificationPreferencesParams = {
  device_type: string
  app_version: string
  device_token: string
  platform: string
  locale: string | 'zh_Hans_CN'
}

/**
 * A "legacy" version of the data endpoint.('data' | 'latest_vehicle_data')
 */
export type VehicleDataNames = 'vehicle_data' | 'data' | 'latest_vehicle_data'

export type VehicleStateNames = 'charge_state' | 'climate_state' | 'drive_state' | 'gui_settings' | 'vehicle_config' | 'vehicle_state'

/**
 *
 */
export type VehicleStateNames_Special = 'vehicle_data' | 'data' | 'latest_vehicle_data' | 'release_notes' | 'mobile_enabled' | 'nearby_charging_sites'

/**
 * 表示充电接口锁定状态
 */
export type ChargePortLatchs =
  | string
  | 'Engaged' // 锁定
  | 'Disengaged' // 未锁定

/**
 * 表示充电状态
 */
export type ChargingStates =
  | string
  | 'Complete' // 充电完成
  | 'Charging' // 充电中
  | 'Disconnected' // 断开连接
  | 'Stopped' // 停止充电

// Location 坐标点的接口定义
export interface Location {
  lat?: number // 纬度
  long?: number // 经度
}

/**
 * 表示充电类型的原生值
 */
export type NativeTypes = 'off_peak' | 'user' | 'time' | string
/**
 *
 * off?: 表示气候保持模式处于关闭状态，车辆不会继续保持温度。
 * dog?: 表示气候保持模式处于“狗模式”，适用于在车内留下宠物时，保持适宜的温度。
 * camp?: 表示气候保持模式处于“露营模式”，适用于在车内睡觉或休息时，保持适宜的温度。
 */
export type ClimateKeeperMode = 'off' | 'dog' | 'camp' | string

/**
 * 换挡状态
 * 'P'（停车挡）、'R'（倒车挡）、'N'（空挡）、'D'（驾驶挡）和 'UNKNOWN'（未知）
 */
export type ShiftStates = 'P' | 'R' | 'N' | 'D' | 'UNKNOWN' | OrNullable<string>

export type VehicleStateValues =
  | string
  | 'driving' // 表示车辆正在行驶
  | 'stopped' // 表示车辆已停止
  | 'parked' // 表示车辆已停放
  | 'charging' // 表示车辆正在充电
  | 'supercharging' // 表示车辆正在进行超级充电
  | 'idle' // 表示车辆处于空闲状态
  | 'asleep' // 表示车辆处于休眠状态
  | 'online' // 表示车辆在线
  | 'offline' // 表示车辆离线
  | 'locked' // 表示车辆已锁定
  | 'unlocked' // 表示车辆已解锁
  | 'open' // 表示车辆的门或窗户已打开
  | 'closed' // 表示车辆的门或窗户已关闭
  | 'charging_idle' // 表示车辆正在充电，但处于空闲状态
  | 'preconditioning' // 表示车辆正在预热或预冷
  | 'error' // 表示车辆出现故障
  | 'maintenance' // 表示车辆处于维护状态

// Supercharger 超级充电站信息的接口定义
export interface Supercharger {
  location?: Location // 坐标点
  name?: string // 充电站名称
  type?: 'supercharger' | string // 充电站类型为超级充电站
  distance_miles?: number // 距离（英里）
  available_stalls?: number // 可用充电位数量
  total_stalls?: number // 总共充电位数量
  site_closed?: boolean // 充电站是否关闭
}

// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/state/nearbychargingsites.md
// NearbyChargingSitesResponse 附近充电站响应数据的接口定义
export interface NearbyChargingSitesResponse {
  congestion_sync_time_utc_secs?: number // 拥堵同步时间 UTC 秒数
  destination_charging?: Array<DestinationCharging> // 目的地充电站列表
  superchargers?: Array<Supercharger> // 超级充电站列表
  timestamp?: number // 时间戳
}

// DestinationCharging 目的地充电站信息的接口定义
export interface DestinationCharging {
  location?: Location // 坐标点
  name?: string // 充电站名称
  type?: string | 'destination' // 充电站类型为目的地
  distance_miles?: number // 距离（英里）
}

/**
 * 表示快速充电器类型
 */
export type FastChargerTypes =
  | string
  | '<invalid>'
  | 'AC' // 交流充电
  | 'DC' // 直流充电
  | 'Other' // 其他类型

/**
 * 表示预定充电模式
 */
export type ScheduledChargingModes =
  | 'Immediate' // 立即充电
  | 'Depart' // 出发前充电
  | 'Scheduled' // 预定充电
  | 'Sff' // 关闭预定充电

// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/state/chargestate.md
// ResponseData 特斯拉 API 响应数据的接口定义
export interface ChargeStateResponseData {
  battery_heater_on?: boolean // 电池加热是否开启
  battery_level?: number // 电池电量
  battery_range?: number // 电池续航里程（英里）
  charge_amps?: number // 充电电流
  charge_current_request?: number // 充电电流请求
  charge_current_request_max?: number // 最大充电电流请求
  charge_enable_request?: boolean // 充电请求是否开启
  charge_energy_added?: number // 充电所添加的能量
  charge_limit_soc?: number // 充电限制状态 of charge（SOC）
  charge_limit_soc_max?: number // 充电最大限制 SOC
  charge_limit_soc_min?: number // 充电最小限制 SOC
  charge_limit_soc_std?: number // 充电标准 SOC
  charge_miles_added_ideal?: number // 根据理想条件下的充电所添加的续航里程
  charge_miles_added_rated?: number // 根据标准条件下的充电所添加的续航里程
  charge_port_cold_weather_mode: boolean // 寒冷天气下的充电口模式是否已启用

  charge_port_color?: '<invalid>' | string // 充电口颜色
  charge_port_door_open?: boolean // 充电口是否开启
  charge_port_latch?: ChargePortLatchs // 充电口锁定状态
  charge_rate?: number // 充电速率
  charge_to_max_range?: boolean // 是否充至最大续航里程
  charger_actual_current?: number // 实际充电电流
  charger_phases?: null | string // 充电器相数
  charger_pilot_current?: number // 充电器 pilot 电流
  charger_power?: number // 充电功率
  charger_voltage?: number // 充电电压
  charging_state: ChargingStates // 充电状态
  conn_charge_cable?: '<invalid>' | 'SAE' | string // 连接充电电缆类型
  est_battery_range?: number // 估计的电池续航里程（英里）
  fast_charger_brand?: '<invalid>' | string // 快充品牌
  fast_charger_present?: boolean // 快充是否可用
  fast_charger_type?: FastChargerTypes // 快充类型
  ideal_battery_range?: number // 理想电池续航里程（英里）
  managed_charging_active?: boolean // 是否开启管理充电
  managed_charging_start_time?: null | string // 管理充电开始时间
  managed_charging_user_canceled?: boolean // 用户是否取消管理充电
  max_range_charge_counter?: number // 最大续航充电计数器
  minutes_to_full_charge?: number // 充满所需分钟数
  not_enough_power_to_heat?: boolean // 是否电量不足以供暖
  off_peak_charging_enabled?: boolean // 是否开启非高峰充电
  off_peak_charging_times?: 'all_week' | string | Array<OffPeakChargingTimes> // 非高峰充电时间
  off_peak_hours_end_time?: number // 非高峰充电结束时间
  preconditioning_enabled?: boolean // 是否开启预条件
  scheduled_charging_mode?: ScheduledChargingModes // 预定充电模式
  scheduled_charging_pending?: boolean // 预定充电是否挂起
  scheduled_charging_start_time?: null | string // 预定充电开始时间
  scheduled_charging_start_time_app?: number // 预定充电开始时间（应用程序）
  scheduled_departure_time?: number // 预定出发时间
  scheduled_departure_time_minutes?: number // 预定出发时间（分钟）
  supercharger_session_trip_planner?: boolean // 超级充电站行程规划会话是否开启
  time_to_full_charge?: number // 充满所需时间
  timestamp?: number // 时间戳
  trip_charging?: boolean // 行程充电是否开启
  usable_battery_level?: number // 可用电池电量
  user_charge_enable_request?: 'Requested' | 'NotRequested' | null | string // 用户充电请求是否开启
}

export interface TeslaDriveState {
  gps_as_of?: number // GPS数据的时间戳
  heading?: number // 方向角度（以度为单位）
  latitude?: number // 纬度坐标
  longitude?: number // 经度坐标
  native_latitude?: number // 本地纬度坐标
  native_location_supported?: number // 表示是否支持本地位置
  native_longitude?: number // 本地经度坐标
  native_type?: NativeTypes // 本地位置类型
  power?: number // 功率信息
  shift_state?: ShiftStates // 车辆换挡状态，或为 null
  speed?: number | null // 车速，或为 null
  timestamp?: number // 驾驶状态数据的时间戳
}

/**
 * 空调状态信息接口
 */
export interface TeslaClimateState {
  battery_heater?: boolean // 电池加热器是否启用
  battery_heater_no_power?: boolean // 电池加热器是否无电源
  climate_keeper_mode?: ClimateKeeperMode // 空调保持模式
  defrost_mode?: number // 前窗除霜模式（整数）
  driver_temp_setting?: number // 驾驶员温度设定值
  fan_status?: number // 风扇状态（整数）
  inside_temp?: number // 内部温度
  is_auto_conditioning_on?: boolean // 是否启用自动空调调节
  is_climate_on?: boolean // 是否启用空调
  is_front_defroster_on?: boolean // 是否启用前窗除霜
  is_preconditioning?: boolean // 是否预条件加热/冷却
  is_rear_defroster_on?: boolean // 是否启用后窗除霜
  left_temp_direction?: number // 左侧温度调节方向（整数）
  max_avail_temp?: number // 最大可用温度
  min_avail_temp?: number // 最小可用温度
  outside_temp?: number // 外部温度
  passenger_temp_setting?: number // 乘客温度设定值
  remote_heater_control_enabled?: boolean // 是否启用远程加热控制
  right_temp_direction?: number // 右侧温度调节方向（整数）
  seat_heater_left?: number // 左座位加热器等级（整数）
  seat_heater_right?: number // 右座位加热器等级（整数）
  side_mirror_heaters?: boolean // 是否启用外后视镜加热器
  timestamp?: number // 状态信息的时间戳
  wiper_blade_heater?: boolean // 雨刮器刀片加热器是否启用
}

/**
 * 表示深夜充电时间段
 */
export type OffPeakChargingTimes = {
  startHour: number // 充电起始小时
  startMinute: number // 充电起始分钟
  endHour: number // 充电结束小时
  endMinute: number // 充电结束分钟
}
/**
 * 充电状态信息接口
 */
interface TeslaChargeState {
  battery_heater_on?: boolean // 电池加热器是否启用
  battery_level?: number // 电池电量百分比
  battery_range?: number // 电池续航里程（单位：英里）
  charge_amps: number // 充电电流（安培）
  charge_current_request?: number // 请求充电电流
  charge_current_request_max?: number // 最大请求充电电流
  charge_enable_request?: boolean // 请求启用充电
  charge_energy_added?: number // 充电过程中添加的能量
  charge_limit_soc?: number // 充电限制电量百分比
  charge_limit_soc_max?: number // 最大充电限制电量百分比
  charge_limit_soc_min?: number // 最小充电限制电量百分比
  charge_limit_soc_std?: number // 标准充电限制电量百分比
  charge_miles_added_ideal?: number // 理想条件下的添加续航里程
  charge_miles_added_rated?: number // 额定条件下的添加续航里程
  charge_port_cold_weather_mode: boolean // 寒冷天气下的充电口模式是否已启用
  charge_port_color: string // 充电口颜色
  charge_port_door_open?: boolean // 充电口是否打开
  charge_port_latch: 'Engaged' | string // 充电口锁定状态
  charge_rate?: number // 充电速率

  charge_to_max_range?: boolean // 是否充电至最大续航里程
  charger_actual_current?: number // 充电器实际电流
  charger_phases?: number // 充电器阶段数
  charger_pilot_current?: number // 充电器导引电流
  charger_power?: number // 充电器功率
  charger_voltage?: number // 充电器电压
  managed_charging_active?: boolean // 是否启用管理充电
  managed_charging_start_time?: number | null // 管理充电启动时间
  managed_charging_user_canceled?: boolean // 用户是否取消了管理充电

  charging_state: ChargingStates // 充电状态
  conn_charge_cable: '<invalid>' | string // 连接的充电电缆
  est_battery_range: number // 估计电池剩余里程（英里）
  fast_charger_brand: string // 快速充电器品牌
  fast_charger_present: boolean // 是否连接快速充电器
  fast_charger_type: FastChargerTypes // 快速充电器类型
  ideal_battery_range: number // 理论电池剩余里程（英里）
  max_range_charge_counter: number // 最大充电次数
  minutes_to_full_charge: number // 充满电需要的时间（分钟）
  not_enough_power_to_heat: any
  off_peak_charging_enabled: boolean // 是否启用低峰充电
  off_peak_charging_times: 'all_week' | string | Array<OffPeakChargingTimes> // 低峰充电时间
  off_peak_hours_end_time: number // 低峰充电结束时间
  preconditioning_enabled: boolean // 是否启用预条件化
  preconditioning_times: 'all_week' | string // 预条件化时间
  scheduled_charging_mode: ScheduledChargingModes // 预定充电模式
  scheduled_charging_pending: boolean // 预定充电是否待定
  scheduled_charging_start_time: any // 预定充电开始时间
  scheduled_charging_start_time_app: number
  scheduled_departure_time: number // 预定出发时间
  scheduled_departure_time_minutes: number // 预定出发时间（分钟）
  supercharger_session_trip_planner: boolean // 是否在超级充电会话中使用行程规划
  time_to_full_charge: number // 充满电所需时间
  timestamp: number // 时间戳
  trip_charging: boolean // 行程充电是否已启用
  usable_battery_level: number // 可用电池电量百分比
  user_charge_enable_request: any
}

/**
 * 图形用户界面设置接口
 */
export interface TeslaGuiSettings {
  gui_24_hour_time?: boolean // 是否使用24小时制显示时间
  gui_charge_rate_units?: string // 充电速率单位（例如：mi/hr）
  gui_distance_units?: string // 距离单位（例如：mi/hr）
  gui_range_display?: string // 续航显示模式（例如：Rated）
  gui_temperature_units?: string | 'C' | 'F' // 温度单位（例如：F）
  show_range_units?: boolean // 是否显示续航单位
  timestamp?: number // 状态信息的时间戳
}

// 'NoSpace': '没有足够的存储空间',
// 'Recording': '正在录制',
// 'Parked': '停车状态',
// 'Standby': '待机状态',
// 'Unavailable': '不可用',
// 'Unknown': '未知状态',
export type DashcamStates = string | 'NoSpace' | 'Recording' | 'Parked' | 'Standby' | 'Unavailable' | 'Unknown'
/**
 * 上次自动泊车错误类型
 */
export type LastAutoparkErrors =
  | string
  | 'NoError'
  | 'EmergencyBrakeApplied'
  | 'UnsafeLocation'
  | 'DriverCancelled'
  | 'LowGear'
  | 'ObstacleDetected'
  | 'SteeringUnavailable'
  | 'SystemFault'
  | 'AutosteerDisabled'
  | 'InsufficientData'
  | 'Unknown'
/**
 * 车辆状态接口
 */
export interface TeslaVehicleState {
  api_version?: number // API 版本号
  autopark_state_v2?: string // 自动停车状态 V2
  autopark_style?: string // 自动停车风格
  calendar_supported?: boolean // 是否支持日历
  car_version?: string // 车辆版本
  center_display_state?: number // 中央显示屏状态

  dashcam_clip_save_available: boolean // 是否可保存行车记录仪剪辑
  dashcam_state: DashcamStates // 行车记录仪状态

  df?: number // 左前车窗状态
  dr?: number // 左后车窗状态
  fd_window?: number // 右前车窗状态
  fp_window?: number // 右后车窗状态
  ft?: number // 后备箱状态
  homelink_device_count?: number // Homelink 设备数量
  homelink_nearby?: boolean // 是否附近有 Homelink
  is_user_present?: boolean // 用户是否在车辆附近
  last_autopark_error?: LastAutoparkErrors // 上次自动停车错误信息
  locked?: boolean // 车辆是否上锁
  media_info: {
    audio_volume: number // 音频音量
    audio_volume_increment: number // 音频音量增量
    audio_volume_max: number // 音频最大音量
    media_playback_status: 'Playing' | string // 媒体播放状态
    now_playing_album: string // 当前播放的专辑
    now_playing_artist: string // 当前播放的艺术家
    now_playing_duration: number // 当前播放曲目的持续时间
    now_playing_elapsed: number // 当前播放曲目已过去的时间
    now_playing_source: 'AppleMusic' | string // 当前播放源
    now_playing_station: string // 当前播放的电台
    now_playing_title: string // 当前播放曲目的标题
  }
  media_state?: {
    remote_control_enabled?: boolean // 媒体遥控是否启用
  }
  notifications_supported?: boolean // 是否支持通知
  odometer?: number // 里程数
  parsed_calendar_supported?: boolean // 解析的日历是否支持
  pf?: number // 左前车窗状态
  pr?: number // 左后车窗状态
  rp_window?: number // 右后车窗状态
  rd_window?: number // 右后车窗状态
  rt?: number // 后备箱状态
  remote_start?: boolean // 是否远程启动
  remote_start_enabled?: boolean // 是否启用远程启动
  remote_start_supported?: boolean // 是否支持远程启动
  santa_mode: number
  sentry_mode?: boolean // 哨兵模式是否启用
  sentry_mode_available?: boolean // 是否可用哨兵模式
  smart_summon_available?: boolean // 是否可用智能召唤
  service_mode: boolean // 是否服务模式
  service_mode_plus: boolean // 是否服务模式+
  software_update?: {
    download_perc?: number // 下载百分比
    expected_duration_sec?: number // 预期持续时间（秒）
    install_perc?: number // 安装百分比
    status?: string // 软件更新状态
    version?: string // 软件版本
  }
  speed_limit_mode?: {
    active?: boolean // 是否启用速度限制模式
    current_limit_mph?: number // 当前速度限制（英里/小时）
    max_limit_mph?: number // 最大速度限制（英里/小时）
    min_limit_mph?: number // 最小速度限制（英里/小时）
    pin_code_set?: boolean // 是否设置了 PIN 码
  }
  tpms_hard_warning_fl: boolean
  tpms_hard_warning_fr: boolean
  tpms_hard_warning_rl: boolean
  tpms_hard_warning_rr: boolean
  tpms_last_seen_pressure_time_fl: number // 最近看到的前左胎压时间
  tpms_last_seen_pressure_time_fr: number // 最近看到的前右胎压时间
  tpms_last_seen_pressure_time_rl: number // 最近看到的后左胎压时间
  tpms_last_seen_pressure_time_rr: number // 最近看到的后右胎压时间
  tpms_pressure_fl: number // 前左胎压
  tpms_pressure_fr: number // 前右胎压
  tpms_pressure_rl: number // 后左胎压
  tpms_pressure_rr: number // 后右胎压
  tpms_rcp_front_value: number // 前胎压控制器值
  tpms_rcp_rear_value: number // 后胎压控制器值
  tpms_soft_warning_fl: boolean
  tpms_soft_warning_fr: boolean
  tpms_soft_warning_rl: boolean
  tpms_soft_warning_rr: boolean
  webcam_available: boolean // 摄像头是否可用

  summon_standby_mode_enabled?: boolean // 是否启用召唤待命模式
  sun_roof_percent_open?: number // 天窗开启百分比
  sun_roof_state?: string // 天窗状态
  timestamp?: number // 状态信息的时间戳
  valet_mode?: boolean // 是否启用代客泊车模式
  valet_pin_needed?: boolean // 是否需要代客泊车模式的 PIN 码
  vehicle_name?: OrNullable<string> // 车辆名称（可为空）
  cached_data: string
  last_seen: number // 上次出现时间的数据
}

/**
 * 表示具有启用 VIN 的车辆的信息。
 */
export interface EnabledVin {
  vin: string // 车辆识别号（VIN）
  next_appt_timestamp: OrNullable<string> // 下一个预约的时间戳（如果已预约），或者为空（如果未预约）
  next_appt_end_timestamp: OrNullable<string> // 下一个预约的结束时间戳（如果已预约），或者为空（如果未预约）
}

/**
 * 车辆的第三排座位类型。
 */
export type ThirdRowSeats = 'none' | 'rear-facing' | 'forward-facing' | string
/**
 * 车辆的扰流板类型。
 */
export type SpoilerTypes = 'none' | 'standard' | 'performance' | string

/*
  如果 rear_seat_type 的值为 0，可能表示后排没有座位，或者是一个空的座位区域。
  如果值为 1，可能表示后排是一个固定的座位，无法折叠。
  如果值为 2，可能表示后排是一个可折叠的座位，可以增加后备空间。
*/
export type RearSeatTypes = 0 | 1 | 2 | number

/**
 * 如果 seat_type 的值为 0，可能表示标准座椅类型。
 * 如果值为 1，可能表示升级或豪华座椅类型。
 */
export type SeatTypes = 0 | 1 | number

export type AccessTypes = 'owner' | 'renter' | 'service' | 'guest' | string

/**
 * 表示车厢操作类型
 */
export type CanActuateTrunks =
  | 'front' // 前车厢
  | 'rear' // 后车厢
/**
 * 表示特殊车辆类型
 */
export type CarSpecialTypes =
  | string
  | 'base'
  | 'plaid' // Plaid 特殊车型
  | 'plaid_plus' // Plaid+ 特殊车型
  | 'ludicrous' // Ludicrous 特殊车型
  | 'ludicrous_plus' // Ludicrous+ 特殊车型
/**
 * 表示车辆类型
 */
export type CarTypes =
  | string
  | 'model3'
  | 'modely'
  | 'modelx'
  | 'models'
  | 'sedan' // 轿车
  | 'suv' // SUV
  | 'truck' // 卡车
  | 'van' // 货车
  | 'coupe' // 轿跑车
  | 'convertible' // 敞篷车
  | 'hatchback' // 掀背车
  | 'wagon' // 旅行车
  | 'minivan' // 小型货车

/**
 * 表示充电接口类型
 */
export type ChargePortTypes =
  | string
  | 'GB'
  | 'CCS' // CCS（Combo Charging System）充电接口
  | 'J1772' // J1772（SAE J1772）充电接口
  | 'Tesla' // 特斯拉充电接口

/**
 * 表示车型标识
 */
export type TrimBadging =
  | string
  | 'standard' // 标准型号
  | 'performance' // 性能型号
  | 'long_range' // 长续航型号
  | 'plaid' // Plaid型号
  | 'plaid_plus' // Plaid+型号

/**
 * 表示车轮类型
 */
export type WheelType =
  | string
  | 'PinwheelRefresh18'
  | 'base' // 基础轮毂
  | 'aero' // Aero轮毂
  | 'sport' // 运动轮毂
  | 'arty' // Arty轮毂
  | 'turbine' // 涡轮轮毂
  | 'induction' // 引导轮毂

/**
 * 表示车辆的配置信息。
 */
export interface TeslaVehicleConfig {
  can_accept_navigation_requests?: boolean // 车辆是否能够接受导航请求。
  can_actuate_trunks?: CanActuateTrunks // 车辆是否能够操作行李箱。
  car_special_type?: CarSpecialTypes // 车辆的特殊类型。
  car_type?: CarTypes // 车辆的类型。
  charge_port_type?: ChargePortTypes // 充电口的类型。
  default_charge_to_max?: boolean // 是否将默认充电设为最大。
  driver_assist: string | 'TeslaAP3'
  ece_restrictions?: boolean // 是否应用欧洲经济区（EEA）限制。
  eu_vehicle?: boolean // 是否为欧洲联盟车辆。
  exterior_color?: string // 车辆外部的颜色。
  has_air_suspension?: boolean // 车辆是否配备气动悬挂。
  has_ludicrous_mode?: boolean // 车辆是否具有“疯狂模式”。
  motorized_charge_port?: boolean // 充电口是否是电动的。
  plg?: boolean // 车辆是否配备动力行李箱盖。
  rear_seat_heaters?: number // 后排座椅加热器数量, 可能的取值为 0、1、2、3
  rear_seat_type?: RearSeatTypes // 后排座椅类型。
  rhd?: boolean // 车辆是否为右舵。
  roof_color?: string // 车辆车顶的颜色。
  seat_type?: number // 车辆座椅类型。
  spoiler_type?: SpoilerTypes // 车辆尾翼类型。
  sun_roof_installed?: number // 车辆的天窗类型。
  third_row_seats?: ThirdRowSeats // 车辆第三排座椅类型。
  timestamp?: number // 配置信息更新的时间戳。
  trim_badging?: TrimBadging // 车辆的型号标识。
  use_range_badging?: boolean // 是否使用续航标识。
  wheel_type?: WheelType // 车辆的轮毂类型。
}

/**
 * 主要的车辆数据接口，包含了车辆的各种信息。
 */
export interface VehicleData {
  id?: number // 车辆的唯一ID。
  user_id?: number // 用户ID。
  vehicle_id?: number // 车辆ID。
  vin?: string // 车辆VIN号码。
  display_name?: string // 车辆显示名称。
  color?: OrNullable<string> // 车辆颜色，可以为null。
  access_type?: AccessTypes // 用户访问类型。
  tokens?: Array<string> // 车辆访问令牌数组。
  state?: VehicleStateValues // 车辆状态。
  in_service?: boolean // 是否在服务中。
  id_s?: string // 车辆的字符串ID。
  calendar_enabled?: boolean // 是否启用了日历功能。
  api_version?: number // 车辆API版本。
  backseat_token?: OrNullable<string> // 后座访问令牌，可以为null。
  backseat_token_updated_at?: OrNullable<string> // 后座访问令牌的更新时间，可以为null。
  drive_state?: TeslaDriveState // 车辆驾驶状态。
  climate_state?: TeslaClimateState // 车辆气候状态。
  charge_state?: TeslaChargeState // 车辆充电状态。
  gui_settings?: TeslaGuiSettings // 车辆GUI设置。
  vehicle_state?: TeslaVehicleState // 车辆状态。
  vehicle_config?: TeslaVehicleConfig // 车辆配置信息。
}

/**
 /// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/alerts.md
 * 
 * 表示汽车警报操作的名称
 */
export type AlertsNames =
  | 'honk_horn' // 鸣喇叭
  | 'flash_lights' // 闪灯

/**
/// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/charging.md
 * 
 * 表示汽车充电操作的名称
 */
export type ChargingNames =
  | 'charge_port_door_open' // 开启充电口门
  | 'charge_port_door_close' // 关闭充电口门
  | 'charge_start' // 开始充电
  | 'charge_stop' // 停止充电
  | 'charge_standard' // 标准充电
  | 'charge_max_range' // 最大续航充电
  | 'set_charge_limit' // 设置充电限制
  | 'set_charging_amps' // 设置充电电流
  | 'set_scheduled_charging' // 设置定时充电
  | 'set_scheduled_departure' // 设置定时离开充电
  | 'set_scheduled_charging' // 设置定时充电

/**
/// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/climate.md
 * 
 * 表示汽车气候操作的名称
 */
export type ClimateNames =
  | 'auto_conditioning_start' // 开启自动空调
  | 'auto_conditioning_stop' // 关闭自动空调
  | 'set_temps' // 设置温度
  | 'set_preconditioning_max' // 设置最大预热
  | 'remote_seat_heater_request' // 远程座椅加热请求
  | 'remote_seat_cooler_request' // 远程座椅冷却请求
  | 'remote_steering_wheel_heater_request' // 远程方向盘加热请求
  | 'set_bioweapon_mode' // 设置生化武器防护模式
  | 'set_climate_keeper_mode' // 设置气候保持模式
  | 'remote_auto_seat_climate_request' // 远程自动座椅气候请求
  | 'set_cop_temp' // 设置CO温度
  | 'set_cabin_overheat_protection' // 设置车内过热保护

/// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/doors.md
export type Doors = 'door_unlock' | 'door_lock'

/// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/homelink.md
export type Homelink = 'trigger_homelink'

/// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/media.md
export type Media = 'media_toggle_playback' | 'media_next_track' | 'media_prev_track' | 'media_next_fav' | 'media_prev_fav' | 'media_volume_up' | 'media_volume_down' | 'adjust_volume'

/// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/misc.md
export type Misc = 'take_drivenote' | 'set_vehicle_name' | 'screenshot' | 'remote_boombox' // Let the car fart remotely on version 2022.44.25.1 and above or use boombox v2 on supported vehicles.

/// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/remotestart.md
export type RemoteStart = 'remote_start_drive'

/// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/sentrymode.md
export type SentryMode = 'set_sentry_mode'

/// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/sharing.md
export type Sharing = 'share'

/// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/softwareupdate.md
export type SoftwareUpdates = 'schedule_software_update' | 'cancel_software_update'

/// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/speedlimit.md
export type SpeedLimit = 'speed_limit_set_limit' | 'speed_limit_activate' | 'speed_limit_deactivate' | 'speed_limit_clear_pin'

/// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/sunroof.md
export type Sunroof = 'sun_roof_control'

/// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/trunk.md
export type Trunk = 'actuate_trunk'

/// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/valet.md
export type ValetMode = 'set_valet_mode' | 'reset_valet_pin'

/// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/wake.md
export type Wake = 'wake_up'

/// https://github.com/timdorr/tesla-api/blob/master/docs/vehicle/commands/windows.md
export type Windows = 'window_control'

export type CommandNames =
  | AlertsNames
  | ChargingNames // 充电过程和相关功能
  | ClimateNames // 车辆的空调和温控系统
  | Doors // 车门控制
  | Homelink // 车辆与家中的门户设备（如车库门、门闸等）进行连接
  | Media // 车辆播放的媒体
  | Misc // 记下驾驶记录
  | RemoteStart // 远程启动，预热车辆
  | SentryMode // 安全功能，使用车辆的摄像头和传感器来提供额外的防护层，当车辆停放时保护车辆。
  | Sharing // 共享音乐、定位到车机
  | SoftwareUpdates // OTA设置
  | SpeedLimit // 设置的最大速度限制
  | Sunroof // 天窗
  | Trunk // 后备厢（车尾箱）的打开和关闭
  | ValetMode // 代客泊车
  | Wake // 唤醒机车
  | Windows // 控制窗口。将同时通风或关闭所有窗户。

/**
 * 表示特斯拉系统中各种通知的设置。
 */
export interface NotificationSettings {
  alarm?: boolean // 是否启用警报通知
  car_active?: boolean // 是否启用车辆活动通知
  charge_cable_unlatched?: boolean // 是否启用充电电缆已拔出通知
  charging_interrupted?: boolean // 是否启用充电中断通知
  charge_pricing_information?: boolean // 是否启用充电定价信息通知
  charging_arrears?: boolean // 是否启用充电欠费通知
  charging_congestion_reminder?: boolean // 是否启用充电拥堵提醒通知
  charging_congestion_soc_warning?: boolean // 是否启用充电拥堵 SOC 警告通知
  charging_congestion_complete_warning?: boolean // 是否启用充电拥堵完成警告通知
  charging_congestion_fee?: boolean // 是否启用充电拥堵费用通知
  charging_coupon?: boolean // 是否启用充电优惠券通知
  climate_ended?: boolean // 是否启用气候控制结束通知
  climate_keeper_critical?: boolean // 是否启用气候控制关键通知
  climate_keeper_ended_fault?: boolean // 是否启用气候控制结束故障通知
  climate_keeper_ended_soc?: boolean // 是否启用气候控制结束 SOC 通知
  climate_keeper_reminder?: boolean // 是否启用气候控制提醒通知
  climate_keeper_warning?: boolean // 是否启用气候控制警告通知
  climate_off_timeout?: boolean // 是否启用气候关闭超时通知
  dog_mode_faulted?: boolean // 是否启用狗模式故障通知
  factory_reset_initiated?: boolean // 是否启用出厂复位初始化通知
  guest_share_revoked?: boolean // 是否启用访客共享撤销通知
  high_usage_supercharger?: boolean // 是否启用高使用率超级充电站通知
  inbox?: boolean // 是否启用收件箱通知
  supercharging_disabled?: boolean // 是否启用超级充电禁用通知
  bml_complete_order?: boolean // 是否启用 BML 订单完成通知
  incentive_inspection?: boolean // 是否启用奖励检查通知
  questionnaire?: boolean // 是否启用问卷通知
  supercharging_entity_switch?: boolean // 是否启用超级充电实体切换通知
  supercharging_miles_expiration?: boolean // 是否启用超级充电里程到期通知
  supercharging_survey?: boolean // 是否启用超级充电调查通知
  loot_box_boosted?: boolean // 是否启用战利品箱增强通知
  lootbox_chargingmiles_expiration?: boolean // 是否启用战利品箱充电里程到期通知
  lootbox_credit_bonus?: boolean // 是否启用战利品箱积分奖励通知
  lootbox_credit_expiration?: boolean // 是否启用战利品箱积分到期通知
  lootbox_promotion?: boolean // 是否启用战利品箱促销通知
  lootbox_quarter_lottery?: boolean // 是否启用战利品箱季度抽奖通知
  key_added?: boolean // 是否启用钥匙添加通知
  key_removed?: boolean // 是否启用钥匙移除通知
  low_soe?: boolean // 是否启用电量低警告通知
  power_rationality_alert?: boolean // 是否启用电源合理性警告通知
  please_move_car?: boolean // 是否启用请移动车辆通知
  preconditioning_complete?: boolean // 是否启用预条件完成通知
  outstanding_balance?: boolean // 是否启用未结清余额通知
  refer_friend?: boolean // 是否启用推荐朋友通知
  scheduled_update_failed_to_start?: boolean // 是否启用计划更新启动失败通知
  secret_level?: boolean // 是否启用秘密级别通知
  sentry_off_no_ap?: boolean // 是否启用哨兵模式关闭（无AP）通知
  sentry_off_soc?: boolean // 是否启用哨兵模式关闭（SOC）通知
  sentry_on_extended?: boolean // 是否启用哨兵模式扩展通知
  sentry_panic?: boolean // 是否启用哨兵模式恐慌通知
  service_in_part_hold?: boolean // 是否启用部分维修保留通知
  service_in_part_hold_with_estimated_completion_time?: boolean // 是否启用带预计完成时间的部分维修保留通知
  service_in_service?: boolean // 是否启用服务中通知
  service_in_service_with_estimated_completion_time?: boolean // 是否启用带预计完成时间的服务中通知
  service_installables_appointment?: boolean // 是否启用可安装配件预约通知
  service_new_chat_message?: boolean // 是否启用新聊天消息通知
  service_questions_prompt?: boolean // 是否启用服务问题提示通知
  service_ready_for_pickup?: boolean // 是否启用准备接车通知
  service_vehicle_self_test_request?: boolean // 是否启用服务车辆自测请求通知
  service_range_analysis_complete?: boolean // 是否启用服务范围分析完成通知
  service_range_analysis_incomplete?: boolean // 是否启用服务范围分析未完成通知
  service_appointment_reminder?: boolean // 是否启用服务预约提醒通知
  service_estimate_available?: boolean // 是否启用服务估计可用通知
  service_estimate_available_reminder?: boolean // 是否启用服务估计可用提醒通知
  service_rideshare_credits_to_be_provided?: boolean // 是否启用待提供拼车积分通知
  service_rideshare_credits_available?: boolean // 是否启用拼车积分可用通知
  service_loaner_vehicle_to_be_provided?: boolean // 是否启用待提供代步车辆通知
  service_loaner_vehicle_accept_agreement?: boolean // 是否启用代步车辆接受协议通知
  service_tracker_reminder?: boolean // 是否启用服务追踪提醒通知
  service_complete?: boolean // 是否启用服务完成通知
  service_survey?: boolean // 是否启用服务调查通知
  service_manual_message?: boolean // 是否启用服务手动消息通知
  speed_limit_proximity_triggered?: boolean // 是否启用速度限制接近触发通知
  tesla_electric_new_site_added?: boolean // 是否启用特斯拉电动新站点添加通知
  supercharing_coupon_redemption?: boolean // 是否启用超级充电优惠券兑换通知
  tpms_alert?: boolean // 是否启用胎压监测系统警报通知
  energy_support_chat_agent_ended_chat?: boolean // 是否启用能源支持聊天代理结束聊天通知
  energy_support_chat_agent_joined_chat?: boolean // 是否启用能源支持聊天代理加入聊天通知
  energy_support_chat_new_message?: boolean // 是否启用能源支持聊天新消息通知
  energy_service_schedule_service?: boolean // 是否启用能源服务安排服务通知
  energy_service_one_day_reminder?: boolean // 是否启用能源服务一天提醒通知
  energy_service_seven_day_reminder?: boolean // 是否启用能源服务七天提醒通知
  early_pickup_available?: boolean // 是否启用提前取车通知
  update_available?: boolean // 是否启用更新可用通知
  update_imminent?: boolean // 是否启用即将更新通知
  urgent_can_alert?: boolean // 是否启用紧急 CAN 警报通知
  vehicle_driving_in_valet_mode?: boolean // 是否启用代客停车模式下行驶通知
  vehicle_twelve_volt_battery_replacement_alert?: boolean // 是否启用车辆 12 伏电池更换警报通知
  vehicle_unsecure?: boolean // 是否启用车辆不安全通知
  added_authorized_client?: boolean // 是否启用已添加的授权客户通知
  battery_breaker_open?: boolean // 是否启用电池断路器打开通知
  black_start_failure?: boolean // 是否启用黑启动失败通知
  custom_energy_alert?: boolean // 是否启用自定义能源警报通知
  grid_outage?: boolean // 是否启用电网停电通知
  off_grid_approaching_low_soe?: boolean // 是否启用脱网且接近低 SOC 通知
  removed_authorized_client?: boolean // 是否启用已移除的授权客户通知
  scheduled_island_contactor_open?: boolean // 是否启用计划的岛式接触器打开通知
  storm_mode_on?: boolean // 是否启用风暴模式开启通知
  vpp_event_beginning_discharge?: boolean // 是否启用 VPP 事件开始放电通知
  vpp_event_scheduled?: boolean // 是否启用 VPP 事件预定通知
  enrollment_notification_rejected?: boolean // 是否启用报名通知被拒绝通知
  enrollment_notification_ineligible?: boolean // 是否启用报名通知不合格通知
  enrollment_notification_participating?: boolean // 是否启用报名通知参与通知
  wait_for_jump_start?: boolean // 是否启用等待启动通知
  wait_for_solar?: boolean // 是否启用等待太阳能通知
  wait_for_user_low_soe?: boolean // 是否启用等待用户低 SOC 通知
  wait_for_user_no_inverters_ready?: boolean // 是否启用等待用户无逆变器就绪通知
  wait_for_user_retries_exhausted?: boolean // 是否启用等待用户重试耗尽通知
  expired_payment?: boolean // 是否启用付款过期通知
  internal_app_update_nag?: boolean // 是否启用内部应用更新提醒通知
  suspicious_activity?: boolean // 是否启用可疑活动通知
  rewrap_vault_keys?: boolean // 是否启用重包装保险库密钥通知
  vehicle_added?: boolean // 是否启用车辆添加通知
}

export type EnergySitesNames = string | 'backup_time_remaining' | 'live_status' | 'site_status' | 'site_info' | 'programs' | 'tariff_rate'

// | 'rate_tariffs'

interface GeneralSystemInfo {
  resource_type: string // 资源类型
  asset_site_id: string // 资产站点 ID
  solar_power: number // 太阳能功率
  solar_type: string // 太阳能类型
  storm_mode_enabled: boolean | null // 风暴模式是否启用
  powerwall_onboarding_settings_set: boolean | null // Powerwall入网设置是否已配置
  sync_grid_alert_enabled: boolean // 同步电网警报是否启用
  breaker_alert_enabled: boolean // 断路器警报是否启用
}

interface BatteryInfo {
  response: {
    resource_type: 'battery' // 资源类型：电池
    site_name: string // 站点名称
    gateway_id: string // 网关 ID
    energy_left: number // 剩余储能
    total_pack_energy: number // 总储能容量
    percentage_charged: number // 充电百分比
    battery_type: 'ac_powerwall' | string // 电池类型
    backup_capable: boolean // 是否支持备用电池功能
    battery_power: number // 电池输出功率
    storm_mode_enabled: boolean | null // 风暴模式是否启用
    powerwall_onboarding_settings_set: boolean | null // Powerwall入网设置是否已配置
    powerwall_tesla_electric_interested_in: null | string // 对特斯拉电动车感兴趣
    sync_grid_alert_enabled: boolean // 同步电网警报是否启用
    breaker_alert_enabled: boolean // 断路器警报是否启用
  }
}

interface SolarInfo {
  response: {
    resource_type: 'solar' // 资源类型：太阳能
    asset_site_id: string // 资产站点 ID
    solar_power: number // 太阳能功率
    solar_type: string // 太阳能类型
    storm_mode_enabled: boolean | null // 风暴模式是否启用
    powerwall_onboarding_settings_set: boolean | null // Powerwall入网设置是否已配置
    sync_grid_alert_enabled: boolean // 同步电网警报是否启用
    breaker_alert_enabled: boolean // 断路器警报是否启用
  }
}

// 使用泛型进行选择性的解析
type EnergyInfo = BatteryInfo | SolarInfo

interface SiteInfo {
  id: string // 站点 ID
  site_name: string // 站点名称
  site_number: string // 站点编号
  installation_date: string // 安装日期
  user_settings: {
    storm_mode_enabled: boolean | null // 风暴模式是否启用
    powerwall_onboarding_settings_set: boolean | null // Powerwall入网设置是否已配置
    sync_grid_alert_enabled: boolean // 同步电网警报是否启用
    breaker_alert_enabled: boolean // 断路器警报是否启用
  }
  components: {
    solar: boolean // 太阳能是否存在
    solar_type: string // 太阳能类型
    battery: boolean // 电池是否存在
    grid: boolean // 电网是否存在
    backup: boolean // 备用电池是否存在
    gateway: string // 网关类型
    load_meter: boolean // 负载计量仪是否存在
    tou_capable: boolean // 是否支持时段电价
    storm_mode_capable: boolean // 是否支持风暴模式
    flex_energy_request_capable: boolean // 是否支持灵活能源请求
    car_charging_data_supported: boolean // 是否支持车辆充电数据
    off_grid_vehicle_charging_reserve_supported: boolean // 是否支持离网车辆充电储备
    vehicle_charging_performance_view_enabled: boolean // 是否启用车辆充电性能视图
    vehicle_charging_solar_offset_view_enabled: boolean // 是否启用车辆充电太阳能偏移视图
    battery_solar_offset_view_enabled: boolean // 是否启用电池太阳能偏移视图
    energy_service_self_scheduling_enabled: boolean // 是否启用能源服务自调度
    rate_plan_manager_supported: boolean // 是否支持费率计划管理器
    configurable: boolean // 是否可配置
    grid_services_enabled: boolean // 是否启用电网服务
  }
  installation_time_zone: string // 安装时区
  time_zone_offset: number // 时区偏移
  geolocation: {
    latitude: number // 纬度
    longitude: number // 经度
  }
  address: {
    address_line1: string // 地址行1
    city: string // 城市
    state: string // 州/省
    zip: string // 邮政编码
    country: string // 国家
  }
}

// ================================================   自定义  ============================================================

export type ObtainAccessTokenFn = () => Promise<AccessToken | null>

export interface AccessToken {
  access_token?: OrNullable<string>
  refresh_token?: OrNullable<string>
  id_token?: OrNullable<string>
  expires_in?: number | null
  token_type?: OrNullable<string>
}

export interface ApiConfig {
  redirectUrl: string
  ossAuthorizeHost: string
  teslamotorsHost: string
  streamingHost: string
  locale: OrNullable<string>
  clientId: OrNullable<string>
  userAgent: OrNullable<string>
  appUserAgent: OrNullable<string>
}

export interface ApiOptions {
  obtainAccessTokenFn: ObtainAccessTokenFn
  config: ApiConfig
}

export interface ICommondResult<T> {
  reason: string
  result: T
}
