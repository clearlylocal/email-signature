export const langs = ['en', 'zh'] as const

export type Lang = typeof langs[number]

const en = {
	followUs: 'Follow us',
	companyInfo:
		'Clearly Local 夏澄科技 | 北京市朝阳区万科时代中心三层 | 13718316761 | [www.clearlyloc.com](https://www.clearlyloc.com)',
	privacyNotice:
		'The content of this email is confidential and intended for the recipient specified in message only. It is strictly forbidden to share any part of this message with any third party without written consent from the sender. If you received this message by mistake, please reply to inform the sender and then delete it.',
	qrCodeAlt: 'QR code to follow Clearly Local on WeChat',
	qrCodeUrl: 'http://weixin.qq.com/r/RjsCGjjExGW7rXx5925U',
	wechat: '(WeChat)',
	logoFull: 'logo.png',
	logoCropped: 'logo-cropped.png',
}

export type Translations = typeof en

const zh: Translations = {
	followUs: '关注我们',
	companyInfo:
		'Clearly Local 夏澄科技 | 北京市朝阳区万科时代中心三层 | 13718316761 | [www.clearlyloc.com](https://www.clearlyloc.com)',
	privacyNotice:
		'该邮件的内容是机密的，仅供邮件中指定的收件人使用。未经发件人书面同意，严禁与任何第三方共享该消息的任何部分。若误收到该邮件，请回复通知发件人，然后将其删除。',
	qrCodeAlt: '请扫码关注我们的公众号',
	qrCodeUrl: 'http://weixin.qq.com/r/RjsCGjjExGW7rXx5925U',
	wechat: '（微信）',
	logoFull: 'logo.png',
	logoCropped: 'logo-cropped.png',
}

export const i18n: Record<Lang, Translations> = {
	en,
	zh,
}
