# Departures

[← Back to README](README.md)

---

## GetDeparturesByStop

Get a list of real-time departures for a specific stop_id. Do not poll this more than once a minute per stop or attempt to retrieve data for every stop.

**Endpoint**

```
https://developer.mtd.org/api/v2.2/{format}/getdeparturesbystop
```

**Parameters**

| Parameter  | Required | Description                                                      |
| ---------- | -------- | ---------------------------------------------------------------- |
| `key`      | Yes      | your API key                                                     |
| `stop_id`  | Yes      | id of the stop (ex. IT:1 or IT) — see [Stops](stops.md)          |
| `route_id` | No       | semi-colon separated list of route ids — see [Routes](routes.md) |
| `pt`       | No       | preview time in minutes between 0 and 60 (30 by default)         |
| `count`    | No       | maximum number of departures you would like to recieve           |

**Response Fields**

| Field           | Description                                                          |
| --------------- | -------------------------------------------------------------------- |
| `destination`   | trip's destination stop                                              |
| `expected`      | expected departure time of the bus for the given stop                |
| `expected_mins` | number of minutes before expected departure time                     |
| `headsign`      | information usually shown on headsign                                |
| `location`      | latitude and longitude of vehicle                                    |
| `is_monitored`  | whether the vehicle is communicating                                 |
| `is_scheduled`  | whether this trip was scheduled                                      |
| `is_istop`      | if this trip can be boarded without a fare/pass                      |
| `origin`        | trip's origin stop                                                   |
| `route`         | route information for the trip — see [Routes](routes.md)             |
| `scheduled`     | scheduled departure time of the bus for the given stop               |
| `stop_id`       | id of the stop the bus will be at — see [Stops](stops.md)            |
| `trip`          | trip information for the departure — see [Stop Times](stop-times.md) |
| `vehicle_id`    | id associated with vehicle — see [Vehicles](vehicles.md)             |

**Remarks**

> These are live, stop-centric results based on GPS and the latest information in our system. We've tried to pack as much useful data into the results so you can use this in conjunction with the other methods to piece together all the information about a given bus in real-time.

> There are a few things to note about the data provided here. The is_monitored field does not imply you should show the scheduled time! The expected value is based on the last known location of the bus and could still be more accurate. If is_scheduled field is false, the trip element will be blank because this trip was no scheduled previously. It was added supplementary to the regularly scheduled service.

> The trip and shape_id depict the trip that the bus will use to pass this given stop; however, this may not be the values for the bus at this moment. For instance, you may see a 5E Green that's 40 minutes out. The trip and shape_id will be for a 5E, but the bus might currently be a 5W Green that will eventually become a 5E! Please keep this in mind when you're mapping results. We hope to be able to provide the current values later.

> To get results for all the stops at an intersection, drop the number and colon from the stop_id (ex. IT:1 -> IT).

> The vehicle_id is unique to each vehicle and also indicates the date the vehicle was acquired (e.g. 0958 is from 2009).

> With the iStop field, MTD is making an exception to our policy of not allowing co-branding of MTD's names or logos. You may use the iStop logo and identify data as such. You may not misidentify any departure as an iStop that is not identified as such through the API. You may not use this name or logo to seek to mislead or misinform your users. You can download the iStop logo as an SVG or a high resolution PNG. Visit our website to learn more about how iStops work.

**Examples**

*JSON Request*
```
https://developer.mtd.org/api/v2.2/json/getdeparturesbystop?key=YOUR_API_KEY
```

*JSON Response*
```json
{
    "time":"2013-03-28T11:24:57-05:00",
	"new_changeset":true,
	"status":{
	    "code":200,
		"msg":"ok"
	},
   "rqst":{
       "method":"GetDeparturesByStop",
       "params":{
           "stop_id":"iu"
       }
   },
   "departures":[
      {
          "stop_id":"IU:1",
          "headsign":"13N Silver",
          "route":{
              "route_color":"cccccc",
              "route_id":"SILVER",
              "route_long_name":"Silver",
              "route_short_name":"13",
              "route_text_color":"000000"
          },
          "trip":{
              "trip_id":"[@12.0.42199629@][3][1246896440906]/11__SV3",
              "trip_headsign":"NORTH - LINCOLN SQUARE",
              "route_id":"SILVER",
              "block_id":"SV3",
              "direction":"North",
              "service_id":"SV3",
              "shape_id":"SILVER 2"
          },
          "vehicle_id":"0108",
          "origin":{
              "stop_id":"PAR:2"
          },
          "destination":{
              "stop_id":"LSE:8"
          },
          "is_monitored":true,
          "is_scheduled":true,
          "is_istop":true,
          "scheduled":"2013-03-28T11:23:00-05:00",
          "expected":"2013-03-28T11:25:15-05:00",
          "expected_mins":0,
          "location":{
              "lat":40.108617,
              "lon":-88.22875
          }
      },
      {
          "stop_id":"IU:2",
          "headsign":"5W GreenHOPPER",
          "route":{
              "route_color":"00a638",
              "route_id":"GREENHOPPER",
              "route_long_name":"Greenhopper",
              "route_short_name":"5",
              "route_text_color":"000000"
          },
          "trip":{
              "trip_id":"[@7.0.41101146@][4][1237930167062]/20__GNX4_UIMF",
              "trip_headsign":"WEST - PROSPECT",
              "route_id":"GREENHOPPER",
              "block_id":"GNX4 UIMF",
              "direction":"West",
              "service_id":"GNX4 UIMF",
              "shape_id":"5W HOPPER 81"
          },
          "vehicle_id":"1171",
          "origin":{
              "stop_id":"WASHLRMN:7"
          },
          "destination":{
              "stop_id":"SPFLDPSPCT:2"
          },
          "is_monitored":true,
          "is_scheduled":true,
          "is_istop":false,
          "scheduled":"2013-03-28T11:29:00-05:00",
          "expected":"2013-03-28T11:27:49-05:00",
          "expected_mins":3,
          "location":{
              "lat":40.11058,
              "lon":-88.217
          }
      },
      {
          "stop_id":"IU:2",
          "headsign":"12W Teal",
          "route":{
              "route_color":"006991",
              "route_id":"TEAL",
              "route_long_name":"Teal",
              "route_short_name":"12",
              "route_text_color":"ffffff"
          },
          "trip":{
              "trip_id":"[@7.0.41893871@][4][1243540851671]/13__T4UIMF",
              "trip_headsign":"WEST - ILLINOIS TERMINAL",
              "route_id":"TEAL",
              "block_id":"T4UIMF",
              "direction":"West",
              "service_id":"T4UIMF",
              "shape_id":"12W TEAL 12"
          },
          "vehicle_id":"0314",
          "origin":{
              "stop_id":"ODSS:1"
          },
          "destination":{
              "stop_id":"IT:5"
          },
          "is_monitored":true,
          "is_scheduled":true,
          "is_istop":true,
          "scheduled":"2013-03-28T11:28:00-05:00",
          "expected":"2013-03-28T11:28:24-05:00",
          "expected_mins":3,
          "location":{
              "lat":40.10051,
              "lon":-88.222833
          }
      }
   ]
}
```

*XML Request*
```
https://developer.mtd.org/api/v2.2/xml/getdeparturesbystop?key=YOUR_API_KEY
```

*XML Response*
```xml
<?xml version="1.0" encoding="utf-8"?>
<rsp xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" time="2013-03-28T11:24:55-05:00" new_changeset="true">
	<status code="200" msg="ok" />
	<rqst method="GetDeparturesByStop">
		<params stop_id="iu" />
	</rqst>
	<departures>
		<departure vehicle_id="0108" is_monitored="true" is_scheduled="true" is_istop="true" stop_id="IU:1" headsign="13N Silver" scheduled="2013-03-28T11:23:00-05:00" expected="2013-03-28T11:25:15-05:00" expected_mins="0">
			<route route_color="cccccc" route_id="SILVER" route_long_name="Silver" route_short_name="13" route_text_color="000000" />
			<trip trip_id="[@12.0.42199629@][3][1246896440906]/11__SV3" trip_headsign="NORTH - LINCOLN SQUARE" route_id="SILVER" service_id="SV3" shape_id="SILVER 2" direction="North" block_id="SV3" />
			<origin stop_id="PAR:2" />
			<destination stop_id="LSE:8" />
			<location lat="40.108617" lon="-88.22875" />
		</departure>
		<departure vehicle_id="1171" is_monitored="true" is_scheduled="true" is_istop="false" stop_id="IU:2" headsign="5W GreenHOPPER" scheduled="2013-03-28T11:29:00-05:00" expected="2013-03-28T11:27:49-05:00" expected_mins="3">
			<route route_color="00a638" route_id="GREENHOPPER" route_long_name="Greenhopper" route_short_name="5" route_text_color="000000" />
			<trip trip_id="[@7.0.41101146@][4][1237930167062]/20__GNX4_UIMF" trip_headsign="WEST - PROSPECT" route_id="GREENHOPPER" service_id="GNX4 UIMF" shape_id="5W HOPPER 81" direction="West" block_id="GNX4 UIMF" />
			<origin stop_id="WASHLRMN:7" />
			<destination stop_id="SPFLDPSPCT:2" />
			<location lat="40.11058" lon="-88.217" />
		</departure>
		<departure vehicle_id="0314" is_monitored="true" is_scheduled="true" is_istop="true" stop_id="IU:2" headsign="12W Teal" scheduled="2013-03-28T11:28:00-05:00" expected="2013-03-28T11:28:24-05:00" expected_mins="3">
			<route route_color="006991" route_id="TEAL" route_long_name="Teal" route_short_name="12" route_text_color="ffffff" />
			<trip trip_id="[@7.0.41893871@][4][1243540851671]/13__T4UIMF" trip_headsign="WEST - ILLINOIS TERMINAL" route_id="TEAL" service_id="T4UIMF" shape_id="12W TEAL 12" direction="West" block_id="T4UIMF" />
			<origin stop_id="ODSS:1" />
			<destination stop_id="IT:5" />
			<location lat="40.10051" lon="-88.222833" />
		</departure>
	</departures>
</rsp>
```

---

## Related

- [Routes](routes.md)
- [Stop Times](stop-times.md)
- [Stops](stops.md)
- [Vehicles](vehicles.md)

---

[← Back to README](README.md)
