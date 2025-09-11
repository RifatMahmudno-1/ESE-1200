import classworks from './classworks.js'
import { writeFileSync } from 'node:fs'

function eachObject(link, type, title, anchor) {
	let html = ''
	if (type === 'model') {
		html = `
<div class="model_wrapper">
<model-viewer
v-if="objectStatus['${link}']!=='error'"
src="${link}"
camera-controls
auto-rotate
shadow-intensity="1"
class="model-viewer"
loading="lazy"
interaction-prompt="none"
environment-image="neutral"
@error="()=>objectStatus['${link}']='error'"
@load="()=>objectStatus['${link}']='loaded'" >
</model-viewer>

<div v-if="objectStatus['${link}']===undefined" class="model_loader" :style="{background:!isDark?'rgb(190, 190, 190)': 'rgb(46, 46, 53)'}">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150"><path fill="none" stroke="#13A8FF" stroke-width="15" stroke-linecap="round" stroke-dasharray="300 385" stroke-dashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"><animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate></path></svg>
</div>
<div v-else-if="objectStatus['${link}']==='error'" class="model_loader" :style="{background:!isDark?'rgb(190, 190, 190)': 'rgb(46, 46, 53)'}">
	<svg style="color:rgba(224, 39, 39, 1);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
</div>
</div>
`
	} else {
		html = `
<div class="image_wrapper">
	<img v-if="objectStatus['${link}']!=='error'" :src="'${link}'" @error="objectStatus['${link}']='error'"/>
	<div v-if="objectStatus['${link}']==='error'" class="model_loader" :style="{background:!isDark?'rgb(190, 190, 190)': 'rgb(46, 46, 53)'}">
	<svg style="color:rgba(224, 39, 39, 1);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
</div>
</div>		
`
	}

	return `::: info ${
		type[0].toUpperCase() + type.slice(1, type.length)
	}\n### ${title}{#${anchor}}\n${html}\n:::`
}

export default () => {
	if (!existsSync('./src/classworks'))
		mkdirSync('./src/classworks', { recursive: true })

	let indexHtml = `# Classworks

Includes projects that I completed in lab sessions.

${
	classworks.length
		? 'The projects are listed below:'
		: 'No classworks added yet.'
}
`
	for (let classwork of classworks) {
		indexHtml += `- [${classwork.title_text}](/classworks/${
			classwork.title_anchor
		}) - Total Projects done: ${classwork.items.length}
	${classwork.items
		.map(
			item =>
				`- [${item.title}](/classworks/${classwork.title_anchor}#${item.title})`
		)
		.join('\n  ')}
`
	}
	writeFileSync('./src/classworks/index.md', indexHtml, { encoding: 'utf-8' })

	for (let classwork of classworks) {
		let html = `<script setup>
	import { ref } from 'vue'
	import { useData } from 'vitepress'
	const { isDark } = useData()

	const objectStatus = ref({})
</script>		

<h1>${classwork.title_text}</h1>`

		for (let item of classwork.items) {
			html += `\n\n## ${item.title}{#${item.title}}\n\n`

			for (let v = 0; v < item.views.length; v++) {
				let view = item.views[v]
				html += eachObject(
					view.link,
					view.type,
					view.title,
					`${item.title}--${view.type}--${v + 1}`
				)
			}
		}

		writeFileSync(`./src/classworks/${classwork.title_anchor}.md`, html)
	}
}
