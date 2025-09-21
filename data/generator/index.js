import { mkdirSync, existsSync, rmSync } from 'node:fs'
import indexFile from './indexFile.js'
import childFiles from './childFiles.js'

export default (title, description, content, dir, link_dir) => {
	if (existsSync(dir)) rmSync(dir, { recursive: true, force: true })
	mkdirSync(dir, { recursive: true })

	indexFile(title, description, content, dir, link_dir)
	childFiles(title, content, dir, link_dir)
}
