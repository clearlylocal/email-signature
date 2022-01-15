export const waitForImageLoad = (img: HTMLImageElement) =>
	new Promise((res, rej) => {
		img.onload = res
		img.onerror = rej
	})
