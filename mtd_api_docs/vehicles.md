# Vehicles

[← Back to README](README.md)

**Methods in this file:**

- [GetVehicle](#getvehicle)
- [GetVehicles](#getvehicles)
- [GetVehiclesByRoute](#getvehiclesbyroute)

---

## GetVehicle

Get a vehicle's real-time location by vehicle_id. Do not poll this more than once a minute per minute or attempt to retrieve data for every vehicle.

**Endpoint**

```
https://developer.mtd.org/api/v2.2/{format}/getvehicle
```

**Parameters**

| Parameter    | Required | Description                    |
| ------------ | -------- | ------------------------------ |
| `key`        | Yes      | your API key                   |
| `vehicle_id` | Yes      | id of the vehicle (e.g. 1352). |

**Response Fields**

| Field                 | Description                                                               |
| --------------------- | ------------------------------------------------------------------------- |
| `vehicle_id`          | vehicle number associated with vehicle — see [Vehicles](vehicles.md)      |
| `trip`                | trip information for the departure — see [Stop Times](stop-times.md)      |
| `location`            | the last known latitude and longitude of the vehicle                      |
| `previous_stop_id`    | The last stop that the vehicle served                                     |
| `next_stop_id`        | The next stop that the vehicle will serve                                 |
| `origin_stop_id`      | The stop where the vehicle began it's trip                                |
| `destination_stop_id` | The stop where the vehicle will end its trip                              |
| `last_updated`        | The last time the vehicle sent a real-time location update to our system. |

**Remarks**

> These are live, vehicle-centric results based on GPS and the latest information in our system. We've tried to pack as much useful data into the results so you can use this in conjunction with the other methods to piece together all the information about a given vehicle in real-time.

> Vehicles send their GPS position over a very limited bandwidth data-radio. Because of this they only update their position every minute or so. Do not poll for a specific vehicle more than once ever 60 seconds. There will be little use in doing this anyway as the information will probably not have changed.

> The vehicle_id is unique to each vehicle and indicates the vehicle's model year (e.g. 1352 is from 2013).

**Examples**

*JSON Request*
```
https://developer.mtd.org/api/v2.2/json/getvehicle?key=YOUR_API_KEY
```

*JSON Response*
```json
{
   "time":"2013-03-04T15:19:36-06:00",
   "new_changeset":true,
   "status":{
      "code":200,
      "msg":"ok"
   },
   "rqst":{
      "method":"GetVehicle",
      "params":{
         "vehicle_id":"1352"
      }
   },
   "vehicles":[
      {
         "vehicle_id":"1352",
         "trip":{
            "trip_id":"8GN510__GN8",
            "trip_headsign":"EAST - WASHINGTON & LIERMAN",
            "route_id":"GREEN",
            "block_id":"GN8",
            "direction":"East",
            "service_id":"GN8",
            "shape_id":"5E"
         },
         "location":{
            "lat":40.110263,
            "lon":-88.230583
         },
         "previous_stop_id":"GRN2ND:3",
         "next_stop_id":"GRN6TH:3",
         "origin_stop_id":"MPLPKLWNDL:1",
         "destination_stop_id":"WASHLRMN:2",
         "last_updated":"2013-03-04T15:19:33-06:00"
      }
   ]
}
```

*XML Request*
```
https://developer.mtd.org/api/v2.2/xml/getvehicle?key=YOUR_API_KEY
```

*XML Response*
```xml
<?xml version="1.0" encoding="utf-8"?>
<rsp xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" time="2013-03-04T15:19:33-06:00" new_changeset="true">
	<status code="200" msg="ok" />
	<rqst method="GetVehicle">
		<params vehicle_id="1352" />
	</rqst>
	<vehicles>
		<vehicle vehicle_id="1352" previous_stop_id="GRN2ND:3" next_stop_id="GRN6TH:3" origin_stop_id="MPLPKLWNDL:1" destination_stop_id="WASHLRMN:2" last_updated="2013-03-04T15:18:39-06:00">
			<trip trip_id="8GN510__GN8" trip_headsign="EAST - WASHINGTON & LIERMAN" route_id="GREEN" service_id="GN8" shape_id="5E" direction="East" block_id="GN8" />
			<location lat="40.110200" lon="-88.233750" />
		</vehicle>
	</vehicles>
</rsp>
```

---

## GetVehicles

Get information for all currently tracked vehicles.

**Endpoint**

```
https://developer.mtd.org/api/v2.2/{format}/getvehicles
```

**Parameters**

| Parameter | Required | Description  |
| --------- | -------- | ------------ |
| `key`     | Yes      | your API key |

**Response Fields**

| Field                 | Description                                                               |
| --------------------- | ------------------------------------------------------------------------- |
| `vehicle_id`          | vehicle number associated with vehicle — see [Vehicles](vehicles.md)      |
| `trip`                | trip information for the departure — see [Stop Times](stop-times.md)      |
| `location`            | the last known latitude and longitude of the vehicle                      |
| `previous_stop_id`    | The last stop that the vehicle served                                     |
| `next_stop_id`        | The next stop that the vehicle will serve                                 |
| `origin_stop_id`      | The stop where the vehicle began it's trip                                |
| `destination_stop_id` | The stop where the vehicle will end its trip                              |
| `last_updated`        | The last time the vehicle sent a real-time location update to our system. |

**Remarks**

> These are live, vehicle-centric results based on GPS and the latest information in our system. We've tried to pack as much useful data into the results so you can use this in conjunction with the other methods to piece together all the information about a given vehicle in real-time.

> Vehicles send their GPS position over a very limited bandwidth data-radio. Because of this they only update their position every minute or so. Do not poll for a specific vehicle more than once ever 60 seconds. There will be little use in doing this anyway as the information will probably not have changed.

> The vehicle_id is unique to each vehicle and indicates the vehicle's model year (e.g. 1352 is from 2013).

**Examples**

*JSON Request*
```
https://developer.mtd.org/api/v2.2/json/getvehicles?key=YOUR_API_KEY
```

*JSON Response*
```json
{
    "time":"2013-03-14T10:15:08-05:00",
	"new_changeset":true,
	"status":{
	    "code":200,
		"msg":"ok"
	},
   "rqst":{
       "method":"GetVehicles",
       "params":{
       }
   },
   "vehicles":[
      {
          "vehicle_id":"1167",
          "trip":{
              "trip_id":"[@15.0.61662606@][20][1329164205016]/10__BB2",
              "trip_headsign":"PARKLAND COLLEGE",
              "route_id":"BROWN",
              "block_id":"BB2",
              "direction":"B",
              "service_id":"BB2",
              "shape_id":"[@15.0.61662606@]366"
          },
          "location":{
              "lat":40.112353,
              "lon":-88.282917
          },
          "previous_stop_id":"SPFLDCFD:7",
          "next_stop_id":"CRSNTRBR:3",
          "origin_stop_id":"PKLN:1",
          "destination_stop_id":"PKLN:1",
          "last_updated":"2013-03-14T10:15:08-05:00"
      },
      {
          "vehicle_id":"1166",
          "trip":{
              "trip_id":"[@14.0.56289113@][3][1303767339853]/3__G3UIMF",
              "trip_headsign":"EAST - GOLDHOPPER",
              "route_id":"GOLDHOPPER",
              "block_id":"G3UIMF",
              "direction":"East",
              "service_id":"G3UIMF",
              "shape_id":"GOLDHOPPER 2"
          },
          "location":{
              "lat":40.10583,
              "lon":-88.223833
          },
          "previous_stop_id":"GWNNV:2",
          "next_stop_id":"GDWNMRL:2",
          "origin_stop_id":"E14:2",
          "destination_stop_id":"LSE:8",
          "last_updated":"2013-03-14T10:15:08-05:00"
      },
      {
          "vehicle_id":"0915",
          "trip":{
              "trip_id":"[@7.0.41200832@][2][1238430887312]/153__I2_UIMF",
              "trip_headsign":"SOUTH - PAR/FAR",
              "route_id":"ILLINI",
              "block_id":"I2 UIMF",
              "direction":"South",
              "service_id":"I2 UIMF",
              "shape_id":"22S ILLINI 20"
          },
          "location":{
              "lat":40.12027,
              "lon":-88.219583
          },
          "previous_stop_id":"LNCLNCHCH:4",
          "next_stop_id":"UNIAVE:2",
          "origin_stop_id":"LNCLNKLRNY:1",
          "destination_stop_id":"PAR:2",
          "last_updated":"2013-03-14T10:15:08-05:00"
      },
      {
          "vehicle_id":"0322",
          "trip":{
              "trip_id":"[@7.0.41893871@][3][1243541396687]/79__T4UIMF",
              "trip_headsign":"EAST - ORCHARD DOWNS",
              "route_id":"TEAL",
              "block_id":"T4UIMF",
              "direction":"East",
              "service_id":"T4UIMF",
              "shape_id":"12E TEAL 13"
          },
          "location":{
              "lat":40.11533,
              "lon":-88.2415
          },
          "previous_stop_id":null,
          "next_stop_id":"MKTLGN:4",
          "origin_stop_id":"IT:5",
          "destination_stop_id":"ODSS:1",
          "last_updated":"2013-03-14T10:15:08-05:00"
      },
      {
          "vehicle_id":"0332",
          "trip":{
              "trip_id":"[@7.0.41101146@][4][1237930167062]/18__GNX5_UIMF",
              "trip_headsign":"WEST - PROSPECT",
              "route_id":"GREENHOPPER",
              "block_id":"GNX5 UIMF",
              "direction":"West",
              "service_id":"GNX5 UIMF",
              "shape_id":"5W HOPPER 81"
          },
          "location":{
              "lat":40.099243,
              "lon":-88.1955
          },
          "previous_stop_id":"CTGRVDE:2",
          "next_stop_id":"PACT:1",
          "origin_stop_id":"WASHLRMN:7",
          "destination_stop_id":"SPFLDPSPCT:2",
          "last_updated":"2013-03-14T10:15:08-05:00"
      }
   ]
}
```

*XML Request*
```
https://developer.mtd.org/api/v2.2/xml/getvehicles?key=YOUR_API_KEY
```

*XML Response*
```xml
<?xml version="1.0" encoding="utf-8"?>
<rsp time="2013-03-14T10:15:22-05:00" new_changeset="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
	<status code="200" msg="ok" />
	<rqst method="GetVehicles">
		<params />
	</rqst>
	<vehicles>
		<vehicle vehicle_id="1167" previous_stop_id="SPFLDCFD:7" next_stop_id="CRSNTRBR:3" origin_stop_id="PKLN:1" destination_stop_id="PKLN:1" last_updated="2013-03-14T10:15:08-05:00">
			<trip trip_id="[@15.0.61662606@][20][1329164205016]/10__BB2" trip_headsign="PARKLAND COLLEGE" route_id="BROWN" service_id="BB2" shape_id="[@15.0.61662606@]366" direction="B" block_id="BB2" />
			<location lat="40.112353" lon="-88.282917" />
		</vehicle>
		<vehicle vehicle_id="1166" previous_stop_id="GWNNV:2" next_stop_id="GDWNMRL:2" origin_stop_id="E14:2" destination_stop_id="LSE:8" last_updated="2013-03-14T10:15:08-05:00">
			<trip trip_id="[@14.0.56289113@][3][1303767339853]/3__G3UIMF" trip_headsign="EAST - GOLDHOPPER" route_id="GOLDHOPPER" service_id="G3UIMF" shape_id="GOLDHOPPER 2" direction="East" block_id="G3UIMF" />
			<location lat="40.105830" lon="-88.223833" />
		</vehicle>
		<vehicle vehicle_id="0915" previous_stop_id="LNCLNCHCH:4" next_stop_id="UNIAVE:2" origin_stop_id="LNCLNKLRNY:1" destination_stop_id="PAR:2" last_updated="2013-03-14T10:15:08-05:00">
			<trip trip_id="[@7.0.41200832@][2][1238430887312]/153__I2_UIMF" trip_headsign="SOUTH - PAR/FAR" route_id="ILLINI" service_id="I2 UIMF" shape_id="22S ILLINI 20" direction="South" block_id="I2 UIMF" />
			<location lat="40.120270" lon="-88.219583" />
		</vehicle>
		<vehicle vehicle_id="0322" next_stop_id="MKTLGN:4" origin_stop_id="IT:5" destination_stop_id="ODSS:1" last_updated="2013-03-14T10:15:08-05:00">
			<trip trip_id="[@7.0.41893871@][3][1243541396687]/79__T4UIMF" trip_headsign="EAST - ORCHARD DOWNS" route_id="TEAL" service_id="T4UIMF" shape_id="12E TEAL 13" direction="East" block_id="T4UIMF" />
			<location lat="40.115330" lon="-88.241500" />
		</vehicle>
		<vehicle vehicle_id="0332" previous_stop_id="CTGRVDE:2" next_stop_id="PACT:1" origin_stop_id="WASHLRMN:7" destination_stop_id="SPFLDPSPCT:2" last_updated="2013-03-14T10:15:08-05:00">
			<trip trip_id="[@7.0.41101146@][4][1237930167062]/18__GNX5_UIMF" trip_headsign="WEST - PROSPECT" route_id="GREENHOPPER" service_id="GNX5 UIMF" shape_id="5W HOPPER 81" direction="West" block_id="GNX5 UIMF" />
			<location lat="40.099243" lon="-88.195500" />
		</vehicle>
	</vehicles>
</rsp>
```

---

## GetVehiclesByRoute

Get a vehicle's real-time location by vehicle_id. Do not poll this more than once a minute per minute or attempt to retrieve data for every vehicle.

**Endpoint**

```
https://developer.mtd.org/api/v2.2/{format}/getvehiclesbyroute
```

**Parameters**

| Parameter  | Required | Description                                                            |
| ---------- | -------- | ---------------------------------------------------------------------- |
| `key`      | Yes      | your API key                                                           |
| `route_id` | Yes      | id of the route for which you want vehicles. — see [Routes](routes.md) |

**Response Fields**

| Field                 | Description                                                               |
| --------------------- | ------------------------------------------------------------------------- |
| `vehicle_id`          | vehicle number associated with vehicle — see [Vehicles](vehicles.md)      |
| `trip`                | trip information for the departure — see [Stop Times](stop-times.md)      |
| `location`            | the last known latitude and longitude of the vehicle                      |
| `previous_stop_id`    | The last stop that the vehicle served                                     |
| `next_stop_id`        | The next stop that the vehicle will serve                                 |
| `origin_stop_id`      | The stop where the vehicle began it's trip                                |
| `destination_stop_id` | The stop where the vehicle will end its trip                              |
| `last_updated`        | The last time the vehicle sent a real-time location update to our system. |

**Remarks**

> These are live, vehicle-centric results based on GPS and the latest information in our system. We've tried to pack as much useful data into the results so you can use this in conjunction with the other methods to piece together all the information about a given vehicle in real-time.

> Vehicles send their GPS position over a very limited bandwidth data-radio. Because of this they only update their position every minute or so. Do not poll for a specific vehicle more than once ever 60 seconds. There will be little use in doing this anyway as the information will probably not have changed.

> The route_id parameter can be a semicolon (;) delaminated list of route_ids. This can be useful if you want to get vehicles for several associated routes such as the GREEN and GREENHOPPER.

> The vehicle_id is unique to each vehicle and indicates the vehicle's model year (e.g. 1352 is from 2013).

**Examples**

*JSON Request*
```
https://developer.mtd.org/api/v2.2/json/getvehiclesbyroute?key=YOUR_API_KEY
```

*JSON Response*
```json
{
    "time":"2013-03-04T16:06:33-06:00",
    "new_changeset":true,
    "status":{
        "code":200,
        "msg":"ok"
    },
   "rqst":{
       "method":"GetVehiclesByRoute",
       "params":{
           "route_id":"teal"
       }
   },
   "vehicles":[
      {
          "vehicle_id":"0109",
          "trip":{
              "trip_id":"[@7.0.41893871@][3][1243541396687]\/96__T1UIMF",
              "trip_headsign":"EAST - ORCHARD DOWNS",
              "route_id":"TEAL",
              "block_id":"T1UIMF",
              "direction":"East",
              "service_id":"T1UIMF",
              "shape_id":"12E TEAL 13"
          },
          "location":{
              "lat":40.107540,
              "lon":-88.223833
          },
          "previous_stop_id":"GWNNV:4",
          "next_stop_id":"GRGDNR:3",
          "origin_stop_id":"IT:5",
          "destination_stop_id":"ODSS:1",
          "last_updated":"2013-03-04T16:05:51-06:00"
      },
      {
          "vehicle_id":"0101",
          "trip":{
              "trip_id":"[@7.0.41893871@][4][1243540851671]\/27__T2UIMF",
              "trip_headsign":"WEST - ILLINOIS TERMINAL",
              "route_id":"TEAL",
              "block_id":"T2UIMF",
              "direction":"West",
              "service_id":"T2UIMF",
              "shape_id":"12W TEAL 12"
          },
          "location":{
              "lat":40.103423,
              "lon":-88.221833
          },
          "previous_stop_id":"GRGDNR:2",
          "next_stop_id":"GWNNV:2",
          "origin_stop_id":"ODSS:1",
          "destination_stop_id":"IT:5",
          "last_updated":"2013-03-04T16:06:03-06:00"
      },
      {
          "vehicle_id":"0322",
          "trip":{
              "trip_id":"[@14.0.51708725@][4][1275506123875]\/18__T4UIMF",
              "trip_headsign":"WEST - ILLINOIS TERMINAL",
              "route_id":"TEAL",
              "block_id":"T4UIMF",
              "direction":"West",
              "service_id":"T4UIMF",
              "shape_id":"TEAL 23"
          },
          "location":{
              "lat":40.115520,
              "lon":-88.238667
          },
          "previous_stop_id":"WHT2ND:1",
          "next_stop_id":"1STCHSTR:2",
          "origin_stop_id":"PAR:2",
          "destination_stop_id":"IT:5",
          "last_updated":"2013-03-04T16:06:09-06:00"
      }
   ]
}
```

*XML Request*
```
https://developer.mtd.org/api/v2.2/xml/getvehiclesbyroute?key=YOUR_API_KEY
```

*XML Response*
```xml
<?xml version="1.0" encoding="utf-8"?>
<rsp xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" time="2013-03-04T16:06:48-06:00" new_changeset="true">
	<status code="200" msg="ok" />
	<rqst method="GetVehiclesByRoute">
		<params route_id="teal" />
	</rqst>
	<vehicles>
		<vehicle vehicle_id="0109" previous_stop_id="GWNNV:4" next_stop_id="GRGDNR:3" origin_stop_id="IT:5" destination_stop_id="ODSS:1" last_updated="2013-03-04T16:05:51-06:00">
			<trip trip_id="[@7.0.41893871@][3][1243541396687]/96__T1UIMF" trip_headsign="EAST - ORCHARD DOWNS" route_id="TEAL" service_id="T1UIMF" shape_id="12E TEAL 13" direction="East" block_id="T1UIMF" />
			<location lat="40.107540" lon="-88.223833" />
		</vehicle>
		<vehicle vehicle_id="0101" previous_stop_id="GRGDNR:2" next_stop_id="GWNNV:2" origin_stop_id="ODSS:1" destination_stop_id="IT:5" last_updated="2013-03-04T16:06:39-06:00">
			<trip trip_id="[@7.0.41893871@][4][1243540851671]/27__T2UIMF" trip_headsign="WEST - ILLINOIS TERMINAL" route_id="TEAL" service_id="T2UIMF" shape_id="12W TEAL 12" direction="West" block_id="T2UIMF" />
			<location lat="40.104247" lon="-88.223667" />
		</vehicle>
		<vehicle vehicle_id="0322" previous_stop_id="CHSTRWTR:1" origin_stop_id="PAR:2" destination_stop_id="IT:5" last_updated="2013-03-04T16:06:39-06:00">
			<trip trip_id="[@14.0.51708725@][4][1275506123875]/18__T4UIMF" trip_headsign="WEST - ILLINOIS TERMINAL" route_id="TEAL" service_id="T4UIMF" shape_id="TEAL 23" direction="West" block_id="T4UIMF" />
			<location lat="40.115520" lon="-88.238667" />
		</vehicle>
	</vehicles>
</rsp>
```

---

## Related

- [Routes](routes.md)
- [Stop Times](stop-times.md)

---

[← Back to README](README.md)
