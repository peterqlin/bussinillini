# Metadata

[← Back to README](README.md)

---

## GetLastFeedUpdate

Gets the last time the static API data was updated from the GTFS feed.

**Endpoint**

```
https://developer.mtd.org/api/v2.2/{format}/getlastfeedupdate
```

**Parameters**

| Parameter | Required | Description  |
| --------- | -------- | ------------ |
| `key`     | Yes      | your API key |

**Response Fields**

| Field          | Description                        |
| -------------- | ---------------------------------- |
| `last_updated` | The date the feed was last updated |

**Remarks**

> This method is designed to help with caching either in conjunction with or in place of the changeset_id.

**Examples**

*JSON Request*
```
https://developer.mtd.org/api/v2.2/json/getlastfeedupdate?key=YOUR_API_KEY
```

*JSON Response*
```json
{
    "time":"2012-01-24T15:57:09-06:00",
    "new_changeset": true,
    "status":{
        "code":200,
        "msg":"ok"
    },
   "rqst":{
       "method":"GetLastFeedUpdate",
       "params":{
       }
   },
   "last_updated":"2012-01-19T22:18:37"
}
```

*XML Request*
```
https://developer.mtd.org/api/v2.2/xml/getlastfeedupdate?key=YOUR_API_KEY
```

*XML Response*
```xml
<?xml version="1.0" encoding="utf-8"?>
<rsp xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" new_changeset="true" time="2012-01-24T15:56:38-06:00">
    <status code="200" msg="ok" />
    <rqst method="GetLastFeedUpdate">
        <params />
    </rqst>
    <last_updated>2012-01-19T22:18:37</last_updated>
</rsp>
```

---

---

[← Back to README](README.md)
