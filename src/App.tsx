import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MapView from './components/MapView'
import RouteSidebar from './components/RouteSidebar'
import { useMtdVehicles } from './hooks/useMtdVehicles'
import { useMtdRoutes } from './hooks/useMtdRoutes'

const queryClient = new QueryClient()

function BusTracker() {
  const { data: vehiclesData } = useMtdVehicles()
  const { data: routesData } = useMtdRoutes()

  const vehicles = vehiclesData?.vehicles ?? []
  const routes = routesData?.routes ?? []

  const [visibleRouteIds, setVisibleRouteIds] = useState<Set<string>>(new Set())

  // Once routes load, show all of them by default
  useEffect(() => {
    if (routes.length > 0) {
      setVisibleRouteIds(new Set(routes.map((r) => r.route_id)))
    }
  }, [routes.length])

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
    setVisibleRouteIds(new Set(routes.map((r) => r.route_id)))
  }

  function handleClearAll() {
    setVisibleRouteIds(new Set())
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      <RouteSidebar
        routes={routes}
        visibleRouteIds={visibleRouteIds}
        onToggle={handleToggle}
        onSelectAll={handleSelectAll}
        onClearAll={handleClearAll}
      />
      <MapView
        vehicles={vehicles}
        routes={routes}
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
