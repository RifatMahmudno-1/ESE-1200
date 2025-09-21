import { writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs'

function eachObject(data) {
	let html = ''
	if (data.type === 'model') {
		html = `
<div class="model_wrapper">
<model-viewer
v-if="objectStatus['${data.link}']!=='error'"
src="${data.link}"
camera-controls
auto-rotate
shadow-intensity="1"
class="model-viewer"
loading="lazy"
interaction-prompt="none"
environment-image="neutral"
@error="()=>objectStatus['${data.link}']='error'"
@load="()=>objectStatus['${data.link}']='loaded'" >
</model-viewer>

<div v-if="objectStatus['${data.link}']===undefined" class="model_loader" :style="{background:!isDark?'rgb(190, 190, 190)': 'rgb(46, 46, 53)'}">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150"><path fill="none" stroke="#13A8FF" stroke-width="15" stroke-linecap="round" stroke-dasharray="300 385" stroke-dashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"><animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate></path></svg>
</div>
<div v-else-if="objectStatus['${data.link}']==='error'" class="model_loader" :style="{background:!isDark?'rgb(190, 190, 190)': 'rgb(46, 46, 53)'}">
	<svg style="color:rgba(224, 39, 39, 1);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
</div>
</div>
`
	} else {
		html = `
<div class="image_wrapper">
	<img v-if="objectStatus['${data.link}']!=='error'" :src="'${data.link}'" @error="objectStatus['${data.link}']='error'"/>
	<div v-if="objectStatus['${data.link}']==='error'" class="model_loader" :style="{background:!isDark?'rgb(190, 190, 190)': 'rgb(46, 46, 53)'}">
	<svg style="color:rgba(224, 39, 39, 1);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
</div>
</div>		
`
	}

	return `::: info ${
		data.type[0].toUpperCase() + data.type.slice(1, data.type.length)
	}
### ${data.title}{#${data.anchor}}
${html}
<p v-if="${data.rawLink !== undefined}"><a href="${
		data.rawLink
	}" download>Click to download</a> raw file if you want to open it in solidworks.</p>
:::`
}

export default (title, description, content, dir, link_dir) => {
	if (existsSync(dir)) rmSync(dir, { recursive: true, force: true })
	mkdirSync(dir, { recursive: true })

	/**
	 * index file generation
	 */
	let indexHtml = `# ${title}

${description}

${
	content.length
		? 'The projects are listed below:'
		: 'No projects have been added yet.'
}
`
	for (let cont of content) {
		indexHtml += `- [${cont.title_text}](${link_dir}/${
			cont.title_anchor
		}) - Total Projects done: ${cont.items.length}
	${cont.items
		.map(
			item =>
				`- [${item.title}](${link_dir}/${cont.title_anchor}#${item.title})`
		)
		.join('\n  ')}
`
	}
	writeFileSync(`${dir}/index.md`, indexHtml, { encoding: 'utf-8' })

	/**
	 * each content file generation
	 */

	for (let c = 0; c < content.length; c++) {
		const cont = content[c]
		let html = `---
${
	c > 0
		? `prev:
  text: '${content[c - 1].title_text}'
  link: '${link_dir}/${content[c - 1].title_anchor}'`
		: ''
}
${
	c + 1 < content.length
		? `next:
  text: '${content[c + 1].title_text}'
  link: '${link_dir}/${content[c + 1].title_anchor}'`
		: ''
}
---
<script setup>
	import { ref } from 'vue'
	import { useData } from 'vitepress'
	const { isDark } = useData()

	const objectStatus = ref({})
</script>		

# ${cont.title_text} | ${title}{#title}`

		for (let item of cont.items) {
			html += `\n\n## ${item.title}{#${item.title}}\n\n`

			for (let v = 0; v < item.views.length; v++) {
				let view = item.views[v]
				html += eachObject({
					link: view.link,
					rawLink: view.raw_link,
					type: view.type,
					title: view.title,
					anchor: `${item.title}--${view.type}--${v + 1}`
				})
			}
		}

		writeFileSync(`${dir}/${cont.title_anchor}.md`, html)
	}
}
