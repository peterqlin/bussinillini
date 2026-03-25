import { useQuery } from '@tanstack/react-query'
import type { VehiclesResponse } from '../types/mtd'

export function useMtdVehicles() {
  return useQuery<VehiclesResponse>({
    queryKey: ['vehicles'],
    queryFn: () => fetch('/api/vehicles').then((r) => r.json()),
    staleTime: 25_000,
    refetchInterval: 30_000,
  })
}
