import { useQuery } from '@tanstack/react-query'
import type { RoutesResponse } from '../types/mtd'

export function useMtdRoutes() {
  return useQuery<RoutesResponse>({
    queryKey: ['routes'],
    queryFn: () => fetch('/api/routes').then((r) => r.json()),
    staleTime: 300_000,
    refetchInterval: false,
  })
}
