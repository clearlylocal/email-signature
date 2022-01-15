import { FC } from 'react'

type Props = {
	alt: string
	size: number
	src: string
}

export const QrCode: FC<Props> = ({ alt, size, src }) => (
	<img
		alt={alt}
		src={src}
		height={size}
		width={size}
		style={{
			width: `${size}px`,
			verticalAlign: 'initial',
			borderRadius: 0,
			display: 'block',
			height: `${size}px`,
		}}
	/>
)
