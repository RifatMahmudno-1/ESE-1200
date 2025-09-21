export default link => {
	const html = `
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
	return html.trim()
}
