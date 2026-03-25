import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const key = process.env.CUMTD_API_KEY
  if (!key) {
    return res.status(500).json({ error: 'CUMTD_API_KEY not configured' })
  }

  const upstream = await fetch(
    `https://developer.mtd.org/api/v2.2/json/getroutes?key=${key}`
  )
  const data = await upstream.json()

  // Routes are near-static — cache for 5 minutes at the CDN.
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60')
  res.json(data)
}
