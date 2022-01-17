import { FC } from 'react'
import { colors, fonts } from '../styles/constants'

type Props = {
	href: string
	text: string
}

export const HtmlEmailLink: FC<Props> = ({ href, text }) => {
	return (
		<a
			target='_blank'
			rel='noreferrer'
			style={{
				color: colors.link,
				fontSize: '12px',
				fontFamily: fonts.body,
			}}
			href={href}
		>
			<span
				style={{
					lineHeight: '1.2',
					fontFamily: fonts.body,
					whiteSpace: 'nowrap',
					fontSize: '12px',
				}}
			>
				{text}
			</span>
		</a>
	)
}
