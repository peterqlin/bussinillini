# Stop Times

[← Back to README](README.md)

**Methods in this file:**

- [GetStopTimesByTrip](#getstoptimesbytrip)
- [GetStopTimesByStop](#getstoptimesbystop)

---

## GetStopTimesByTrip

Get a list of stops with scheduled information about this trip.

**Endpoint**

```
https://developer.mtd.org/api/v2.2/{format}/getstoptimesbytrip
```

**Parameters**

| Parameter      | Required | Description                                      |
| -------------- | -------- | ------------------------------------------------ |
| `key`          | Yes      | your API key                                     |
| `trip_id`      | Yes      | id of trip — see [Stop Times](stop-times.md)     |
| `changeset_id` | No       | see interpretting responses for more information |

**Response Fields**

| Field            | Description                                  |
| ---------------- | -------------------------------------------- |
| `arrival_times`  | scheduled time of arrival (HH:mm:ss)         |
| `departure_time` | scheduled time of departure (HH:mm:ss)       |
| `stop_id`        | id of stop — see [Stops](stops.md)           |
| `stop_sequence`  | sequence of stop                             |
| `trip_id`        | id of trip — see [Stop Times](stop-times.md) |

**Remarks**

> Use this method to find out which stops a trip will service and the scheduled times. You can also use the stop_sequence to find out the next or previous stops.

> Please note that we use a 30 hour clock. Any times past 24:00:00 are technically part of the next day, but we still consider them part of the same service day.

**Examples**

*JSON Request*
```
https://developer.mtd.org/api/v2.2/json/getstoptimesbytrip?key=YOUR_API_KEY
```

*JSON Response*
```json
{
    "changeset_id":"B0B7F17E9A7C0B5E1D36EFE1BF3DF8F8",
    "new_changeset": true,
    "time":"2012-01-24T16:27:05-06:00",
    "status":{
        "code":200,
        "msg":"ok"
    },
   "rqst":{
       "method":"GetStopTimesByTrip",
       "params":{
           "trip_id":"[@14.0.51617008@][3][1275939436250]/12__O1"
       }
   },
   "stop_times":[
      {
          "arrival_time":"11:22:00",
          "departure_time":"11:22:00",
          "stop_sequence":"0",
          "stop_point":{
              "code":"MTD2456",
              "stop_id":"CF:1",
              "stop_lat":40.11347,
              "stop_lon":-88.27946,
              "stop_name":"Country Fair (South Side)"
          }
      },
      {
          "arrival_time":"11:22:30",
          "departure_time":"11:22:30",
          "stop_sequence":"1",
          "stop_point":{
              "code":"MTD3162",
              "stop_id":"SPFLD:4",
              "stop_lat":40.11303,
              "stop_lon":-88.278852,
              "stop_name":"Springfield at Country Fair (NW Corner)"
          }
      },
      {
          "arrival_time":"11:23:00",
          "departure_time":"11:23:00",
          "stop_sequence":"2",
          "stop_point":{
              "code":"MTD7311",
              "stop_id":"SPFLDCFD:1",
              "stop_lat":40.112963,
              "stop_lon":-88.282627,
              "stop_name":"Springfield & Country Fair Dr. (NE)"
          }
      }
   ]
}
```

*XML Request*
```
https://developer.mtd.org/api/v2.2/xml/getstoptimesbytrip?key=YOUR_API_KEY
```

*XML Response*
```xml
<?xml version="1.0" encoding="utf-8"?>
<rsp xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" changeset_id="B0B7F17E9A7C0B5E1D36EFE1BF3DF8F8" new_changeset="true" time="2012-01-24T16:22:18-06:00">
    <status code="200" msg="ok" />
    <rqst method="GetStopTimesByTrip">
        <params trip_id="[@14.0.51617008@][3][1275939436250]/12__O1" />
    </rqst>
    <stop_times>
        <stop_time arrival_time="11:22:00" departure_time="11:22:00" stop_sequence="0">
            <stop_point stop_id="CF:1" code="MTD2456" stop_lat="40.113470" stop_lon="-88.279460" stop_name="Country Fair (South Side)" />
        </stop_time>
        <stop_time arrival_time="11:22:30" departure_time="11:22:30" stop_sequence="1">
            <stop_point stop_id="SPFLD:4" code="MTD3162" stop_lat="40.113030" stop_lon="-88.278852" stop_name="Springfield at Country Fair (NW Corner)" />
        </stop_time>
        <stop_time arrival_time="11:23:00" departure_time="11:23:00" stop_sequence="2">
            <stop_point stop_id="SPFLDCFD:1" code="MTD7311" stop_lat="40.112963" stop_lon="-88.282627" stop_name="Springfield & Country Fair Dr. (NE)" />
        </stop_time>
    </stop_times>
</rsp>
```

---

## GetStopTimesByStop

Get a list of schedule information for a given stop.

**Endpoint**

```
https://developer.mtd.org/api/v2.2/{format}/getstoptimesbystop
```

**Parameters**

| Parameter      | Required | Description                                                      |
| -------------- | -------- | ---------------------------------------------------------------- |
| `key`          | Yes      | your API key                                                     |
| `stop_id`      | Yes      | id of stop — see [Stops](stops.md)                               |
| `route_id`     | No       | semi-colon separated list of route ids — see [Routes](routes.md) |
| `date`         | No       | scheduled date                                                   |
| `changeset_id` | No       | see interpretting responses for more information                 |

**Response Fields**

| Field            | Description                                  |
| ---------------- | -------------------------------------------- |
| `arrival_times`  | scheduled time of arrival (HH:mm:ss)         |
| `departure_time` | scheduled time of departure (HH:mm:ss)       |
| `stop_id`        | id of stop — see [Stops](stops.md)           |
| `stop_sequence`  | sequence of stop                             |
| `trip_id`        | id of trip — see [Stop Times](stop-times.md) |

**Remarks**

> This method lets you get a schedule catered to a specific stop. You can also filter it by route(s) or date to fit your needs.

> Please note that we use a 30 hour clock. Any times past 24:00:00 are technically part of the next day, but we still consider them part of the same service day.

**Examples**

*JSON Request*
```
https://developer.mtd.org/api/v2.2/json/getstoptimesbystop?key=YOUR_API_KEY
```

*JSON Response*
```json
{
    "changeset_id":"A0FAD93A287FBF7A8D089A9CDC2B22D7",
    "new_changeset": true,
    "time":"2012-01-24T16:18:44-06:00",
    "status":{
        "code":200,
        "msg":"ok"
    },
   "rqst":{
       "method":"GetStopTimesByStop",
       "params":{
           "date":"20120124",
           "stop_id":"it:1"
       }
   },
   "stop_times":[
      {
          "arrival_time":"06:33:00",
          "departure_time":"06:33:00",
          "stop_sequence":"34",
          "trip":{
              "trip_id":"[@14.0.51616627@][10][1284039197375]/0__BB3",
              "trip_headsign":"CAMPUS",
              "route_id":"9A BROWN",
              "block_id":"BB3",
              "direction":"A",
              "service_id":"BB3",
              "shape_id":"9A->PLAZA"
          }
      },
      {
          "arrival_time":"06:33:00",
          "departure_time":"06:33:00",
          "stop_sequence":"0",
          "trip":{
              "trip_id":"[@14.0.56288268@][4][1302636304834]/0__L1_SCHUIMF",
              "trip_headsign":"WEST - COUNTRY FAIR",
              "route_id":"BLUE",
              "block_id":"L1 SCHUIMF",
              "direction":"West",
              "service_id":"L1 SCHUIMF",
              "shape_id":"4W"
          }
      },
      {
          "arrival_time":"06:33:00",
          "departure_time":"06:33:00",
          "stop_sequence":"1",
          "trip":{
              "trip_id":"[@14.0.56288268@][4][1307563015328]/0__L1_SCHUIMF",
              "trip_headsign":"WEST - COUNTRY FAIR",
              "route_id":"BLUE",
              "block_id":"L1 SCHUIMF",
              "direction":"West",
              "service_id":"L1 SCHUIMF",
              "shape_id":"[@14.0.56288268@]341"
          }
      }
   ]
}
```

*XML Request*
```
https://developer.mtd.org/api/v2.2/xml/getstoptimesbystop?key=YOUR_API_KEY
```

*XML Response*
```xml
<?xml version="1.0" encoding="utf-8"?>
<rsp xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" changeset_id="A0FAD93A287FBF7A8D089A9CDC2B22D7" new_changeset="true" time="2012-01-24T16:20:35-06:00">
    <status code="200" msg="ok" />
    <rqst method="GetStopTimesByStop">
        <params date="20120124" stop_id="it:1" />
    </rqst>
    <stop_times>
        <stop_time arrival_time="06:33:00" departure_time="06:33:00" stop_sequence="34">
            <trip trip_id="[@14.0.51616627@][10][1284039197375]/0__BB3" trip_headsign="CAMPUS" route_id="9A BROWN" service_id="BB3" shape_id="9A->PLAZA" direction="A" block_id="BB3" />
        </stop_time>
        <stop_time arrival_time="06:33:00" departure_time="06:33:00" stop_sequence="0">
            <trip trip_id="[@14.0.56288268@][4][1302636304834]/0__L1_SCHUIMF" trip_headsign="WEST - COUNTRY FAIR" route_id="BLUE" service_id="L1 SCHUIMF" shape_id="4W" direction="West" block_id="L1 SCHUIMF" />
        </stop_time>
        <stop_time arrival_time="06:33:00" departure_time="06:33:00" stop_sequence="1">
            <trip trip_id="[@14.0.56288268@][4][1307563015328]/0__L1_SCHUIMF" trip_headsign="WEST - COUNTRY FAIR" route_id="BLUE" service_id="L1 SCHUIMF" shape_id="[@14.0.56288268@]341" direction="West" block_id="L1 SCHUIMF" />
        </stop_time>
    </stop_times>
</rsp>
```

---

## Related

- [Routes](routes.md)
- [Stops](stops.md)

---

[← Back to README](README.md)
