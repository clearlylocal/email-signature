import { FC } from 'react'
import { colors, fonts, sizes } from '../styles/constants'

type Props = {
	href: string
}

export const HtmlEmailLink: FC<Props> = ({ href, children }) => {
	return (
		<a
			target='_blank'
			rel='noreferrer'
			style={{
				color: colors.link,
				fontSize: sizes.textSmall,
				fontFamily: fonts.body,
			}}
			href={href}
		>
			<span
				style={{
					lineHeight: '1.2',
					fontFamily: fonts.body,
					whiteSpace: 'nowrap',
					fontSize: sizes.textSmall,
				}}
			>
				{children}
			</span>
		</a>
	)
}
