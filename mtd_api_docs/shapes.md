# Shapes

[← Back to README](README.md)

**Methods in this file:**

- [GetShape](#getshape)
- [GetShapeBetweenStops](#getshapebetweenstops)

---

## GetShape

Get a list of points that define the shape of the route on a map.

**Endpoint**

```
https://developer.mtd.org/api/v2.2/{format}/getshape
```

**Parameters**

| Parameter      | Required | Description                                      |
| -------------- | -------- | ------------------------------------------------ |
| `key`          | Yes      | your API key                                     |
| `shape_id`     | Yes      | id of the shape — see [Shapes](shapes.md)        |
| `changeset_id` | No       | see interpretting responses for more information |

**Response Fields**

| Field                 | Description                                                           |
| --------------------- | --------------------------------------------------------------------- |
| `shape_dist_traveled` | total distance traveled to this point                                 |
| `shape_pt_lat`        | latitude of point                                                     |
| `shape_pt_lon`        | longitude of point                                                    |
| `stop_id`             | The stop id associeated with the shape point. — see [Stops](stops.md) |
| `shape_pt_sequence`   | sequence of point in GTFS feed                                        |

**Remarks**

> These points describe the path of the route on a map and how far a bus travels along that path. It does not indicate what stops the bus will service! To get this information, use GetStopTimesByTrip.

> To cut back on the amount of points, each path has been simplified in comparison to the path in the GTFS feed. This means that the shape_pt_sequence may not be contiguious, but will still convey the correct order.

> Keep in mind that not all shape points directly correlate to stops so the stop_id may or may not exist

**Examples**

*JSON Request*
```
https://developer.mtd.org/api/v2.2/json/getshape?key=YOUR_API_KEY
```

*JSON Response*
```json
{
    "changeset_id":"D586EEEDEE41977902CF6FE34479AD14",
    "new_changeset": true,
    "time":"2012-01-25T11:44:10-06:00",
    "status":{
        "code":200,
        "msg":"ok"
    },
   "rqst":{
       "method":"GetShape",
       "params":{
           "shape_id":"7E NO EDGE"
       }
   },
   "shapes":[
      {
          "shape_dist_traveled":6,
          "shape_pt_lat":40.131923,
          "shape_pt_lon":-88.28873,
          "shape_pt_sequence":1,
          "stop_id":"PKLN:1"
      },
      {
          "shape_dist_traveled":27.2,
          "shape_pt_lat":40.131779,
          "shape_pt_lon":-88.288873,
          "shape_pt_sequence":4
      },
      {
          "shape_dist_traveled":52.1,
          "shape_pt_lat":40.131596,
          "shape_pt_lon":-88.28872,
          "shape_pt_sequence":6
      }
   ]
}
```

*XML Request*
```
https://developer.mtd.org/api/v2.2/xml/getshape?key=YOUR_API_KEY
```

*XML Response*
```xml
<?xml version="1.0" encoding="utf-8"?>
<rsp xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" changeset_id="D586EEEDEE41977902CF6FE34479AD14" new_changeset="true" time="2012-01-25T11:45:26-06:00">
    <status code="200" msg="ok" />
    <rqst method="GetShape">
        <params shape_id="7E NO EDGE" />
    </rqst>
    <shapes>
        <shape shape_dist_traveled="6.0" shape_pt_lat="40.131923" shape_pt_lon="-88.288730" shape_pt_sequence="1" stop_id="PKLN:1" />
        <shape shape_dist_traveled="27.2" shape_pt_lat="40.131779" shape_pt_lon="-88.288873" shape_pt_sequence="4" />
        <shape shape_dist_traveled="52.1" shape_pt_lat="40.131596" shape_pt_lon="-88.288720" shape_pt_sequence="6" />
    </shapes>
</rsp>
```

---

## GetShapeBetweenStops

Get a list of points that define the shape of part of a shape on a map.

**Endpoint**

```
https://developer.mtd.org/api/v2.2/{format}/getshapebetweenstops
```

**Parameters**

| Parameter       | Required | Description                                            |
| --------------- | -------- | ------------------------------------------------------ |
| `key`           | Yes      | your API key                                           |
| `begin_stop_id` | Yes      | id of the beginning stop point — see [Stops](stops.md) |
| `end_stop_id`   | Yes      | id of the ending stop point — see [Stops](stops.md)    |
| `shape_id`      | Yes      | id of the shape — see [Shapes](shapes.md)              |
| `changeset_id`  | No       | see interpretting responses for more information       |

**Response Fields**

| Field                 | Description                                                           |
| --------------------- | --------------------------------------------------------------------- |
| `shape_dist_traveled` | total distance traveled to this point                                 |
| `shape_pt_lat`        | latitude of point                                                     |
| `shape_pt_lon`        | longitude of point                                                    |
| `stop_id`             | The stop id associeated with the shape point. — see [Stops](stops.md) |
| `shape_pt_sequence`   | sequence of point in GTFS feed                                        |

**Remarks**

> These points describe the path of the a trip on the map (i.e. results from planned trips). It is limited by a beginning and ending stop point. It does not indicate all the stops the bus will service! To get this information, use GetStopTimesByTrip.

> To cut back on the amount of points, each path has been simplified in comparison to the path in the GTFS feed. This means that the shape_pt_sequence may not be contiguious, but will still convey the correct order.

> Keep in mind that not all shape points directly correlate to stops so the stop_id may or may not exist

**Examples**

*JSON Request*
```
https://developer.mtd.org/api/v2.2/json/getshapebetweenstops?key=YOUR_API_KEY
```

*JSON Response*
```json
{
    "changeset_id":"860984CD896430192A357380D4225596",
    "new_changeset": true,
    "time":"2012-01-25T11:47:00-06:00",
    "status":{
        "code":200,
        "msg":"ok"
    },
   "rqst":{
       "method":"GetShapeBetweenStops",
       "params":{
           "begin_stop_id":"IT:1",
           "end_stop_id":"WRTHLY:4",
           "shape_id":"4W"
       }
   },
   "shapes":[
      {
          "shape_dist_traveled":5,
          "shape_pt_lat":40.115915,
          "shape_pt_lon":-88.240893,
          "shape_pt_sequence":1,
          "stop_id":"IT:1"
      },
      {
          "shape_dist_traveled":64.8,
          "shape_pt_lat":40.115409,
          "shape_pt_lon":-88.24112,
          "shape_pt_sequence":10
      },
      {
          "shape_dist_traveled":98.2,
          "shape_pt_lat":40.115271,
          "shape_pt_lon":-88.241466,
          "shape_pt_sequence":22
      }
   ]
}
```

*XML Request*
```
https://developer.mtd.org/api/v2.2/xml/getshapebetweenstops?key=YOUR_API_KEY
```

*XML Response*
```xml
<?xml version="1.0" encoding="utf-8"?>
<rsp xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" changeset_id="860984CD896430192A357380D4225596" new_changeset="true" time="2012-01-25T11:48:18-06:00">
    <status code="200" msg="ok" />
    <rqst method="GetShapeBetweenStops">
        <params begin_stop_id="IT:1" end_stop_id="WRTHLY:4" shape_id="4W" />
    </rqst>
    <shapes>
        <shape shape_dist_traveled="5.0" shape_pt_lat="40.115915" shape_pt_lon="-88.240893" shape_pt_sequence="1" stop_id="IT:1" />
        <shape shape_dist_traveled="64.8" shape_pt_lat="40.115409" shape_pt_lon="-88.241120" shape_pt_sequence="10" />
        <shape shape_dist_traveled="98.2" shape_pt_lat="40.115271" shape_pt_lon="-88.241466" shape_pt_sequence="22" />
    </shapes>
</rsp>
```

---

## Related

- [Stops](stops.md)

---

[← Back to README](README.md)
