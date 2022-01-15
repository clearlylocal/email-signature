import { toast } from './toast'

export const copyHtml = (el: HTMLElement) => {
	const selection = document.getSelection()
	const range = document.createRange()

	selection?.empty()
	selection?.addRange(range)

	range.selectNode(el)

	const succeeded = document.execCommand('copy')

	if (succeeded) {
		toast({ style: 'success' })('Copied')
	} else {
		toast({ style: 'failure' })('Failed to copy')
	}

	selection?.empty()
}
