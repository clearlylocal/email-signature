import { Lang } from '../utils/i18n'

export type SignatureInfo = {
	lang: Lang
	name: {
		en: string
		zh: string
	}
	jobTitle: string
	phone: {
		number: string
		usedForWechat: boolean
	}
	email: string
}
