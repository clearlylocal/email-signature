// @ts-nocheck

// modified from https://gist.github.com/robertgonzales/b1966af8d2a428a8299663b92fb2fe03

import { Component, HTMLProps } from 'react'
import { createPortal } from 'react-dom'

export class IsolatedStyles extends Component<HTMLProps & ShadowRootInit> {
	componentDidMount() {
		this.shadowRoot = this.node.attachShadow({ mode: this.props.mode })
		this.forceUpdate()
	}

	render() {
		const { children, ...rest } = this.props
		return (
			<div {...rest} ref={(node) => (this.node = node)}>
				{this.shadowRoot && createPortal(children, this.shadowRoot)}
			</div>
		)
	}
}
