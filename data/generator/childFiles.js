import { writeFileSync } from 'node:fs'
import itemContainer from './itemContainer.js'

function previousLinkHtml(cont, link_dir) {
	const html = `
prev:
  text: '${cont.title_text}'
  link: '${link_dir}/${cont.title_anchor}'	
`
	return html.trimStart()
}
function nextLinkHtml(cont, link_dir) {
	const html = `
next:
  text: '${cont.title_text}'
  link: '${link_dir}/${cont.title_anchor}'	
`
	return html.trimStart()
}

export default (title, content, dir, link_dir) => {
	for (let c = 0; c < content.length; c++) {
		const cont = content[c]
		let html = ''

		// previous and next link generation
		const previousLink = c > 0 ? previousLinkHtml(content[c - 1], link_dir) : ''
		const nextLink =
			c + 1 < content.length ? nextLinkHtml(content[c + 1], link_dir) : ''
		const linkText = (previousLink + '\n' + nextLink).trim()
		if (linkText) html += `---\n${linkText}\n---\n\n`

		// script generation
		const script = `
<script setup>
	import { ref } from 'vue'
	import { useData } from 'vitepress'
	const { isDark } = useData()

	const objectStatus = ref({})
</script>
		`
		html += script.trim() + '\n\n'

		// title generation
		html += `# ${cont.title_text} | ${title}{#title}`

		// items
		for (let item of cont.items) {
			html += `\n\n## ${item.title}{#${item.title}}\n`

			for (let v = 0; v < item.views.length; v++) {
				let view = item.views[v]
				html += itemContainer(
					view.type,
					view.title,
					`${item.title}--${view.type}--${v + 1}`,
					view.link,
					view.raw_link
				)
			}
		}

		writeFileSync(`${dir}/${cont.title_anchor}.md`, html)
	}
}
