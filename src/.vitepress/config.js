import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	cleanUrls: true,
	lastUpdated: true,
	vite: { build: { assetsInlineLimit: 0 } },
	vue: {
		template: {
			compilerOptions: { isCustomElement: tag => tag === 'model-viewer' }
		}
	},

	head: [
		['link', { rel: 'stylesheet', href: '/global.css' }],
		[
			'script',
			{
				src: 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js',
				crossorigin: 'anonymous',
				type: 'module'
			}
		]
	],
	title: 'ESE 1200',
	description:
		'A website to showcase some of my projects from ESE 1200 course on Solidworks',
	themeConfig: {
		outline: [2, 3],
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'About Me', link: '/about-me' },
			{ text: 'CW', link: '/classworks' },
			{ text: 'HW', link: '/homeworks' }
		],

		// sidebar: [
		// 	{
		// 		text: 'Examples',
		// 		items: [
		// 			{ text: 'Markdown Examples', link: '/markdown-examples' },
		// 			{ text: 'Runtime API Examples', link: '/api-examples' }
		// 		]
		// 	}
		// ],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/RifatMahmudno-1/ese-1200' },
			{ icon: 'gmail', link: 'mailto:rifatmahmudpc@gmail.com' }
		],

		footer: {
			message: 'Created with ❤️ by Rifat Mahmud with Vitepress',
			copyright: `Copyright © ${new Date().getFullYear()} Rifat Mahmud`
		}
	}
})
