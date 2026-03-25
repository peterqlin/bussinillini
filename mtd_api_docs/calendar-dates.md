# Calendar Dates

[← Back to README](README.md)

**Methods in this file:**

- [GetCalendarDatesByDate](#getcalendardatesbydate)
- [GetCalendarDatesByService](#getcalendardatesbyservice)

---

## GetCalendarDatesByDate

Get a list of calendar dates based on a specific date.

**Endpoint**

```
https://developer.mtd.org/api/v2.2/{format}/getcalendardatesbydate
```

**Parameters**

| Parameter      | Required | Description                                      |
| -------------- | -------- | ------------------------------------------------ |
| `key`          | Yes      | your API key                                     |
| `date`         | Yes      | date (YYYY-MM-DD)                                |
| `changeset_id` | No       | see interpretting responses for more information |

**Response Fields**

| Field        | Description                                                        |
| ------------ | ------------------------------------------------------------------ |
| `date`       | a date this service operates                                       |
| `service_id` | id for this service type — see [Calendar Dates](calendar-dates.md) |

**Remarks**

> The results provide all the service_ids that run on this particular date. Each trip references a calendar_date through the service_id to indicate which dates the trip operates.

**Examples**

*JSON Request*
```
https://developer.mtd.org/api/v2.2/json/getcalendardatesbydate?key=YOUR_API_KEY
```

*JSON Response*
```json
{
    "changeset_id":"DCF8E8679280BEAB785ABE9C68D9F612",
    "new_changeset": true,
    "time":"2012-01-24T15:52:56-06:00",
    "status":{
        "code":200,
        "msg":"ok"
    },
   "rqst":{
       "method":"GetCalendarDatesByDate",
       "params":{
           "date":"20120124"
       }
   },
   "calendar_dates":[
      {
          "date":"2012-01-24",
          "service_id":"10W UHS UMS"
      },
      {
          "date":"2012-01-24",
          "service_id":"1N SHOW"
      },
      {
          "date":"2012-01-24",
          "service_id":"1S SHOW"
      }
   ]
}
```

*XML Request*
```
https://developer.mtd.org/api/v2.2/xml/getcalendardatesbydate?key=YOUR_API_KEY
```

*XML Response*
```xml
<?xml version="1.0" encoding="utf-8"?>
<rsp xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" changeset_id="DCF8E8679280BEAB785ABE9C68D9F612" new_changeset="true" time="2012-01-24T15:50:15-06:00">
    <status code="200" msg="ok" />
    <rqst method="GetCalendarDatesByDate">
        <params date="20120124" />
    </rqst>
    <calendar_dates>
        <calendar_date date="2012-01-24" service_id="10W UHS UMS" />
        <calendar_date date="2012-01-24" service_id="1N SHOW" />
        <calendar_date date="2012-01-24" service_id="1S SHOW" />
    </calendar_dates>
</rsp>
```

---

## GetCalendarDatesByService

Get a list of calendar dates based on a specific service_id.

**Endpoint**

```
https://developer.mtd.org/api/v2.2/{format}/getcalendardatesbyservice
```

**Parameters**

| Parameter      | Required | Description                                                 |
| -------------- | -------- | ----------------------------------------------------------- |
| `key`          | Yes      | your API key                                                |
| `service_id`   | Yes      | id of the service — see [Calendar Dates](calendar-dates.md) |
| `changeset_id` | No       | see interpretting responses for more information            |

**Response Fields**

| Field        | Description                                                        |
| ------------ | ------------------------------------------------------------------ |
| `date`       | a date this service operates                                       |
| `service_id` | id for this service type — see [Calendar Dates](calendar-dates.md) |

**Remarks**

> The results provide all the dates that this specific service runs on. Each trip references a calendar_date through the service_id to indicate which dates the trip operates.

**Examples**

*JSON Request*
```
https://developer.mtd.org/api/v2.2/json/getcalendardatesbyservice?key=YOUR_API_KEY
```

*JSON Response*
```json
{
    "changeset_id":"596BA1C151BED343114E37B2BB636D71",
    "new_changeset": true,
    "time":"2012-01-24T15:47:55-06:00",
    "status":{
        "code":200,
        "msg":"ok"
    },
   "rqst":{
       "method":"GetCalendarDatesByService",
       "params":{
           "service_id":"1N SHOW"
       }
   },
   "calendar_dates":[
      {
          "date":"2012-01-02",
          "service_id":"1N SHOW"
      },
      {
          "date":"2012-01-03",
          "service_id":"1N SHOW"
      },
      {
          "date":"2012-01-04",
          "service_id":"1N SHOW"
      }
   ]
}
```

*XML Request*
```
https://developer.mtd.org/api/v2.2/xml/getcalendardatesbyservice?key=YOUR_API_KEY
```

*XML Response*
```xml
<?xml version="1.0" encoding="utf-8"?>
<rsp xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" changeset_id="596BA1C151BED343114E37B2BB636D71" new_changeset="true" time="2012-01-24T15:49:04-06:00">
    <status code="200" msg="ok" />
    <rqst method="GetCalendarDatesByService">
        <params service_id="1N SHOW" />
    </rqst>
    <calendar_dates>
        <calendar_date date="2012-01-02" service_id="1N SHOW" />
        <calendar_date date="2012-01-03" service_id="1N SHOW" />
        <calendar_date date="2012-01-04" service_id="1N SHOW" />
    </calendar_dates>
</rsp>
```

---

---

[← Back to README](README.md)
