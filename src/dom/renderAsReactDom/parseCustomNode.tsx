import { HtmlEmailLink } from '../../components/HtmlEmailLink'

export const parseCustomNode = (node: Node) => {
	const nodeName = node.nodeName.toLowerCase()

	switch (nodeName.toLowerCase()) {
		case 'a':
			const node_ = node as HTMLAnchorElement

			return (
				<HtmlEmailLink
					href={node_.href}
					text={node.textContent ?? ''}
				/>
			)
		default:
			return null
	}
}
