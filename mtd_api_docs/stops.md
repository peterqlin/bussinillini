# Stops

[← Back to README](README.md)

**Methods in this file:**

- [GetStop](#getstop)
- [GetStops](#getstops)
- [GetStopsByLatLon](#getstopsbylatlon)

---

## GetStop

Get information for a given stop.

**Endpoint**

```
https://developer.mtd.org/api/v2.2/{format}/getstop
```

**Parameters**

| Parameter      | Required | Description                                                   |
| -------------- | -------- | ------------------------------------------------------------- |
| `key`          | Yes      | your API key                                                  |
| `stop_id`      | Yes      | semi-colon separated list of stop ids — see [Stops](stops.md) |
| `changeset_id` | No       | see interpretting responses for more information              |

**Response Fields**

| Field        | Description                            |
| ------------ | -------------------------------------- |
| `code`       | text message code                      |
| `stop_point` | stop points that compose a parent stop |
| `stop_id`    | id of stop — see [Stops](stops.md)     |
| `stop_lat`   | latitude of stop                       |
| `stop_lon`   | longitude of stop                      |
| `stop_name`  | name of stop                           |

**Remarks**

> Aside from using stop_ids, you can also drop the colon and number of a stop to get all the stops for that location (ex. IT:1 -> IT gives all the stops at IT).

**Examples**

*JSON Request*
```
https://developer.mtd.org/api/v2.2/json/getstop?key=YOUR_API_KEY
```

*JSON Response*
```json
{
    "changeset_id":"95E2F6B8675D179423EDD82079FA4E8D",
    "new_changeset": true,
    "time":"2012-01-24T16:06:41-06:00",
    "status":{
        "code":200,
        "msg":"ok"
    },
   "rqst":{
       "method":"GetStop",
       "params":{
           "stop_id":"it"
       }
   },
   "stops":[
      {
          "stop_id":"IT",
          "stop_name":"Illinois Terminal",
          "code":"MTD3121",
          "stop_points":[
             {
                 "code":"MTD7534",
                 "stop_id":"IT:1",
                 "stop_lat":40.115935,
                 "stop_lon":-88.240947,
                 "stop_name":"Illinois Terminal (Platform A)"
             },
             {
                 "code":"MTD6462",
                 "stop_id":"IT:2",
                 "stop_lat":40.115664,
                 "stop_lon":-88.241053,
                 "stop_name":"Illinois Terminal (Platform B)"
             },
             {
                 "code":"MTD4217",
                 "stop_id":"IT:5",
                 "stop_lat":40.115363,
                 "stop_lon":-88.241442,
                 "stop_name":"Illinois Terminal (Platform C)"
             }
          ]
      }
   ]
}
```

*XML Request*
```
https://developer.mtd.org/api/v2.2/xml/getstop?key=YOUR_API_KEY
```

*XML Response*
```xml
<?xml version="1.0" encoding="utf-8"?>
<rsp xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" changeset_id="95E2F6B8675D179423EDD82079FA4E8D" new_changeset="true" time="2012-01-24T16:06:06-06:00">
    <status code="200" msg="ok" />
    <rqst method="GetStop">
        <params stop_id="it" />
    </rqst>
    <stops>
        <stop stop_id="IT" code="MTD3121" stop_name="Illinois Terminal" percent_match="0">
            <stop_points>
                <stop_point stop_id="IT:1" code="MTD7534" stop_lat="40.115935" stop_lon="-88.240947" stop_name="Illinois Terminal (Platform A)" />
                <stop_point stop_id="IT:2" code="MTD6462" stop_lat="40.115664" stop_lon="-88.241053" stop_name="Illinois Terminal (Platform B)" />
                <stop_point stop_id="IT:5" code="MTD4217" stop_lat="40.115363" stop_lon="-88.241442" stop_name="Illinois Terminal (Platform C)" />
            </stop_points>
        </stop>
    </stops>
</rsp>
```

---

## GetStops

Get a complete list of stops.

**Endpoint**

```
https://developer.mtd.org/api/v2.2/{format}/getstops
```

**Parameters**

| Parameter      | Required | Description                                      |
| -------------- | -------- | ------------------------------------------------ |
| `key`          | Yes      | your API key                                     |
| `changeset_id` | No       | see interpretting responses for more information |

**Response Fields**

| Field        | Description                            |
| ------------ | -------------------------------------- |
| `code`       | text message code                      |
| `stop_point` | stop points that compose a parent stop |
| `stop_id`    | id of stop — see [Stops](stops.md)     |
| `stop_lat`   | latitude of stop                       |
| `stop_lon`   | longitude of stop                      |
| `stop_name`  | name of stop                           |

**Remarks**

> This is a complete list of all our 2500+ stops. You shouldn't request this frequently. Check the main page for information about using the RSS feed to stay up to date.

**Examples**

*JSON Request*
```
https://developer.mtd.org/api/v2.2/json/getstops?key=YOUR_API_KEY
```

*JSON Response*
```json
{
    "changeset_id":"8CB41DFAA0FBC584CDA5368BB0F8999A",
    "new_changeset": true,
    "time":"2012-01-24T16:07:11-06:00",
    "status":{
        "code":200,
        "msg":"ok"
    },
   "rqst":{
       "method":"GetStops",
       "params":{
       }
   },
   "stops":[
      {
          "stop_id":"150DALE",
          "stop_name":"U.S. 150 and Dale",
          "code":"MTD5437",
          "stop_points":[
             {
                 "code":"MTD5437",
                 "stop_id":"150DALE:1",
                 "stop_lat":40.114512,
                 "stop_lon":-88.180673,
                 "stop_name":"U.S. 150 & Dale (NE Corner)"
             },
             {
                 "code":"MTD5437",
                 "stop_id":"150DALE:3",
                 "stop_lat":40.114503,
                 "stop_lon":-88.180848,
                 "stop_name":"U.S. 150 & Dale (SW Corner)"
             }
          ]
      },
      {
          "stop_id":"150DOD",
          "stop_name":"U.S. 150 and Dodson Dr.",
          "code":"MTD2634",
          "stop_points":[
             {
                 "code":"MTD2634",
                 "stop_id":"150DOD:5",
                 "stop_lat":40.114158,
                 "stop_lon":-88.173105,
                 "stop_name":"U.S. 150 & Dodson (NE Far Side)"
             }
          ]
      },
      {
          "stop_id":"150UNI",
          "stop_name":"U.S. 150 and University",
          "code":"MTD6741",
          "stop_points":[
             {
                 "code":"MTD6741",
                 "stop_id":"150UNI:4",
                 "stop_lat":40.116542,
                 "stop_lon":-88.18384,
                 "stop_name":"U.S. 150 & University (NW Corner)"
             },
             {
                 "code":"MTD6741",
                 "stop_id":"150UNI:8",
                 "stop_lat":40.116033,
                 "stop_lon":-88.184178,
                 "stop_name":"U.S. 150 & University (NW Far Side)"
             }
          ]
      }
   ]
}
```

*XML Request*
```
https://developer.mtd.org/api/v2.2/xml/getstops?key=YOUR_API_KEY
```

*XML Response*
```xml
<?xml version="1.0" encoding="utf-8"?>
<rsp xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" changeset_id="8CB41DFAA0FBC584CDA5368BB0F8999A" new_changeset="true" time="2012-01-24T16:10:20-06:00">
    <status code="200" msg="ok" />
    <rqst method="GetStops">
        <params />
    </rqst>
    <stops>
        <stop stop_id="150DALE" code="MTD5437" stop_name="U.S. 150 and Dale" percent_match="0">
            <stop_points>
                <stop_point stop_id="150DALE:1" code="MTD5437" stop_lat="40.114512" stop_lon="-88.180673" stop_name="U.S. 150 & Dale (NE Corner)" />
                <stop_point stop_id="150DALE:3" code="MTD5437" stop_lat="40.114503" stop_lon="-88.180848" stop_name="U.S. 150 & Dale (SW Corner)" />
            </stop_points>
        </stop>
        <stop stop_id="150DOD" code="MTD2634" stop_name="U.S. 150 and Dodson Dr." percent_match="0">
            <stop_points>
                <stop_point stop_id="150DOD:5" code="MTD2634" stop_lat="40.114158" stop_lon="-88.173105" stop_name="U.S. 150 & Dodson (NE Far Side)" />
            </stop_points>
        </stop>
        <stop stop_id="150UNI" code="MTD6741" stop_name="U.S. 150 and University" percent_match="0">
            <stop_points>
                <stop_point stop_id="150UNI:4" code="MTD6741" stop_lat="40.116542" stop_lon="-88.183840" stop_name="U.S. 150 & University (NW Corner)" />
                <stop_point stop_id="150UNI:8" code="MTD6741" stop_lat="40.116033" stop_lon="-88.184178" stop_name="U.S. 150 & University (NW Far Side)" />
            </stop_points>
        </stop>
    </stops>
</rsp>
```

---

## GetStopsByLatLon

Get a list of stops nearest a given latitude/longitude.

**Endpoint**

```
https://developer.mtd.org/api/v2.2/{format}/getstopsbylatlon
```

**Parameters**

| Parameter      | Required | Description                                      |
| -------------- | -------- | ------------------------------------------------ |
| `key`          | Yes      | your API key                                     |
| `lat`          | Yes      | latitude                                         |
| `lon`          | Yes      | longitude                                        |
| `count`        | No       | number of stops to return                        |
| `changeset_id` | No       | see interpretting responses for more information |

**Response Fields**

| Field        | Description                            |
| ------------ | -------------------------------------- |
| `code`       | text message code                      |
| `distance`   | distance from the stop in feet         |
| `stop_point` | stop points that compose a parent stop |
| `stop_id`    | id of stop — see [Stops](stops.md)     |
| `stop_lat`   | latitude of stop                       |
| `stop_lon`   | longitude of stop                      |
| `stop_name`  | name of stop                           |

**Remarks**

> This method defaults to the 20 nearest stops, but you can expand it to as many as you need.

**Examples**

*JSON Request*
```
https://developer.mtd.org/api/v2.2/json/getstopsbylatlon?key=YOUR_API_KEY
```

*JSON Response*
```json
{
    "changeset_id":"F394D08B4DB2BB3E38BC653B2C02E561",
    "new_changeset": true,
    "time":"2012-01-24T16:15:03-06:00",
    "status":{
        "code":200,
        "msg":"ok"
    },
   "rqst":{
       "method":"GetStopsByLatLon",
       "params":{
           "count":3,
           "lat":40.1133,
           "lon":-88.226
       }
   },
   "stops":[
      {
          "stop_id":"UNIPRRE",
          "stop_name":"University and Prairie",
          "code":"MTD1350",
          "distance":371.42,
          "stop_points":[
             {
                 "code":"MTD1350",
                 "stop_id":"UNIPRRE:3",
                 "stop_lat":40.116252,
                 "stop_lon":-88.24854,
                 "stop_name":"University & Prairie (SW Corner)"
             }
          ]
      },
      {
          "stop_id":"CHCHPRRE",
          "stop_name":"Church and Prairie",
          "code":"MTD1651",
          "distance":374.21,
          "stop_points":[
             {
                 "code":"MTD1651",
                 "stop_id":"CHCHPRRE:1",
                 "stop_lat":40.11829,
                 "stop_lon":-88.248378,
                 "stop_name":"Church & Prairie (NE Corner)"
             }
          ]
      },
      {
          "stop_id":"ELMPK",
          "stop_name":"Elm and Park",
          "code":"MTD6542",
          "distance":458.35,
          "stop_points":[
             {
                 "code":"MTD6542",
                 "stop_id":"ELMPK:3",
                 "stop_lat":40.117241,
                 "stop_lon":-88.250224,
                 "stop_name":"Elm & Park (SW Corner)"
             }
          ]
      }
   ]
}
```

*XML Request*
```
https://developer.mtd.org/api/v2.2/xml/getstopsbylatlon?key=YOUR_API_KEY
```

*XML Response*
```xml
<?xml version="1.0" encoding="utf-8"?>
<rsp xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" changeset_id="F394D08B4DB2BB3E38BC653B2C02E561" new_changeset="true" time="2012-01-24T16:13:52-06:00">
    <status code="200" msg="ok" />
    <rqst method="GetStopsByLatLon">
        <params count="3" lat="40.1133" lon="-88.226" />
    </rqst>
    <stops>
        <stop stop_id="UNIPRRE" code="MTD1350" stop_name="University and Prairie" distance="371.42" percent_match="0">
            <stop_points>
                <stop_point stop_id="UNIPRRE:3" code="MTD1350" stop_lat="40.116252" stop_lon="-88.248540" stop_name="University & Prairie (SW Corner)" />
            </stop_points>
        </stop>
        <stop stop_id="CHCHPRRE" code="MTD1651" stop_name="Church and Prairie" distance="374.21" percent_match="0">
            <stop_points>
                <stop_point stop_id="CHCHPRRE:1" code="MTD1651" stop_lat="40.118290" stop_lon="-88.248378" stop_name="Church & Prairie (NE Corner)" />
            </stop_points>
        </stop>
        <stop stop_id="ELMPK" code="MTD6542" stop_name="Elm and Park" distance="458.35" percent_match="0">
            <stop_points>
                <stop_point stop_id="ELMPK:3" code="MTD6542" stop_lat="40.117241" stop_lon="-88.250224" stop_name="Elm & Park (SW Corner)" />
            </stop_points>
        </stop>
    </stops>
</rsp>
```

---

---

[← Back to README](README.md)
