import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const key = process.env.CUMTD_API_KEY
  if (!key) {
    return res.status(500).json({ error: 'CUMTD_API_KEY not configured' })
  }

  const { shape_id } = req.query
  if (!shape_id || typeof shape_id !== 'string') {
    return res.status(400).json({ error: 'shape_id query param required' })
  }

  const upstream = await fetch(
    `https://developer.mtd.org/api/v2.2/json/getshape?shape_id=${encodeURIComponent(shape_id)}&key=${key}`
  )
  const data = await upstream.json()

  // Shapes are static GTFS data — cache aggressively
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=300')
  res.json(data)
}
