import { regex } from 'fancy-regex'
import { fonts } from '../styles/constants'

export const slugify = (str: string) =>
	str
		.toLowerCase()
		.replace(
			regex('gu')`[
				^
				\p{Letter}
				\p{Mark}
				\p{Number}
			]+`,
			' ',
		)
		.trim()
		.replace(/\s+/g, '-')

export const filenameify = (date: Date) =>
	date.toISOString().replace(/:/g, '_').slice(0, 19) + 'Z'

export const wrapEmailHtml = (html: string) => `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv=Content-Type content="text/html; charset=utf-8">
        <title>Email signature</title>
    </head>
    <body>
		${html}
    </body>
</html>`

export const toAssetPath = (filename: string) =>
	`${process.env.PUBLIC_URL}/assets/${filename}`

export const toContentPath = (filename: string) =>
	`${process.env.PUBLIC_URL}/content/${filename}`

const escapeHtml = (str: string) =>
	Object.assign(document.createElement('div'), { textContent: str }).innerHTML

export const safelyWrapCjk = (str: string) =>
	str
		.split(/([\p{Script=Han}\uff01-\uff5e。、·《》〈〉]+)/u)
		.map((x, i) =>
			i % 2
				? `<span style='font-family: ${fonts.cjk}'>${escapeHtml(
						x,
				  )}</span>`
				: escapeHtml(x),
		)
		.join('')
