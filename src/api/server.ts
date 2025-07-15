import express, { Request, Response } from 'express'
import { extractPageData } from '../extractors/extractPageData.js'
import { consola } from 'consola'

const app = express()
const port: number | string = process.env.PORT || 3000

app.get('/url-to-markdown', async (req: Request, res: Response) => {
  const url = req.query.url
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid url parameter' })
  }
  try {
    const { content, title, thumbnail } = await extractPageData(url)
    res.json({ content, title, thumbnail })
  } catch (err: unknown) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.status(500).json({ error: err.message ?? 'Unknown error' })
  }
})

app.listen(port, () => {
  consola.log(`Server listening on port ${port}`)
})
