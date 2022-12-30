import _i18n from './_i18n.json'

export type Lang = Exclude<keyof typeof _i18n, '*'>

export const langs = Object.keys(_i18n) as Lang[]

export type Translations = typeof _i18n['en']

export const i18n: Record<Lang, Translations> = _i18n
export const localeAgnostic = _i18n['*']

export const renderPlaceholders = (str: string, data: Record<string, string>) =>
	str.replaceAll(/\{\{(\w+)\}\}/gu, (_, m) => data[m])
