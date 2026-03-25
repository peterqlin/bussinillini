# Trip Planner

[← Back to README](README.md)

**Methods in this file:**

- [GetPlannedTripsByLatLon](#getplannedtripsbylatlon)
- [GetPlannedTripsByStops](#getplannedtripsbystops)

---

## GetPlannedTripsByLatLon

Get's a list of possible itineraries based on an origin and destination latitude and longitude.

**Endpoint**

```
https://developer.mtd.org/api/v2.2/{format}/getplannedtripsbylatlon
```

**Parameters**

| Parameter         | Required | Description                                                                                                                       |
| ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `key`             | Yes      | your API key                                                                                                                      |
| `origin_lat`      | Yes      | latitude of the origin (-90 : 90)                                                                                                 |
| `origin_lon`      | Yes      | longitude of the origin (-180 : 180)                                                                                              |
| `destination_lat` | Yes      | latitude of the destination (-90 : 90)                                                                                            |
| `destination_lon` | Yes      | longitude of the destination (-180 : 180)                                                                                         |
| `date`            | No       | date (YYYY-MM-DD)                                                                                                                 |
| `time`            | No       | time (HH:MM)                                                                                                                      |
| `max_walk`        | No       | Maximum allowed walking distance in miles (.1 : 1). default is .5 miles                                                           |
| `minimize`        | No       | minimize walking, transfers, or time. possible values are "walking", "transfers", and "time". default is "time"                   |
| `arrive_depart`   | No       | whether to plan the trip to arrive or depart at the specified time. possible values are "arrive" or "depart". default is "depart" |

**Response Fields**

| Field         | Description                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `start_time`  | The time the itinerary will begin                                                              |
| `end_time`    | The time the the itinerary will end                                                            |
| `travel_time` | The total travel time in minutes                                                               |
| `itinerary`   | a single itinerary to complete the requested trip                                              |
| `leg`         | a single leg in an itinerary. this can be either riding or walking.                            |
| `walk`        | a leg of the journey that requires walking.                                                    |
| `service`     | a leg of the journey that requires riding. (see remarks for multiple services in a single leg) |
| `begin`       | the starting point for a leg                                                                   |
| `end`         | the ending point for a leg                                                                     |

**Remarks**

> The results provide up to three itineraries for completing the requested trip. Each itinerary contains legs which can either contain walk or service objects. Walk objects indicate a leg of the trip that will require walking. A service object indicates a leg of the trip that will require bus service.

> There can be multiple service objects in a leg. This indicates an interline (i.e. A bus starts out as one route and switches to another) and means the passenger should stay on the bus! In this case both lines will show up as services on the same leg.

> Although this method will accept any valid latitude/longitude coordinates it will only return meaningful results for coordinates near our service area.

> If itineraries list is empty (e.g. there's no service at the time specified), you can use msg to get more details.

**Examples**

*JSON Request*
```
https://developer.mtd.org/api/v2.2/json/getplannedtripsbylatlon?key=YOUR_API_KEY
```

*JSON Response*
```json
{
    "time":"2012-01-26T13:28:57-06:00",
    "new_changeset": true,
    "status":{
        "code":200,
        "msg":"ok"
    },
   "rqst":{
       "method":"GetPlannedTripsByLatLon",
       "params":{
           "destination_lat":40.11626,
           "destination_lon":-88.25783,
           "origin_lat":40.12233,
           "origin_lon":-88.29619
       }
   },
   "itineraries":[
      {
          "start_time":"2012-01-26T13:36:00-06:00",
          "end_time":"2012-01-26T14:11:00-06:00",
          "travel_time":35,
          "legs":[
             {
                 "type":"Walk",
                 "walk":{
                     "begin":{
                         "lat":40.12233,
                         "lon":-88.29619,
                         "name":"40.12233, -88.29619",
                         "time":"2012-01-26T13:36:00-06:00"
                     },
                     "direction":"East",
                     "distance":0.05,
                     "end":{
                         "lat":40.122199,
                         "lon":-88.295524,
                         "name":"Duncan & Clayton (SE Corner)",
                         "stop_id":"DNCNCLTN:2",
                         "time":"2012-01-26T13:37:00-06:00"
                     }
                 }
             },
             {
                 "services":[
                    {
                        "begin":{
                            "lat":40.122199,
                            "lon":-88.295524,
                            "name":"Duncan & Clayton (SE Corner)",
                            "stop_id":"DNCNCLTN:2",
                            "time":"2012-01-26T13:41:00-06:00"
                        },
                        "end":{
                            "lat":40.131976,
                            "lon":-88.288742,
                            "name":"Parkland College",
                            "stop_id":"PKLN:1",
                            "time":"2012-01-26T13:45:00-06:00"
                        },
                        "route":{
                            "route_color":"725700",
                            "route_id":"9A BROWN",
                            "route_long_name":"Brown",
                            "route_short_name":"9A",
                            "route_text_color":"ffffff"
                        },
                        "trip":{
                            "trip_id":"9BA311__BB3",
                            "trip_headsign":"COUNRY FAIR / PARKLAND",
                            "route_id":"9A BROWN",
                            "block_id":"BB3",
                            "direction":"A",
                            "service_id":"BB3",
                            "shape_id":"9A"
                        }
                    },
                    {
                        "begin":{
                            "lat":40.131976,
                            "lon":-88.288742,
                            "name":"Parkland College",
                            "stop_id":"PKLN:1",
                            "time":"2012-01-26T13:58:00-06:00"
                        },
                        "end":{
                            "lat":40.116209,
                            "lon":-88.257355,
                            "name":"University & Prospect (SE Far Side)",
                            "stop_id":"UNIPSPCT:6",
                            "time":"2012-01-26T14:11:00-06:00"
                        },
                        "route":{
                            "route_color":"666666",
                            "route_id":"GREY",
                            "route_long_name":"Grey",
                            "route_short_name":"7",
                            "route_text_color":"ffffff"
                        },
                        "trip":{
                            "trip_id":"3GR763__BB3",
                            "trip_headsign":"EAST - EDGEWOOD",
                            "route_id":"GREY",
                            "block_id":"BB3",
                            "direction":"East",
                            "service_id":"BB3",
                            "shape_id":"7E"
                        }
                    }
                 ],
                 "type":"Service"
             }
          ]
      }
   ]
}
```

*XML Request*
```
https://developer.mtd.org/api/v2.2/xml/getplannedtripsbylatlon?key=YOUR_API_KEY
```

*XML Response*
```xml
<?xml version="1.0" encoding="utf-8"?>
<rsp xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" new_changeset="true" time="2012-01-26T13:26:41-06:00">
    <status code="200" msg="ok" />
    <rqst method="GetPlannedTripsByLatLon">
        <params destination_lat="40.11626" destination_lon="-88.25783" origin_lat="40.12233" origin_lon="-88.29619" />
    </rqst>
    <itineraries>
        <itinerary start_time="2012-01-26T13:36:00-06:00" end_time="2012-01-26T14:11:00-06:00" travel_time="35">
            <legs>
                <leg type="Walk">
                    <walk distance="0.05" direction="East">
                    <begin name="40.12233, -88.29619" time="2012-01-26T13:36:00-06:00" lat="40.12233" lon="-88.29619" />
                    <end name="Duncan & Clayton (SE Corner)" time="2012-01-26T13:37:00-06:00" lat="40.122199" lon="-88.295524" stop_id="DNCNCLTN:2" />
                </walk>
                </leg>
                <leg type="Service">
                    <services>
                        <service>
                            <begin name="Duncan & Clayton (SE Corner)" time="2012-01-26T13:41:00-06:00" lat="40.122199" lon="-88.295524" stop_id="DNCNCLTN:2" />
                            <end name="Parkland College" time="2012-01-26T13:45:00-06:00" lat="40.131976" lon="-88.288742" stop_id="PKLN:1" />
                            <route route_color="725700" route_id="9A BROWN" route_long_name="Brown" route_short_name="9A" route_text_color="ffffff" />
                            <trip trip_id="9BA311__BB3" trip_headsign="COUNRY FAIR / PARKLAND" route_id="9A BROWN" service_id="BB3" shape_id="9A" direction="A" block_id="BB3" />
                        </service>
                        <service>
                            <begin name="Parkland College" time="2012-01-26T13:58:00-06:00" lat="40.131976" lon="-88.288742" stop_id="PKLN:1" />
                            <end name="University & Prospect (SE Far Side)" time="2012-01-26T14:11:00-06:00" lat="40.116209" lon="-88.257355" stop_id="UNIPSPCT:6" />
                            <route route_color="666666" route_id="GREY" route_long_name="Grey" route_short_name="7" route_text_color="ffffff" />
                            <trip trip_id="3GR763__BB3" trip_headsign="EAST - EDGEWOOD" route_id="GREY" service_id="BB3" shape_id="7E" direction="East" block_id="BB3" />
                        </service>
                    </services>
                </leg>
            </legs>
        </itinerary>
    </itineraries>
</rsp>
```

---

## GetPlannedTripsByStops

Get's a list of possible itineraries based on an origin and destination stop_id.

**Endpoint**

```
https://developer.mtd.org/api/v2.2/{format}/getplannedtripsbystops
```

**Parameters**

| Parameter             | Required | Description                                                                                                                       |
| --------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `key`                 | Yes      | your API key                                                                                                                      |
| `origin_stop_id`      | Yes      | stop_id of the origin                                                                                                             |
| `destination_stop_id` | Yes      | stop_id of the destination                                                                                                        |
| `date`                | No       | date (YYYY-MM-DD)                                                                                                                 |
| `time`                | No       | time (HH:MM)                                                                                                                      |
| `max_walk`            | No       | Maximum allowed walking distance in miles (.1 : 1). default is .5 miles                                                           |
| `minimize`            | No       | minimize walking, transfers, or time. possible values are "walking", "transfers", and "time". default is "time"                   |
| `arrive_depart`       | No       | whether to plan the trip to arrive or depart at the specified time. possible values are "arrive" or "depart". default is "depart" |

**Response Fields**

| Field         | Description                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `start_time`  | The time the itinerary will begin                                                              |
| `end_time`    | The time the the itinerary will end                                                            |
| `travel_time` | The total travel time in minutes                                                               |
| `itinerary`   | a single itinerary to complete the requested trip                                              |
| `leg`         | a single leg in an itinerary. this can be either riding or walking.                            |
| `walk`        | a leg of the journey that requires walking.                                                    |
| `service`     | a leg of the journey that requires riding. (see remarks for multiple services in a single leg) |
| `begin`       | the starting point for a leg                                                                   |
| `end`         | the ending point for a leg                                                                     |

**Remarks**

> The results provide up to three itineraries for completing the requested trip. Each itinerary contains legs which can either contain walk or service objects. Walk objects indicate a leg of the trip that will require walking. A service object indicates a leg of the trip that will require bus service.

> There can be multiple service objects in a leg. This indicates an interline (i.e. A bus starts out as one route and switches to another) and means the passenger should stay on the bus! In this case both lines will show up as services on the same leg.

> If itineraries list is empty (e.g. there's no service at the time specified), you can use msg to get more details.

**Examples**

*JSON Request*
```
https://developer.mtd.org/api/v2.2/json/getplannedtripsbystops?key=YOUR_API_KEY
```

*JSON Response*
```json
{
    "time":"2012-01-26T13:22:05-06:00",
    "new_changeset": true,
    "status":{
        "code":200,
        "msg":"ok"
    },
   "rqst":{
       "method":"GetPlannedTripsByStops",
       "params":{
           "destination_stop_id":"unipspct",
           "origin_stop_id":"dncncltn"
       }
   },
   "itineraries":[
      {
          "start_time":"2012-01-26T13:41:00-06:00",
          "end_time":"2012-01-26T14:11:00-06:00",
          "travel_time":30,
          "legs":[
             {
                 "services":[
                    {
                        "begin":{
                            "lat":40.122199,
                            "lon":-88.295524,
                            "name":"Duncan & Clayton (SE Corner)",
                            "stop_id":"DNCNCLTN:2",
                            "time":"2012-01-26T13:41:00-06:00"
                        },
                        "end":{
                            "lat":40.131976,
                            "lon":-88.288742,
                            "name":"Parkland College",
                            "stop_id":"PKLN:1",
                            "time":"2012-01-26T13:45:00-06:00"
                        },
                        "route":{
                            "route_color":"725700",
                            "route_id":"9A BROWN",
                            "route_long_name":"Brown",
                            "route_short_name":"9A",
                            "route_text_color":"ffffff"
                        },
                        "trip":{
                            "trip_id":"9BA311__BB3",
                            "trip_headsign":"COUNRY FAIR / PARKLAND",
                            "route_id":"9A BROWN",
                            "block_id":"BB3",
                            "direction":"A",
                            "service_id":"BB3",
                            "shape_id":"9A"
                        }
                    },
                    {
                        "begin":{
                            "lat":40.131976,
                            "lon":-88.288742,
                            "name":"Parkland College",
                            "stop_id":"PKLN:1",
                            "time":"2012-01-26T13:58:00-06:00"
                        },
                        "end":{
                            "lat":40.116209,
                            "lon":-88.257355,
                            "name":"University & Prospect (SE Far Side)",
                            "stop_id":"UNIPSPCT:6",
                            "time":"2012-01-26T14:11:00-06:00"
                        },
                        "route":{
                            "route_color":"666666",
                            "route_id":"GREY",
                            "route_long_name":"Grey",
                            "route_short_name":"7",
                            "route_text_color":"ffffff"
                        },
                        "trip":{
                            "trip_id":"3GR763__BB3",
                            "trip_headsign":"EAST - EDGEWOOD",
                            "route_id":"GREY",
                            "block_id":"BB3",
                            "direction":"East",
                            "service_id":"BB3",
                            "shape_id":"7E"
                        }
                    }
                 ],
                 "type":"Service"
             }
          ]
      }
   ]
}
```

*XML Request*
```
https://developer.mtd.org/api/v2.2/xml/getplannedtripsbystops?key=YOUR_API_KEY
```

*XML Response*
```xml
<?xml version="1.0" encoding="utf-8"?>
<rsp xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" time="2012-01-26T13:21:39-06:00">
	<status code="200" msg="ok" />
	<rqst method="GetPlannedTripsByStops">
		<params destination_stop_id="unipspct" origin_stop_id="dncncltn" />
	</rqst>
	<itineraries>
		<itinerary start_time="2012-01-26T13:41:00-06:00" end_time="2012-01-26T14:11:00-06:00" travel_time="30">
			<legs>
				<leg type="Service">
					<services>
						<service>
							<begin name="Duncan & Clayton (SE Corner)" time="2012-01-26T13:41:00-06:00" lat="40.122199" lon="-88.295524" stop_id="DNCNCLTN:2" />
							<end name="Parkland College" time="2012-01-26T13:45:00-06:00" lat="40.131976" lon="-88.288742" stop_id="PKLN:1" />
							<route route_color="725700" route_id="9A BROWN" route_long_name="Brown" route_short_name="9A" route_text_color="ffffff" />
							<trip trip_id="9BA311__BB3" trip_headsign="COUNRY FAIR / PARKLAND" route_id="9A BROWN" service_id="BB3" shape_id="9A" direction="A" block_id="BB3" />
						</service>
						<service>
							<begin name="Parkland College" time="2012-01-26T13:58:00-06:00" lat="40.131976" lon="-88.288742" stop_id="PKLN:1" />
							<end name="University & Prospect (SE Far Side)" time="2012-01-26T14:11:00-06:00" lat="40.116209" lon="-88.257355" stop_id="UNIPSPCT:6" />
							<route route_color="666666" route_id="GREY" route_long_name="Grey" route_short_name="7" route_text_color="ffffff" />
							<trip trip_id="3GR763__BB3" trip_headsign="EAST - EDGEWOOD" route_id="GREY" service_id="BB3" shape_id="7E" direction="East" block_id="BB3" />
						</service>
					</services>
				</leg>
			</legs>
		</itinerary>
	</itineraries>
</rsp>
```

---

---

[← Back to README](README.md)
