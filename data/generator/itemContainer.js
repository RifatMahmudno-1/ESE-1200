import imageContainer from './imageContainer.js'
import modelContainer from './modelContainer.js'

export default (type, title, anchor, link, rawLink) => {
	const infoType = type[0].toUpperCase() + type.slice(1, type.length)

	const downloadText = rawLink
		? `<p><a href="${rawLink}" download>Click to download</a> raw file if you want to open it in solidworks.</p>`
		: '<!-- no rawLink provided -->'

	const html = `
::: info ${infoType}
### ${title}{#${anchor}}
${type === 'model' ? modelContainer(link) : imageContainer(link)}
${downloadText}
:::
	`

	return html.trim()
}
