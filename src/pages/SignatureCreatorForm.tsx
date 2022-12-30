import React, { FC, useCallback, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { IsolatedStyles } from '../components/IsolatedStyles'
import { RenderedSignature } from '../components/RenderedSignature'
import { copyHtml } from '../dom/copyHtml'
import { useHtmlId } from '../hooks/useHtmlId'
import { localeAgnostic } from '../i18n/i18n'
import { sizes } from '../styles/constants'
import { SignatureInfo } from '../types/signatureInfo'

const init: SignatureInfo = {
	lang: 'en',
	name: {
		en: 'Jane Doe',
		zh: '杜娟',
	},
	jobTitle: 'Senior Data Wrangler',
	phone: { number: '+86 138 8888 8888', usedForWechat: false, usedForWhatsapp: false },
	email: 'jane.doe@clearlyloc.com',
	officeAddress: localeAgnostic.addresses[0].value,
}

const defaultValues: SignatureInfo =
	JSON.parse(localStorage.getItem('signatureCreator') ?? 'null') ?? init

export const SignatureCreatorForm: FC = () => {
	const { register, handleSubmit, getValues, setValue } = useForm<SignatureInfo>({
		defaultValues,
	})

	const formRef = useRef<HTMLFormElement>(null)

	const updateValidationMessages = useCallback(() => {
		for (const validated of formRef.current?.querySelectorAll('.validated') ??
			[]) {

			const validationEl = validated.querySelector('.validation-msg')

			if (validationEl) {
				const msgs = [...validated.querySelectorAll('input')].map((input) => {

					let { validationMessage, validity } = input

					if (
						!validity.valueMissing &&
						validity.patternMismatch
					) {
						validationMessage =
							input.dataset.patternMsg ??
							validationMessage
					}

					return validationMessage
				})

				const validationMessage = msgs.find(Boolean) ?? ''

				validationEl.textContent = validationMessage
			}

		}
	}, [])

	const addressDatalistId = useHtmlId(`address-list`)

	useEffect(() => {
		// once on load
		updateValidationMessages()

		for (const el of formRef.current?.querySelectorAll('input') ?? []) {
			// if (el.list) continue

			let o: any = init

			for (const x of el.name.split('.')) {
				o = o?.[x]
			}

			el.placeholder = String(o)
		}

	}, [updateValidationMessages])

	const changeHandler = useCallback(
		(form: SignatureInfo) => {
			localStorage.setItem('signatureCreator', JSON.stringify(form))

			updateValidationMessages()
		},
		[updateValidationMessages],
	)

	const _values = getValues()

	const values = _values?.name ? _values : defaultValues

	const savedOfficeAddress = useRef(values.officeAddress)

	const blankOutOfficeAddress = (
		e:
			| React.FocusEvent<HTMLInputElement>
			| React.MouseEvent<HTMLInputElement>,
	) => {
		savedOfficeAddress.current = values.officeAddress
		e.currentTarget.placeholder = values.officeAddress
		e.currentTarget.value = ''
	}

	const revertOfficeAddress = (
		e:
			| React.FocusEvent<HTMLInputElement>
			| React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (!(e.nativeEvent instanceof KeyboardEvent) || e.nativeEvent.key === 'Escape') {
			setValue(
				e.currentTarget.name,
				e.currentTarget.value || savedOfficeAddress.current,
			)

			// re-trigger validation
			e.currentTarget.dispatchEvent(
				new Event('input', {
					bubbles: true,
					cancelable: true,
				}),
			)
		}
	}

	return (
		<>
			<h1>Email signature</h1>

			<div className='row'>
				<form
					className='col'
					ref={formRef}
					onInput={handleSubmit(changeHandler)}
				>
					<div className='magic-flex'>
						<div className='spaced validated'>
							<fieldset>
								<legend>Template language</legend>
								<label>
									English
									<input
										required
										type='radio'
										name='lang'
										value='en'
										ref={register}
										defaultChecked
									/>
								</label>{' '}
								<label>
									Chinese
									<input
										required
										type='radio'
										name='lang'
										value='zh'
										ref={register}
									/>
								</label>
							</fieldset>
							<div className='validation-msg'></div>
						</div>

						<div className='spaced validated col-first'>
							<label>
								English name
								<input required name='name.en' ref={register} />
								<div className='validation-msg'></div>
							</label>
						</div>

						<div className='spaced validated col-last'>
							<label>
								Chinese name (optional)
								<input name='name.zh' ref={register} />
								<div className='validation-msg'></div>
							</label>
						</div>

						<div className='spaced validated'>
							<label>
								Job title
								<input
									required
									name='jobTitle'
									ref={register}
								/>
								<div className='validation-msg'></div>
							</label>
						</div>

						<div className='spaced validated'>
							<label>
								Work email
								<input
									required
									type='email'
									name='email'
									ref={register}
									pattern='.+@clearlyloc.com'
									data-pattern-msg='Must end with @clearlyloc.com'
								/>
								<div className='validation-msg'></div>
							</label>
						</div>

						<div className='spaced validated'>
							<label>
								Phone number (including country code)
								<input
									type='tel'
									name='phone.number'
									ref={register}
									pattern='\+[\d\p{P}\p{Z}]+'
									data-pattern-msg='Must start with “+” and a country code (e.g. +86 for China) and include only numbers, spaces, or punctuation'
								/>
							</label>

							<div className='secondary-field'>
								<label className='inline-label'>
									WeChat?
									<input
										type='checkbox'
										name='phone.usedForWechat'
										ref={register}
									/>
								</label>

								<label className='inline-label'>
									WhatsApp?
									<input
										type='checkbox'
										name='phone.usedForWhatsapp'
										ref={register}
									/>
								</label>
							</div>
							<div className='validation-msg'></div>
						</div>

						<div className='spaced validated'>
							<label>
								Office address
								<input
									onClick={blankOutOfficeAddress}
									onFocus={blankOutOfficeAddress}
									onBlur={revertOfficeAddress}
									onKeyDown={revertOfficeAddress}
									required
									type='text'
									name='officeAddress'
									ref={register}
									list={addressDatalistId}
								/>
								<div className='validation-msg'></div>
							</label>

							<datalist id={addressDatalistId}>
								{localeAgnostic.addresses.map(
									(address, idx) => (
										<option key={idx} value={address.value}>
											{address.name}
										</option>
									),
								)}
							</datalist>
						</div>
					</div>
				</form>

				<div className='col'>
					<div className='spaced'>
						<output>
							<IsolatedStyles id='rendered-signature-container'>
								<RenderedSignature
									{...{
										...values,
										qrCodeSize: sizes.qrCode,
									}}
								/>
							</IsolatedStyles>
						</output>
					</div>

					<button
						onClick={() =>
							copyHtml(
								document
									.querySelector(
										'#rendered-signature-container',
									)!
									.shadowRoot?.querySelector('*')!,
							)
						}
						className='button primary'
						type='button'
					>
						Copy
					</button>
				</div>
			</div>
		</>
	)
}
