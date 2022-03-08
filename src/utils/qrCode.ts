import QRCode from 'qrcode'
import { waitForImageLoad } from '../dom/waitForImageLoad'
import { colors } from '../styles/constants'

type Rect = [x: number, y: number, width: number, height: number]

// https://stackoverflow.com/a/7838871

const roundRect = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	w: number,
	h: number,
	r: number,
) => {
	if (w < 2 * r) r = w / 2
	if (h < 2 * r) r = h / 2

	ctx.beginPath()
	ctx.moveTo(x + r, y)
	ctx.arcTo(x + w, y, x + w, y + h, r)
	ctx.arcTo(x + w, y + h, x, y + h, r)
	ctx.arcTo(x, y + h, x, y, r)
	ctx.arcTo(x, y, x + w, y, r)
	ctx.closePath()
}

const customRoundRect = (
	ctx: CanvasRenderingContext2D,
	outerSize: number,
	innerSize: number,
) => {
	const rect: Rect = [
		outerSize / 2 - innerSize / 2,
		outerSize / 2 - innerSize / 2,
		innerSize,
		innerSize,
	]

	roundRect(ctx, ...rect, innerSize / 8)
}

type QrCodeInit = {
	size: number
	url: string
	logo: string
}

const paintQrToCanvas = (
	canvas: HTMLCanvasElement,
	url: string,
	size: number,
) =>
	new Promise<void>((res, rej) => {
		QRCode.toCanvas(canvas, url, { margin: 2, width: size }, (err) => {
			if (err) {
				rej(err)
			} else {
				res()
			}
		})
	})

export const getQrCode = async ({ size, url, logo }: QrCodeInit) => {
	// leads to much smoother rendering
	size *= 3

	const canvas = document.createElement('canvas')

	canvas.width = size
	canvas.height = size

	canvas.style.cssText = `width: ${size}px; height: ${size}px`

	await paintQrToCanvas(canvas, url, size)

	const ctx = canvas.getContext('2d')!

	const qrCodeSize = size
	const outerLogoSize = size / 3.5
	const innerLogoSize = size / 4

	customRoundRect(ctx, qrCodeSize, outerLogoSize)
	ctx.fillStyle = '#ffffff'
	ctx.fill()

	customRoundRect(ctx, qrCodeSize, innerLogoSize)
	ctx.strokeStyle = colors.brand
	ctx.lineWidth = 0.5
	ctx.stroke()

	const img = document.createElement('img')
	img.hidden = true
	document.body.appendChild(img)
	img.src = logo

	try {
		await waitForImageLoad(img)

		const aspectRatio = img.width / img.height

		const offset = qrCodeSize / 2 - innerLogoSize / 2

		ctx.drawImage(
			img,
			offset + aspectRatio,
			offset,
			innerLogoSize * aspectRatio,
			innerLogoSize,
		)
	} catch (e) {
		console.error(e)
	}

	img.remove()

	return canvas.toDataURL()
}
