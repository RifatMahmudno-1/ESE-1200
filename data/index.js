import classworks from './classworks.js'
import homeworks from './homeworks.js'
import pageGenerator from './pageGenerator.js'

pageGenerator(
	'Classworks',
	'Includes projects that I completed in lab sessions.',
	classworks,
	'./src/classworks',
	'/classworks'
)

pageGenerator(
	'Homeworks',
	'Includes projects that were given to me as homework.',
	homeworks,
	'./src/homeworks',
	'/homeworks'
)
