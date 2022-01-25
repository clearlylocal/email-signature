import { FC, Fragment, useEffect, useState } from 'react'
import { colors, fonts } from '../styles/constants'
import { SignatureInfo } from '../types/signatureInfo'
import snarkdown from 'snarkdown'
import { i18n, localeAgnostic } from '../i18n/i18n'
import { SignatureTable } from './SignatureTable'
import { getQrCode } from '../utils/qrCode'
import { toAssetPath } from '../utils/formatters'
import { waitForImageLoad } from '../dom/waitForImageLoad'
import { pipe } from 'fp-ts/lib/function'
import { renderAsReactDom } from '../dom/renderAsReactDom'
import { HtmlEmailLink } from './HtmlEmailLink'

type LoadingState =
	| {
			loading: false
			qrCodeDataUri: string
	  }
	| {
			loading: true
			qrCodeDataUri?: undefined
	  }

const initialLoadingState = {
	loading: true,
	qrCodeDataUri: undefined,
} as LoadingState

const BareLink: FC<{ href: string }> = ({ href }) => (
	<HtmlEmailLink href={href}>
		{href.replace(/^https?:\/\//, '')}
	</HtmlEmailLink>
)

export const RenderedSignature: FC<SignatureInfo & { qrCodeSize: number }> = (
	props,
) => {
	const [data, setData] = useState(initialLoadingState)

	const currentLang = props.lang

	const tr = i18n[currentLang]

	useEffect(() => {
		setData(initialLoadingState)
		console.info('Loading QR code...')

		const img = document.createElement('img')
		img.src = toAssetPath(tr.logoFull)

		Promise.all([
			getQrCode({
				size: props.qrCodeSize,
				url: tr.qrCodeUrl,
				logo: toAssetPath(tr.logoCropped),
			}),
			waitForImageLoad(img),
		]).then(async ([qrCodeDataUri]) => {
			setData({
				loading: false,
				qrCodeDataUri,
			})
		})
	}, [props.qrCodeSize, tr.logoCropped, tr.qrCodeUrl, tr.logoFull])

	return data.loading ? (
		<>Loading...</>
	) : (
		<div style={{ fontFamily: fonts.body, color: colors.smallText }}>
			<div>
				<SignatureTable
					{...{
						...props,
						qrCodeSize: props.qrCodeSize,
						qrCodeDataUri: data.qrCodeDataUri,
					}}
					translations={tr}
				/>
			</div>
			<p
				style={{
					fontFamily: fonts.body,
					lineHeight: 1.6,
					margin: '12px 0.01px 0.01px 0.01px',
					color: colors.smallText,
					fontSize: 12,
				}}
			>
				{[
					localeAgnostic.companyName,
					props.officeAddress,
					<BareLink href={localeAgnostic.websiteUrl} />,
				]
					.flatMap((x, i, a) => (i === a.length - 1 ? x : [x, ' | ']))
					.map((x, i) => (
						<Fragment key={i}>{x}</Fragment>
					))}
			</p>
			<p
				style={{
					fontFamily: fonts.body,
					lineHeight: 1.6,
					margin: '12px 0.01px 0.01px 0.01px',
					color: colors.smallText,
					fontSize: 12,
				}}
			>
				{pipe(tr.privacyNotice, snarkdown, renderAsReactDom)}
			</p>
		</div>
	)
}
