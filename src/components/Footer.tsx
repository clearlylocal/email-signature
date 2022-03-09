import { FC } from 'react'
import buildInfo from '../buildInfo.json'

export const Footer: FC = () => (
	<footer className='container'>
		<div className='grayed-out'>
			Version {buildInfo.hash}, updated{' '}
			{new Date(buildInfo.ts)
				.toISOString()
				.replace('T', ' ')
				.replace('Z', ' (UTC)')
				.replace(/\.\d+/, '')}
		</div>
	</footer>
)
