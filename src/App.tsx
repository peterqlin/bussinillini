import { useState, useEffect, useMemo, useRef } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MapView from './components/MapView'
import RouteSidebar from './components/RouteSidebar'
import { useMtdVehicles } from './hooks/useMtdVehicles'
import { useMtdRoutes } from './hooks/useMtdRoutes'
import { useMtdShapes } from './hooks/useMtdShapes'
import { useMtdStops } from './hooks/useMtdStops'

const queryClient = new QueryClient()

function BusTracker() {
  const { data: vehiclesData } = useMtdVehicles()
  const { data: routesData } = useMtdRoutes()

  const vehicles = vehiclesData?.vehicles ?? []
  const routes = routesData?.routes ?? []
  const shapes = useMtdShapes(vehicles)
  const { data: stopsData } = useMtdStops()
  const stops = useMemo(
    () => (stopsData?.stops ?? []).flatMap((s) => s.stop_points),
    [stopsData],
  )

  const activeRouteIds = useMemo(() => {
    const ids = new Set<string>()
    for (const v of vehicles) {
      if (v.trip?.route_id) ids.add(v.trip.route_id)
    }
    return ids
  }, [vehicles])

  const activeRoutes = useMemo(
    () => routes.filter((r) => activeRouteIds.has(r.route_id)),
    [routes, activeRouteIds],
  )

  const [visibleRouteIds, setVisibleRouteIds] = useState<Set<string>>(new Set())

  // Initialize once when active routes first become available
  const initializedRef = useRef(false)
  useEffect(() => {
    if (!initializedRef.current && activeRoutes.length > 0) {
      initializedRef.current = true
      setVisibleRouteIds(new Set(activeRoutes.map((r) => r.route_id)))
    }
  }, [activeRoutes])

  function handleToggle(routeId: string) {
    setVisibleRouteIds((prev) => {
      const next = new Set(prev)
      if (next.has(routeId)) {
        next.delete(routeId)
      } else {
        next.add(routeId)
      }
      return next
    })
  }

  function handleSelectAll() {
    setVisibleRouteIds(new Set(activeRoutes.map((r) => r.route_id)))
  }

  function handleClearAll() {
    setVisibleRouteIds(new Set())
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      <RouteSidebar
        routes={activeRoutes}
        visibleRouteIds={visibleRouteIds}
        onToggle={handleToggle}
        onSelectAll={handleSelectAll}
        onClearAll={handleClearAll}
      />
      <MapView
        vehicles={vehicles}
        routes={routes}
        shapes={shapes}
        stops={stops}
        visibleRouteIds={visibleRouteIds}
      />
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BusTracker />
    </QueryClientProvider>
  )
}
