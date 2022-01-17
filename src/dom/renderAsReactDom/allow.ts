import { allowAny, exact } from './filters'

export type Allow = {
	tag: string
	allowAttributes?: [attr: string, matcher: (input: string) => boolean][]
}

const headings: Allow[] = [...new Array(6)].map((_, n) => ({
	tag: `h${n + 1}`,
	allowAttributes: [['id', allowAny]],
}))

export const allow: Allow[] = [
	...headings,
	{ tag: 'p' },
	{ tag: 'ul' },
	{ tag: 'ol' },
	{ tag: 'li' },
	{
		tag: 'a',
		allowAttributes: [
			['href', allowAny],
			['target', exact('_blank')],
		],
	},
	{ tag: 'br' },
	{ tag: 'hr' },
]
