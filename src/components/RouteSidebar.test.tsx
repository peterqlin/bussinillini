import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import RouteSidebar from './RouteSidebar'
import { mockRoutes } from '../mocks/routes'

function renderSidebar(
  visibleRouteIds: Set<string> = new Set(mockRoutes.map((r) => r.route_id)),
  onToggle = vi.fn(),
  onSelectAll = vi.fn(),
  onClearAll = vi.fn()
) {
  return render(
    <RouteSidebar
      routes={mockRoutes}
      visibleRouteIds={visibleRouteIds}
      onToggle={onToggle}
      onSelectAll={onSelectAll}
      onClearAll={onClearAll}
    />
  )
}

describe('RouteSidebar', () => {
  it('renders all routes', () => {
    renderSidebar()
    for (const route of mockRoutes) {
      expect(screen.getAllByText(route.route_long_name).length).toBeGreaterThan(0)
    }
  })

  it('calls onToggle with the correct route_id when a route is clicked', async () => {
    const onToggle = vi.fn()
    renderSidebar(new Set(mockRoutes.map((r) => r.route_id)), onToggle)

    const label = screen.getAllByLabelText(/Toggle BROWN route/i)[0]
    await userEvent.click(label)

    expect(onToggle).toHaveBeenCalledWith('BROWN')
  })

  it('calls onSelectAll when Select All is clicked', async () => {
    const onSelectAll = vi.fn()
    renderSidebar(new Set(), vi.fn(), onSelectAll)

    // There are two "Select All" buttons (desktop + mobile drawer both render sidebarContent)
    const buttons = screen.getAllByRole('button', { name: /select all/i })
    await userEvent.click(buttons[0])

    expect(onSelectAll).toHaveBeenCalledTimes(1)
  })

  it('calls onClearAll when Clear All is clicked', async () => {
    const onClearAll = vi.fn()
    renderSidebar(new Set(mockRoutes.map((r) => r.route_id)), vi.fn(), vi.fn(), onClearAll)

    const buttons = screen.getAllByRole('button', { name: /clear all/i })
    await userEvent.click(buttons[0])

    expect(onClearAll).toHaveBeenCalledTimes(1)
  })

  it('applies the correct background color on route swatches', () => {
    renderSidebar()

    const brownSwatches = screen.getAllByTestId('swatch-BROWN')
    expect(brownSwatches[0]).toHaveStyle({ backgroundColor: '#c5972e' })

    const greenSwatches = screen.getAllByTestId('swatch-GREEN')
    expect(greenSwatches[0]).toHaveStyle({ backgroundColor: '#00a638' })
  })

  it('shows unchecked routes in muted color when route is hidden', () => {
    renderSidebar(new Set()) // all hidden
    // The label text for each route should use the dimmed class
    const brownLabel = screen.getAllByLabelText(/Toggle BROWN route/i)[0].closest('label')
    expect(brownLabel?.querySelector('span.text-gray-500')).toBeTruthy()
  })
})
