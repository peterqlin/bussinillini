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

  const sidebarContent = (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-700">
        <h1 className="text-base font-semibold tracking-wide">CUMTD Bus Tracker</h1>
        <p className="text-xs text-gray-400 mt-0.5">Champaign-Urbana, IL</p>
      </div>

      {/* Controls */}
      <div className="flex gap-2 px-4 py-2 border-b border-gray-700">
        <button
          onClick={onSelectAll}
          className="flex-1 text-xs py-1 px-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          Select All
        </button>
        <button
          onClick={onClearAll}
          className="flex-1 text-xs py-1 px-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Route list */}
      <ul className="flex-1 overflow-y-auto py-2">
        {routes.map((route) => {
          const isVisible = visibleRouteIds.has(route.route_id)
          return (
            <li key={route.route_id}>
              <label className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 transition-colors">
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={() => onToggle(route.route_id)}
                  className="sr-only"
                  aria-label={`Toggle ${route.route_long_name} route`}
                />
                {/* Color swatch */}
                <span
                  className="w-4 h-4 rounded-full shrink-0 border border-white/20"
                  style={{ backgroundColor: `#${route.route_color}` }}
                  aria-hidden="true"
                  data-testid={`swatch-${route.route_id}`}
                />
                {/* Route names */}
                <span className={`text-sm leading-tight ${isVisible ? 'text-white' : 'text-gray-500'}`}>
                  <span className="font-mono text-xs text-gray-400 mr-1.5">{route.route_short_name}</span>
                  {route.route_long_name}
                </span>
                {/* Checkmark */}
                <span className="ml-auto text-xs" aria-hidden="true">
                  {isVisible ? '✓' : ''}
                </span>
              </label>
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
