import { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
	handleLinks,
	prependPublicUrlToRelativeLinks,
	renderAnchors,
	scrollHashIntoView,
} from '../utils/dom'
import { toContentPath } from '../utils/formatters'
import { onHtmlRender } from '../utils/react'

export const Instructions: FC = () => {
	const [html, setHtml] = useState('')

	const history = useHistory()

	useEffect(() => {
		fetch(toContentPath('instructions.html')).then(async (res) => {
			const html = await res.text()

			setHtml(html)
		})
	}, [])

	return (
		<div
			ref={onHtmlRender((el) => {
				// setup
				renderAnchors(el)
				prependPublicUrlToRelativeLinks(el)
				handleLinks(el, history)

				// effects
				scrollHashIntoView(el)
			})}
			dangerouslySetInnerHTML={{ __html: html }}
		></div>
	)
}
