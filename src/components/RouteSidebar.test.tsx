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

  it('calls onToggle with the correct route_id when a route switch is clicked', async () => {
    const onToggle = vi.fn()
    renderSidebar(new Set(mockRoutes.map((r) => r.route_id)), onToggle)

    const switches = screen.getAllByRole('switch', { name: /Toggle BROWN route/i })
    await userEvent.click(switches[0])

    expect(onToggle).toHaveBeenCalledWith('BROWN')
  })

  it('calls onSelectAll when toggle is clicked while all buses are hidden', async () => {
    const onSelectAll = vi.fn()
    renderSidebar(new Set(), vi.fn(), onSelectAll)

    const switches = screen.getAllByRole('switch', { name: /toggle all buses/i })
    await userEvent.click(switches[0])

    expect(onSelectAll).toHaveBeenCalledTimes(1)
  })

  it('calls onClearAll when toggle is clicked while all buses are visible', async () => {
    const onClearAll = vi.fn()
    renderSidebar(new Set(mockRoutes.map((r) => r.route_id)), vi.fn(), vi.fn(), onClearAll)

    const switches = screen.getAllByRole('switch', { name: /toggle all buses/i })
    await userEvent.click(switches[0])

    expect(onClearAll).toHaveBeenCalledTimes(1)
  })

  it('toggle switch is checked when all routes are visible', () => {
    renderSidebar(new Set(mockRoutes.map((r) => r.route_id)))
    const switches = screen.getAllByRole('switch', { name: /toggle all buses/i })
    expect(switches[0]).toHaveAttribute('aria-checked', 'true')
  })

  it('toggle switch is unchecked when no routes are visible', () => {
    renderSidebar(new Set())
    const switches = screen.getAllByRole('switch', { name: /toggle all buses/i })
    expect(switches[0]).toHaveAttribute('aria-checked', 'false')
  })

  it('applies the correct background color on route swatches', () => {
    renderSidebar()

    const brownSwatches = screen.getAllByTestId('swatch-BROWN')
    expect(brownSwatches[0]).toHaveStyle({ backgroundColor: '#c5972e' })

    const greenSwatches = screen.getAllByTestId('swatch-GREEN')
    expect(greenSwatches[0]).toHaveStyle({ backgroundColor: '#00a638' })
  })

  it('shows route names in muted color when route is hidden', () => {
    renderSidebar(new Set()) // all hidden
    const brownSwitch = screen.getAllByRole('switch', { name: /Toggle BROWN route/i })[0]
    const row = brownSwitch.closest('div')
    expect(row?.querySelector('span.text-gray-500')).toBeTruthy()
  })
})
