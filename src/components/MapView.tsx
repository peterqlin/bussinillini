import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { Vehicle, Route } from '../types/mtd'
import type { RouteShape } from '../hooks/useMtdShapes'

interface MapViewProps {
  vehicles: Vehicle[]
  routes: Route[]
  shapes: RouteShape[]
  visibleRouteIds: Set<string>
}

// UIUC campus center
const UIUC_CENTER: [number, number] = [-88.2284, 40.1105]
const DEFAULT_ZOOM = 13

function getRouteColor(routeId: string, routes: Route[]): string {
  const route = routes.find((r) => r.route_id === routeId)
  return route ? `#${route.route_color}` : '#888888'
}

export default function MapView({ vehicles, routes, shapes, visibleRouteIds }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const routeLayersRef = useRef<string[]>([])

  // Initialize map once
  useEffect(() => {
    const token = import.meta.env.VITE_MAPBOX_TOKEN
    if (!token) {
      throw new Error(
        'Missing VITE_MAPBOX_TOKEN. Create a .env.local file with VITE_MAPBOX_TOKEN=your_token_here'
      )
    }

    mapboxgl.accessToken = token as string

    const map = new mapboxgl.Map({
      container: containerRef.current!,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: UIUC_CENTER,
      zoom: DEFAULT_ZOOM,
    })

    map.addControl(new mapboxgl.NavigationControl(), 'top-right')
    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  // Update markers when vehicles or visibility changes
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    // Remove existing markers
    markersRef.current.forEach((m) => m.remove())
    markersRef.current = []

    const visibleVehicles = vehicles.filter((v) => visibleRouteIds.has(v.trip.route_id))

    visibleVehicles.forEach((vehicle) => {
      const color = getRouteColor(vehicle.trip.route_id, routes)

      // Custom marker element
      const el = document.createElement('div')
      el.style.cssText = `
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: ${color};
        border: 2px solid white;
        box-shadow: 0 0 4px rgba(0,0,0,0.6);
        cursor: pointer;
      `

      const popup = new mapboxgl.Popup({ offset: 12, closeButton: false }).setHTML(`
        <div style="font-family: system-ui; font-size: 13px; line-height: 1.5;">
          <strong style="display: block; margin-bottom: 2px;">${vehicle.trip.trip_headsign}</strong>
          <span style="color: #888;">Bus #${vehicle.vehicle_id}</span>
        </div>
      `)

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([vehicle.location.lon, vehicle.location.lat])
        .setPopup(popup)
        .addTo(map)

      markersRef.current.push(marker)
    })
  }, [vehicles, routes, visibleRouteIds])

  // Draw route polylines — diffs layers so existing routes are never removed and
  // re-added on vehicle polls, which would cause a visible flash.
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const syncLayers = () => {
      const incomingIds = new Set(shapes.map((s) => `route-${s.shapeId}`))

      // Remove layers that are no longer in the shape set
      routeLayersRef.current = routeLayersRef.current.filter((id) => {
        if (!incomingIds.has(id)) {
          if (map.getLayer(id)) map.removeLayer(id)
          if (map.getSource(id)) map.removeSource(id)
          return false
        }
        return true
      })

      if (shapes.length === 0) return

      // Insert lines below the first symbol layer so labels stay on top
      const firstSymbol = map.getStyle().layers?.find((l) => l.type === 'symbol')?.id

      for (const { shapeId, routeId, coords } of shapes) {
        const color = getRouteColor(routeId, routes)
        const layerId = `route-${shapeId}`

        // Skip if already on the map — visibility effect keeps it in sync
        if (map.getSource(layerId)) continue

        map.addSource(layerId, {
          type: 'geojson',
          data: { type: 'Feature', geometry: { type: 'LineString', coordinates: coords }, properties: {} },
        })
        map.addLayer(
          {
            id: layerId,
            type: 'line',
            source: layerId,
            layout: {
              visibility: visibleRouteIds.has(routeId) ? 'visible' : 'none',
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: { 'line-color': color, 'line-width': 3, 'line-opacity': 0.75 },
          },
          firstSymbol,
        )
        routeLayersRef.current.push(layerId)
      }
    }

    if (map.isStyleLoaded()) {
      syncLayers()
    } else {
      map.once('load', syncLayers)
      return () => { map.off('load', syncLayers) }
    }
  }, [shapes, routes]) // eslint-disable-line react-hooks/exhaustive-deps

  // Toggle route line visibility when visibleRouteIds changes
  useEffect(() => {
    const map = mapRef.current
    if (!map || !map.isStyleLoaded()) return

    for (const { shapeId, routeId } of shapes) {
      const layerId = `route-${shapeId}`
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, 'visibility', visibleRouteIds.has(routeId) ? 'visible' : 'none')
      }
    }
  }, [visibleRouteIds, shapes])

  return <div ref={containerRef} className="flex-1 h-full" />
}
