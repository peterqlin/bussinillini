import { useQuery } from '@tanstack/react-query'
import type { StopsResponse } from '../types/mtd'

export function useMtdStops() {
  return useQuery<StopsResponse>({
    queryKey: ['stops'],
    queryFn: () => fetch('/api/stops').then((r) => r.json()),
    staleTime: 60 * 60 * 1000, // stops are static GTFS data — cache for 1h
  })
}
