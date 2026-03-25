import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const key = process.env.CUMTD_API_KEY
  if (!key) {
    return res.status(500).json({ error: 'CUMTD_API_KEY not configured' })
  }

  const upstream = await fetch(
    `https://developer.mtd.org/api/v2.2/json/getvehicles?key=${key}`
  )
  const data = await upstream.json()

  // CDN caches for 55s so the origin API is hit ~once per minute (rate limit).
  // Client polls every 30s and gets a cached response on every other request.
  res.setHeader('Cache-Control', 's-maxage=55, stale-while-revalidate=5')
  res.json(data)
}
