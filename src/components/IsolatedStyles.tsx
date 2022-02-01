import { FC, HTMLProps, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export const IsolatedStyles: FC<HTMLProps<HTMLDivElement>> = ({
	children,
	...rest
}) => {
	const ref = useRef<HTMLDivElement>(null)

	const [shadowRoot, setShadowRoot] = useState<null | ShadowRoot>(null)

	useEffect(() => {
		if (!shadowRoot && ref.current) {
			const shadowRoot = ref.current.attachShadow({ mode: 'open' })
			setShadowRoot(shadowRoot)
		}
	}, [shadowRoot])

	return (
		<div {...rest} ref={ref}>
			{shadowRoot &&
				createPortal(children, shadowRoot as unknown as Element)}
		</div>
	)
}
