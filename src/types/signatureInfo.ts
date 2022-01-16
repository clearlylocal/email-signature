import { Lang } from '../i18n/i18n'

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
	officeAddress: string
}
