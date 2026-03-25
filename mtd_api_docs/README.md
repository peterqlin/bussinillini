# MTD API Documentation

> Champaign-Urbana Mass Transit District — REST API v2.2  
> Source: <https://developer.mtd.org/>  
> Contact: developer@mtd.org

---

## Quick Reference

| Method                                                                   | Category       | Description                                                                       |
| ------------------------------------------------------------------------ | -------------- | --------------------------------------------------------------------------------- |
| [GetCalendarDatesByDate](calendar-dates.md#getcalendardatesbydate)       | Calendar Dates | Get a list of calendar dates based on a specific date.                            |
| [GetCalendarDatesByService](calendar-dates.md#getcalendardatesbyservice) | Calendar Dates | Get a list of calendar dates based on a specific service_id.                      |
| [GetDeparturesByStop](departures.md#getdeparturesbystop)                 | Departures     | Get a list of real-time departures for a specific stop_id. Do not poll this more… |
| [GetRoute](routes.md#getroute)                                           | Routes         | Get information about a specific route(s).                                        |
| [GetRoutes](routes.md#getroutes)                                         | Routes         | Get the complete list of routes.                                                  |
| [GetRoutesByStop](routes.md#getroutesbystop)                             | Routes         | Get a list of routes that service a given stop.                                   |
| [GetShape](shapes.md#getshape)                                           | Shapes         | Get a list of points that define the shape of the route on a map.                 |
| [GetShapeBetweenStops](shapes.md#getshapebetweenstops)                   | Shapes         | Get a list of points that define the shape of part of a shape on a map.           |
| [GetStop](stops.md#getstop)                                              | Stops          | Get information for a given stop.                                                 |
| [GetStops](stops.md#getstops)                                            | Stops          | Get a complete list of stops.                                                     |
| [GetStopsByLatLon](stops.md#getstopsbylatlon)                            | Stops          | Get a list of stops nearest a given latitude/longitude.                           |
| [GetStopTimesByTrip](stop-times.md#getstoptimesbytrip)                   | Stop Times     | Get a list of stops with scheduled information about this trip.                   |
| [GetStopTimesByStop](stop-times.md#getstoptimesbystop)                   | Stop Times     | Get a list of schedule information for a given stop.                              |
| [GetPlannedTripsByLatLon](trip-planner.md#getplannedtripsbylatlon)       | Trip Planner   | Get's a list of possible itineraries based on an origin and destination latitude… |
| [GetPlannedTripsByStops](trip-planner.md#getplannedtripsbystops)         | Trip Planner   | Get's a list of possible itineraries based on an origin and destination stop_id.  |
| [GetVehicle](vehicles.md#getvehicle)                                     | Vehicles       | Get a vehicle's real-time location by vehicle_id. Do not poll this more than onc… |
| [GetVehicles](vehicles.md#getvehicles)                                   | Vehicles       | Get information for all currently tracked vehicles.                               |
| [GetVehiclesByRoute](vehicles.md#getvehiclesbyroute)                     | Vehicles       | Get a vehicle's real-time location by vehicle_id. Do not poll this more than onc… |
| [GetLastFeedUpdate](metadata.md#getlastfeedupdate)                       | Metadata       | Gets the last time the static API data was updated from the GTFS feed.            |

---

## Authentication & Base URL

All requests follow this pattern:

```
https://developer.mtd.org/api/v2.2/{format}/{method}?key=YOUR_API_KEY[&param=value...]
```

| Item | Value |
| ---- | ----- |
| API version | `v2.2` |
| Formats | `json` or `xml` |
| Auth param | `key` — required on every request |
| Rate limit | Do not poll any single endpoint more than **once per minute** |

Register for an API key at <https://developer.mtd.org/>.

---

## Response Envelope

Every response (JSON or XML) wraps the payload in a common envelope:

```json
{
  "changeset_id": "DCF8E8679280BEAB785ABE9C68D9F612",
  "new_changeset": true,
  "time": "2012-01-24T15:52:56-06:00",
  "status": { "code": 200, "msg": "ok" },
  "rqst": {
    "method": "GetCalendarDatesByDate",
    "params": { "date": "20120124" }
  },
  "<data_key>": [ ... ]
}
```

| Field | Description |
| ----- | ----------- |
| `changeset_id` | Hash of the current static data snapshot. Changes whenever GTFS data is updated. Use with [`GetLastFeedUpdate`](metadata.md) for cache invalidation. |
| `new_changeset` | `true` if this is the first response with this `changeset_id` in your session |
| `time` | Server timestamp of the response (ISO 8601 with timezone) |
| `status.code` | HTTP-style status code (`200` = ok, `400` = bad request, etc.) |
| `status.msg` | Human-readable status string |
| `rqst` | Echo of the method name and parameters sent |
| `<data_key>` | Method-specific payload (e.g. `departures`, `vehicles`, `stops`) |

### changeset_id Caching Pattern

```
1. Call GetLastFeedUpdate → store last_updated timestamp
2. On subsequent calls, compare changeset_id in any response
3. If new_changeset=true, refresh any cached static data (routes, stops, shapes)
4. Real-time data (departures, vehicles) should never be cached
```

---

## Files in This Directory

*19 methods across 9 categories.*

- **[Calendar Dates](calendar-dates.md)** — `GetCalendarDatesByDate`, `GetCalendarDatesByService`
- **[Departures](departures.md)** — `GetDeparturesByStop`
- **[Routes](routes.md)** — `GetRoute`, `GetRoutes`, `GetRoutesByStop`
- **[Shapes](shapes.md)** — `GetShape`, `GetShapeBetweenStops`
- **[Stops](stops.md)** — `GetStop`, `GetStops`, `GetStopsByLatLon`
- **[Stop Times](stop-times.md)** — `GetStopTimesByTrip`, `GetStopTimesByStop`
- **[Trip Planner](trip-planner.md)** — `GetPlannedTripsByLatLon`, `GetPlannedTripsByStops`
- **[Vehicles](vehicles.md)** — `GetVehicle`, `GetVehicles`, `GetVehiclesByRoute`
- **[Metadata](metadata.md)** — `GetLastFeedUpdate`

---

## Data Model Relationships

```
Route ──────────── has many ──────────── Trips
  │                                        │
  │ GetRoute / GetRoutes                   │ GetStopTimesByTrip
  │ GetRoutesByStop                        │
  ▼                                        ▼
Shape ─── GetShape ────────────────────── Stop Times
  │        GetShapeBetweenStops              │
  │                                        ▼
Stop ──────────── has many ──────────── Departures (real-time)
  │  GetStop / GetStops                    │
  │  GetStopsByLatLon                      │ GetDeparturesByStop
  │  GetStopTimesByStop                    ▼
  └──────────────────────────────────── Vehicle (real-time)
                                          GetVehicle / GetVehicles
                                          GetVehiclesByRoute

Calendar Dates ── GetCalendarDatesByDate / GetCalendarDatesByService
  └─ service_id links to Trip schedule windows

Trip Planner ── GetPlannedTripsByLatLon / GetPlannedTripsByStops
  └─ returns itineraries composed of walking legs + service (bus) legs
```

---

*Auto-generated by scrape_mtd.py from developer.mtd.org*