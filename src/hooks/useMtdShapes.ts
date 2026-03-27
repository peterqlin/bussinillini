import { useMemo } from 'react'
import { useQueries } from '@tanstack/react-query'
import type { Vehicle, ShapeResponse } from '../types/mtd'

export interface RouteShape {
  shapeId: string
  routeId: string
  coords: [number, number][]
}

export function useMtdShapes(vehicles: Vehicle[]): RouteShape[] {
  // Derive unique shape_id → route_id mapping from active vehicles
  const shapeToRoute = useMemo(() => {
    const map = new Map<string, string>()
    for (const v of vehicles) {
      if (v.trip?.shape_id && v.trip?.route_id) {
        map.set(v.trip.shape_id, v.trip.route_id)
      }
    }
    return map
  }, [vehicles])

  const shapeIds = useMemo(() => [...shapeToRoute.keys()], [shapeToRoute])

  const results = useQueries({
    queries: shapeIds.map((shapeId) => ({
      queryKey: ['shape', shapeId],
      queryFn: (): Promise<ShapeResponse> =>
        fetch(`/api/shape?shape_id=${encodeURIComponent(shapeId)}`).then((r) => r.json()),
      staleTime: 60 * 60 * 1000, // shapes are static GTFS — cache for 1h
    })),
  })

  return useMemo(() => {
    const out: RouteShape[] = []
    for (const [i, shapeId] of shapeIds.entries()) {
      const data = results[i]?.data
      if (!data?.shapes?.length) continue
      const routeId = shapeToRoute.get(shapeId)!
      const coords = [...data.shapes]
        .sort((a, b) => a.shape_pt_sequence - b.shape_pt_sequence)
        .map((p): [number, number] => [p.shape_pt_lon, p.shape_pt_lat])
      out.push({ shapeId, routeId, coords })
    }
    return out
  }, [results, shapeIds, shapeToRoute])
}
