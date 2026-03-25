import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { Vehicle, Route } from '../types/mtd'

interface MapViewProps {
  vehicles: Vehicle[]
  routes: Route[]
  visibleRouteIds: Set<string>
}

// UIUC campus center
const UIUC_CENTER: [number, number] = [-88.2284, 40.1105]
const DEFAULT_ZOOM = 13

function getRouteColor(routeId: string, routes: Route[]): string {
  const route = routes.find((r) => r.route_id === routeId)
  return route ? `#${route.route_color}` : '#888888'
}

export default function MapView({ vehicles, routes, visibleRouteIds }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

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

  return <div ref={containerRef} className="flex-1 h-full" />
}
