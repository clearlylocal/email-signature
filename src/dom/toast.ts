type ToastStyle = 'success' | 'failure' | 'none'

type ToastOptions = {
	style: ToastStyle
}

const toastStyleInfo: Record<ToastStyle, { icon: string }> = {
	success: { icon: '✅' },
	failure: { icon: '❌' },
	none: { icon: '' },
}

export const toast =
	(options: ToastOptions = { style: 'none' }) =>
	(msg: string) => {
		const div = document.createElement('div')
		div.classList.add('toast')
		div.style.opacity = '0'
		div.style.transition = 'opacity 0.6s'

		div.textContent = [toastStyleInfo[options.style].icon, msg]
			.filter(Boolean)
			.join(' ')

		document.body.appendChild(div)

		setTimeout(() => {
			div.style.opacity = '1'
		}, 10)

		setTimeout(() => {
			div.style.transition = 'opacity 1s'
		}, 200)

		setTimeout(() => {
			div.style.opacity = '0'
		}, 1200)

		setTimeout(() => {
			div.remove()
		}, 2000)
	}
