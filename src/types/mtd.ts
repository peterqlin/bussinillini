export interface Location {
  lat: number
  lon: number
}

export interface Trip {
  trip_id: string
  trip_headsign: string
  route_id: string
  block_id: string
  direction: string
  service_id: string
  shape_id: string
}

export interface Vehicle {
  vehicle_id: string
  trip: Trip
  location: Location
  previous_stop_id: string | null
  next_stop_id: string | null
  origin_stop_id: string
  destination_stop_id: string
  last_updated: string
}

export interface Route {
  route_id: string
  route_color: string
  route_text_color: string
  route_long_name: string
  route_short_name: string
}

export interface MtdStatus {
  code: number
  msg: string
}

export interface MtdRequest {
  method: string
  params: Record<string, string>
}

export interface VehiclesResponse {
  time: string
  new_changeset: boolean
  changeset_id?: string
  status: MtdStatus
  rqst: MtdRequest
  vehicles: Vehicle[]
}

export interface RoutesResponse {
  time: string
  new_changeset: boolean
  changeset_id?: string
  status: MtdStatus
  rqst: MtdRequest
  routes: Route[]
}
