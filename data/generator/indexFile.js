import { writeFileSync } from 'node:fs'

export default (title, description, content, dir, link_dir) => {
	let indexHtml = `
# ${title}\n
${description}\n
${
	content.length
		? 'The projects are listed below:'
		: 'No projects have been added yet.'
}`

	for (let cont of content) {
		let wholeProject = `- [${cont.title_text}](${link_dir}/${cont.title_anchor}) - Total Projects done: ${cont.items.length}`
		cont.items.forEach(item => {
			wholeProject += `\n  - [${item.title}](${link_dir}/${cont.title_anchor}#${item.title})`
		})
		indexHtml += `\n${wholeProject}`
	}

	writeFileSync(`${dir}/index.md`, indexHtml.trim(), { encoding: 'utf-8' })
}
