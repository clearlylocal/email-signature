import { regex } from 'fancy-regex'

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
