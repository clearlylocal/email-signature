import { HtmlEmailLink } from '../../components/HtmlEmailLink'

export const parseCustomNode = (node: Node) => {
	const nodeName = node.nodeName.toLowerCase()

	switch (nodeName.toLowerCase()) {
		case 'a':
			const node_ = node as HTMLAnchorElement

			return (
				<HtmlEmailLink href={node_.href}>
					{node.textContent ?? ''}
				</HtmlEmailLink>
			)
		default:
			return null
	}
}
