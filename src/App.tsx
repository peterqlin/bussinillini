import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MapView from './components/MapView'
import RouteSidebar from './components/RouteSidebar'
import { mockVehicles } from './mocks/vehicles'
import { mockRoutes } from './mocks/routes'

const queryClient = new QueryClient()

const ALL_ROUTE_IDS = new Set(mockRoutes.map((r) => r.route_id))

export default function App() {
  const [visibleRouteIds, setVisibleRouteIds] = useState<Set<string>>(ALL_ROUTE_IDS)

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
    setVisibleRouteIds(new Set(mockRoutes.map((r) => r.route_id)))
  }

  function handleClearAll() {
    setVisibleRouteIds(new Set())
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen overflow-hidden bg-gray-900">
        <RouteSidebar
          routes={mockRoutes}
          visibleRouteIds={visibleRouteIds}
          onToggle={handleToggle}
          onSelectAll={handleSelectAll}
          onClearAll={handleClearAll}
        />
        <MapView
          vehicles={mockVehicles}
          routes={mockRoutes}
          visibleRouteIds={visibleRouteIds}
        />
      </div>
    </QueryClientProvider>
  )
}
