import { consola } from 'consola'
import { build } from 'esbuild'
import fs from 'fs/promises'
import path from 'path'
import { type Page } from 'playwright'

/**
 * Recursively retrieves all JavaScript files from a directory.
 * @param {string} dir - The path of the directory to search.
 * @returns {Promise<string[]>} - List of absolute paths to JavaScript files.
 */
async function getAllScriptFiles(dir: string) {
  const dirents = await fs.readdir(dir, { withFileTypes: true })

  const files: (string | string[])[] = await Promise.all(
    dirents.map(async (dirent) => {
      const res = path.resolve(dir, dirent.name)
      if (dirent.isDirectory()) {
        return getAllScriptFiles(res)
      } else if (dirent.isFile() && res.includes('.inject')) {
        return res
      } else {
        return []
      }
    }),
  )
  return files.flat()
}

// export async function addScriptsToPage(page: Page, scriptsDir: string) {
//   const scriptFiles = await getAllScriptFiles(scriptsDir)
//   for (const filePath of scriptFiles) {
//     const code = await fs.readFile(filePath, 'utf-8')
//     await page.addScriptTag({ content: code })
//     console.log(`[INFO] Added script: ${filePath} and ${code.length} characters`)
//   }
// }

export async function addScriptsToPage(page: Page, scriptsDir: string) {
  const scriptFiles = await getAllScriptFiles(scriptsDir)
  for (const filePath of scriptFiles) {
    // Compile the script before adding it to the page that is
    // loaded in the browser and only understand JavaScript.
    const result = await build({
      entryPoints: [filePath],
      bundle: true,
      write: false,
      platform: 'browser',
      format: 'iife',
      target: 'esnext',
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const compiledCode = result.outputFiles[0].text
    await page.addScriptTag({ content: compiledCode })

    consola.log(`[INFO] Compiled & added script: ${filePath} (${compiledCode.length} characters)`)
  }
}
