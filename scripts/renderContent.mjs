import yaml from 'js-yaml'
import showdown from 'showdown'
import fs from 'fs'
import path from 'path'

showdown.setFlavor('github')
const converter = new showdown.Converter()

try {
	// i18n
	const i18n = yaml.load(fs.readFileSync('./content/i18n.yml', 'utf8'))

	fs.writeFileSync('./src/i18n/_i18n.json', JSON.stringify(i18n, null, '\t'))

	// instructions
	const instructions = converter.makeHtml(
		fs.readFileSync('./content/instructions.md', 'utf8'),
	)

	fs.writeFileSync('./public/content/instructions.html', instructions)
} catch (e) {
	console.error(e)
}
