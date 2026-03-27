import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const key = process.env.CUMTD_API_KEY
  if (!key) {
    return res.status(500).json({ error: 'CUMTD_API_KEY not configured' })
  }

  const upstream = await fetch(
    `https://developer.mtd.org/api/v2.2/json/getstops?key=${key}`
  )
  const data = await upstream.json()

  // Stops are static GTFS data — cache for 1 hour
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=300')
  res.json(data)
}
