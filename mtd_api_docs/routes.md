# Routes

[← Back to README](README.md)

**Methods in this file:**

- [GetRoute](#getroute)
- [GetRoutes](#getroutes)
- [GetRoutesByStop](#getroutesbystop)

---

## GetRoute

Get information about a specific route(s).

**Endpoint**

```
https://developer.mtd.org/api/v2.2/{format}/getroute
```

**Parameters**

| Parameter      | Required | Description                                                      |
| -------------- | -------- | ---------------------------------------------------------------- |
| `key`          | Yes      | your API key                                                     |
| `route_id`     | Yes      | semi-colon separated list of route Ids — see [Routes](routes.md) |
| `changeset_id` | No       | see interpretting responses for more information                 |

**Response Fields**

| Field              | Description                           |
| ------------------ | ------------------------------------- |
| `route_color`      | hex color of route                    |
| `route_id`         | id of route — see [Routes](routes.md) |
| `route_long_name`  | long name                             |
| `route_short_name` | short name                            |
| `route_text_color` | hex color of text for route           |

**Remarks**

> These results contain metadata about the routes including name, number, and hex colors.

**Examples**

*JSON Request*
```
https://developer.mtd.org/api/v2.2/json/getroute?key=YOUR_API_KEY
```

*JSON Response*
```json
{
    "changeset_id":"2DC14F6D53866248B80ACC7C5C838E69",
    "new_changeset": true,
    "time":"2012-01-24T15:57:45-06:00",
    "status":{
        "code":200,
        "msg":"ok"
    },
   "rqst":{
       "method":"GetRoute",
       "params":{
           "route_id":"green"
       }
   },
   "routes":[
      {
          "route_color":"00a638",
          "route_id":"GREEN",
          "route_long_name":"Green",
          "route_short_name":"5",
          "route_text_color":"000000"
      }
   ]
}
```

*XML Request*
```
https://developer.mtd.org/api/v2.2/xml/getroute?key=YOUR_API_KEY
```

*XML Response*
```xml
<?xml version="1.0" encoding="utf-8"?>
<rsp xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" changeset_id="2DC14F6D53866248B80ACC7C5C838E69" new_changeset="true" time="2012-01-24T15:58:07-06:00">
    <status code="200" msg="ok" />
    <rqst method="GetRoute">
        <params route_id="green" />
    </rqst>
    <routes>
        <route route_color="00a638" route_id="GREEN" route_long_name="Green" route_short_name="5" route_text_color="000000" />
    </routes>
</rsp>
```

---

## GetRoutes

Get the complete list of routes.

**Endpoint**

```
https://developer.mtd.org/api/v2.2/{format}/getroutes
```

**Parameters**

| Parameter      | Required | Description                                      |
| -------------- | -------- | ------------------------------------------------ |
| `key`          | Yes      | your API key                                     |
| `changeset_id` | No       | see interpretting responses for more information |

**Response Fields**

| Field              | Description                           |
| ------------------ | ------------------------------------- |
| `route_color`      | hex color of route                    |
| `route_id`         | id of route — see [Routes](routes.md) |
| `route_long_name`  | long name                             |
| `route_short_name` | short name                            |
| `route_text_color` | hex color of route text               |

**Remarks**

> These results contain metadata about the routes including name, number, and hex colors.

**Examples**

*JSON Request*
```
https://developer.mtd.org/api/v2.2/json/getroutes?key=YOUR_API_KEY
```

*JSON Response*
```json
{
    "changeset_id":"BE4D7C77393B10740886142286262476",
    "new_changeset": true,
    "time":"2012-01-24T15:59:12-06:00",
    "status":{
        "code":200,
        "msg":"ok"
    },
   "rqst":{
       "method":"GetRoutes",
       "params":{
       }
   },
   "routes":[
      {
          "route_color":"ffff00",
          "route_id":"1 YELLOW ALT",
          "route_long_name":"Yellow Alternate",
          "route_short_name":"1",
          "route_text_color":"000000"
      },
      {
          "route_color":"c5972e",
          "route_id":"10W GOLD ALT",
          "route_long_name":"Gold Alternate",
          "route_short_name":"10",
          "route_text_color":"000000"
      },
      {
          "route_color":"ffff00",
          "route_id":"1N YELLOW ALT",
          "route_long_name":"Yellow N Alternate",
          "route_short_name":"1",
          "route_text_color":"000000"
      }
   ]
}
```

*XML Request*
```
https://developer.mtd.org/api/v2.2/xml/getroutes?key=YOUR_API_KEY
```

*XML Response*
```xml
<?xml version="1.0" encoding="utf-8"?>
<rsp xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" changeset_id="BE4D7C77393B10740886142286262476" new_changeset="true" time="2012-01-24T15:58:32-06:00">
    <status code="200" msg="ok" />
    <rqst method="GetRoutes">
        <params />
    </rqst>
    <routes>
        <route route_color="ffff00" route_id="1 YELLOW ALT" route_long_name="Yellow Alternate" route_short_name="1" route_text_color="000000" />
        <route route_color="c5972e" route_id="10W GOLD ALT" route_long_name="Gold Alternate" route_short_name="10" route_text_color="000000" />
        <route route_color="ffff00" route_id="1N YELLOW ALT" route_long_name="Yellow N Alternate" route_short_name="1" route_text_color="000000" />
    </routes>
</rsp>
```

---

## GetRoutesByStop

Get a list of routes that service a given stop.

**Endpoint**

```
https://developer.mtd.org/api/v2.2/{format}/getroutesbystop
```

**Parameters**

| Parameter      | Required | Description                                      |
| -------------- | -------- | ------------------------------------------------ |
| `key`          | Yes      | your API key                                     |
| `stop_id`      | Yes      | id of the stop — see [Stops](stops.md)           |
| `changeset_id` | No       | see interpretting responses for more information |

**Response Fields**

| Field              | Description                           |
| ------------------ | ------------------------------------- |
| `route_color`      | hex color of route                    |
| `route_id`         | id of route — see [Routes](routes.md) |
| `route_long_name`  | long name                             |
| `route_short_name` | short name                            |
| `route_text_color` | hex color of route text               |

**Remarks**

> This method provides a stop-centric view of the routes. The results contain metadata about the routes including name, number, and hex colors.

**Examples**

*JSON Request*
```
https://developer.mtd.org/api/v2.2/json/getroutesbystop?key=YOUR_API_KEY
```

*JSON Response*
```json
{
    "changeset_id":"39BC39DA2EB03BE0777EF0BE0DB411ED",
    "new_changeset": true,
    "time":"2012-01-24T16:00:38-06:00",
    "status":{
        "code":200,
        "msg":"ok"
    },
   "rqst":{
       "method":"GetRoutesByStop",
       "params":{
           "stop_id":"it:1"
       }
   },
   "routes":[
      {
          "route_color":"00a638",
          "route_id":"GREEN",
          "route_long_name":"Green",
          "route_short_name":"5",
          "route_text_color":"000000"
      },
      {
          "route_color":"666666",
          "route_id":"GREY",
          "route_long_name":"Grey",
          "route_short_name":"7",
          "route_text_color":"ffffff"
      },
      {
          "route_color":"00a638",
          "route_id":"GREENHOPPER EVENING",
          "route_long_name":"Greenhopper Evening",
          "route_short_name":"50",
          "route_text_color":"000000"
      }
   ]
}
```

*XML Request*
```
https://developer.mtd.org/api/v2.2/xml/getroutesbystop?key=YOUR_API_KEY
```

*XML Response*
```xml
<?xml version="1.0" encoding="utf-8"?>
<rsp xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" changeset_id="39BC39DA2EB03BE0777EF0BE0DB411ED" new_changeset="true" time="2012-01-24T16:01:25-06:00">
    <status code="200" msg="ok" />
    <rqst method="GetRoutesByStop">
        <params stop_id="it:1" />
    </rqst>
    <routes>
        <route route_color="00a638" route_id="GREEN" route_long_name="Green" route_short_name="5" route_text_color="000000" />
        <route route_color="666666" route_id="GREY" route_long_name="Grey" route_short_name="7" route_text_color="ffffff" />
        <route route_color="00a638" route_id="GREENHOPPER EVENING" route_long_name="Greenhopper Evening" route_short_name="50" route_text_color="000000" />
    </routes>
</rsp>
```

---

## Related

- [Stops](stops.md)

---

[← Back to README](README.md)
