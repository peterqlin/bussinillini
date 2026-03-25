import { useState } from 'react'
import type { Route } from '../types/mtd'

interface RouteSidebarProps {
  routes: Route[]
  visibleRouteIds: Set<string>
  onToggle: (routeId: string) => void
  onSelectAll: () => void
  onClearAll: () => void
}

export default function RouteSidebar({
  routes,
  visibleRouteIds,
  onToggle,
  onSelectAll,
  onClearAll,
}: RouteSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const allVisible = routes.length > 0 && routes.every((r) => visibleRouteIds.has(r.route_id))

  const sidebarContent = (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-700">
        <h1 className="text-base font-semibold tracking-wide">CUMTD Bus Tracker</h1>
        <p className="text-xs text-gray-400 mt-0.5">Champaign-Urbana, IL</p>
      </div>

      {/* Master toggle */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <span className="text-sm font-medium">Show all buses</span>
        <button
          role="switch"
          aria-checked={allVisible}
          aria-label="Toggle all buses"
          onClick={allVisible ? onClearAll : onSelectAll}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ${
            allVisible ? 'bg-blue-500' : 'bg-gray-600'
          }`}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transform transition-transform duration-200 ${
              allVisible ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Route list */}
      <ul className="flex-1 overflow-y-auto py-2">
        {routes.map((route) => {
          const isVisible = visibleRouteIds.has(route.route_id)
          return (
            <li key={route.route_id}>
              <div className="flex items-center gap-3 px-4 py-2">
                {/* Color swatch */}
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/20"
                  style={{ backgroundColor: `#${route.route_color}` }}
                  aria-hidden="true"
                  data-testid={`swatch-${route.route_id}`}
                />
                {/* Route names */}
                <span className={`text-sm leading-tight flex-1 ${isVisible ? 'text-white' : 'text-gray-500'}`}>
                  <span className="font-mono text-xs text-gray-400 mr-1.5">{route.route_short_name}</span>
                  {route.route_long_name}
                </span>
                {/* Per-route toggle switch */}
                <button
                  role="switch"
                  aria-checked={isVisible}
                  aria-label={`Toggle ${route.route_long_name} route`}
                  onClick={() => onToggle(route.route_id)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ${
                    isVisible ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 ${
                      isVisible ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-3 left-3 z-50 bg-gray-800 text-white p-2 rounded-lg shadow-lg border border-gray-700"
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Toggle route sidebar"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-72 z-40 transform transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:shrink-0 h-full">
        {sidebarContent}
      </div>
    </>
  )
}
