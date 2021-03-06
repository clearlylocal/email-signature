export const colors = {
	brand: '#e06534',
	bigText: '#646464',
	smallText: '#646464',
	link: '#646464',
}

export const fonts = {
	body: '"Arial", sans-serif',
	cjk: '黑体, 黑體, SimHei',
}

const _sizes = {
	textSmall: 12,
	textMedium: 13.2,
	textLarge: 15.6,

	qrCode: 120,

	paddingSmall: 6,
	paddingMedium: 12,
	paddingLarge: 14,

	logoWidth: 150,
}

// adjust to scale the entire signature up or down
const SCALE = 0.9

export const sizes = Object.fromEntries(
	Object.entries(_sizes).map(([k, v]) => [
		k,
		parseFloat((v * SCALE).toFixed(1)),
	]),
) as typeof _sizes
