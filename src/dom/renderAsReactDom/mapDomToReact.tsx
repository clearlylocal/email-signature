import { Fragment } from 'react'
import { allow } from './allow'
import { parseCustomNode } from './parseCustomNode'

const isTextNode = (node: Node): node is Text =>
	node.nodeType === Node.TEXT_NODE

const isHtmlElementNode = (node: Node): node is HTMLElement =>
	node.nodeType === Node.ELEMENT_NODE

export const mapDomToReact = (node: Node, idx: number) => {
	if (isTextNode(node)) {
		return <Fragment key={idx}>{node.data}</Fragment>
	} else if (isHtmlElementNode(node)) {
		const customNode = parseCustomNode(node)

		if (customNode) return customNode

		const allowed = allow.find(
			(item) => item.tag.toUpperCase() === node.nodeName,
		)

		if (!allowed) {
			const inner = node.innerHTML
			const outer = node.outerHTML

			const idxOfInner = outer.indexOf(inner)

			const startTag = outer.slice(0, idxOfInner)
			const endTag = outer.slice(idxOfInner + inner.length)

			return (
				<Fragment key={idx}>
					<Fragment key={-1}> {startTag} </Fragment>
					{[...node.childNodes].map((n, i) => mapDomToReact(n, i))}
					<Fragment key={node.childNodes.length}> {endTag} </Fragment>
				</Fragment>
			)
		}

		const El = node.nodeName.toLowerCase()

		const props: Record<string, string> = {}

		for (const { name, value } of node.attributes) {
			const match = allowed.allowAttributes?.find(([key]) => key === name)

			if (!match) continue

			const [, validate] = match

			if (validate(value)) {
				props[name] = value
			}
		}

		return node.textContent ? (
			<El key={idx} {...(props as any)}>
				{[...node.childNodes].map((n, i) => mapDomToReact(n, i))}
			</El>
		) : (
			<El key={idx} {...props} />
		)
	}

	return <></>
}
