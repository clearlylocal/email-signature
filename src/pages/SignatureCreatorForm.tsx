import React, { FC, useCallback, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { IsolatedStyles } from '../components/IsolatedStyles'
import { RenderedSignature } from '../components/RenderedSignature'
import { copyHtml } from '../dom/copyHtml'
import { useHtmlId } from '../hooks/useHtmlId'
import { localeAgnostic } from '../i18n/i18n'
import { SignatureInfo } from '../types/signatureInfo'

const qrCodeSize = 120

const init: SignatureInfo = {
	lang: 'en',
	name: {
		en: 'Jane Doe',
		zh: '杜娟',
	},
	jobTitle: 'Senior Data Wrangler',
	phone: { number: '+86 138 8888 8888', usedForWechat: false },
	email: 'jane.doe@clearlyloc.com',
	officeAddress: localeAgnostic.addresses[0].value,
}

const defaultValues: SignatureInfo =
	JSON.parse(localStorage.getItem('signatureCreator') ?? 'null') ?? init

export const SignatureCreatorForm: FC = () => {
	const { register, handleSubmit, getValues, reset } = useForm<SignatureInfo>(
		{
			defaultValues,
		},
	)

	const formRef = useRef<HTMLFormElement>(null)

	const updateValidationMessages = useCallback(() => {
		for (const input of formRef.current?.querySelectorAll('input') ?? []) {
			const validationEl = input.nextElementSibling

			if (
				validationEl &&
				validationEl.classList.contains('validation-msg')
			) {
				let { validationMessage, validity } = input

				if (!validity.valueMissing && validity.patternMismatch) {
					validationMessage =
						input.dataset.patternMsg ?? validationMessage
				}

				validationEl.textContent = validationMessage
			}
		}
	}, [])

	const addressDatalistId = useHtmlId(`address-list`)

	useEffect(() => {
		// once on load
		updateValidationMessages()
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

		e.currentTarget.value = ''
	}

	const revertOfficeAddress = (e: React.FocusEvent<HTMLInputElement>) => {
		e.currentTarget.value =
			e.currentTarget.value || savedOfficeAddress.current
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
						<div className='spaced col-first'>
							<label>
								English name
								<input required name='name.en' ref={register} />
								<div className='validation-msg'></div>
							</label>
						</div>

						<div className='spaced col-last'>
							<label>
								Chinese name (optional)
								<input name='name.zh' ref={register} />
								<div className='validation-msg'></div>
							</label>
						</div>

						<div className='spaced'>
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

						<div className='spaced'>
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

						<div className='spaced'>
							<label>
								Phone number (including country code)
								<input
									required
									type='tel'
									name='phone.number'
									ref={register}
									pattern='\+[\d ]+'
									data-pattern-msg='Must start with a country code in the format +XX (e.g. +86 for China) and contain only numbers and spaces'
								/>
								<div className='validation-msg'></div>
							</label>

							<label className='secondary-field'>
								Used for WeChat?
								<input
									type='checkbox'
									name='phone.usedForWechat'
									ref={register}
								/>
							</label>
						</div>

						<div className='spaced'>
							<label>
								Office address
								<input
									onClick={blankOutOfficeAddress}
									onFocus={blankOutOfficeAddress}
									onBlur={revertOfficeAddress}
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

						<div className='spaced'>
							<fieldset>
								<legend>Signature language</legend>
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
						</div>
					</div>
				</form>

				<div className='col'>
					<div className='spaced'>
						<output>
							<IsolatedStyles
								id='rendered-signature-container'
								mode='open'
							>
								<RenderedSignature
									{...{ ...values, qrCodeSize }}
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
