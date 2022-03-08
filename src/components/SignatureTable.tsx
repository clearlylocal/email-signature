import { FC } from 'react'
import { colors, fonts, sizes } from '../styles/constants'
import { SignatureInfo } from '../types/signatureInfo'
import snarkdown from 'snarkdown'
import { QrCode } from './QrCode'
import { Translations, langs } from '../i18n/i18n'
import { safelyWrapCjk, toAssetPath } from '../utils/formatters'
import { pipe } from 'fp-ts/lib/function'
import { HtmlEmailLink } from './HtmlEmailLink'

type Props = {
  translations: Translations
  qrCodeSize: number
  qrCodeDataUri: string
} & SignatureInfo

export const SignatureTable: FC<Props> = ({ qrCodeSize, qrCodeDataUri, translations: tr, ...props }) => {
  const currentLang = props.lang
  const altLang = langs.find((x) => x !== currentLang)!

  return (
    <table style={{ direction: 'ltr', borderCollapse: 'collapse' }}>
      <tbody>
        <tr>
          <td>
            <table
              cellPadding={0}
              cellSpacing={0}
              style={{
                borderCollapse: 'collapse',
                fontFamily: fonts.body,
                lineHeight: '1.15',
                color: '#000',
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      verticalAlign: 'top',
                      padding: `0.01px ${sizes.paddingLarge}px 0.01px 0.01px`,
                    }}
                  >
                    <table
                      cellPadding={0}
                      cellSpacing={0}
                      style={{
                        borderCollapse: 'collapse',
                        width: qrCodeSize,
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              padding: '0.01px',
                            }}
                          >
                            <QrCode alt={tr.qrCodeAlt} src={qrCodeDataUri} size={qrCodeSize} />
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              borderCollapse: 'collapse',
                              fontFamily: fonts.body,
                              lineHeight: '1.15',
                              color: colors.brand,
                              padding: `${sizes.paddingSmall}px 0.01px 0.01px 0.01px`,
                              fontSize: sizes.textLarge,
                              textAlign: 'center',
                            }}
                            dangerouslySetInnerHTML={{
                              __html: pipe(tr.followUs, snarkdown, safelyWrapCjk)
                            }}
                          />
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td
                    height={1}
                    width={0}
                    style={{
                      width: '0px',
                      padding: '0.01px',
                      borderRight: `2px solid ${colors.brand}`,
                      height: '1px',
                      fontSize: 1,
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    style={{
                      padding: `0.01px ${sizes.paddingLarge}px 0.01px ${sizes.paddingLarge}px`,
                      verticalAlign: 'top',
                    }}
                    valign='top'
                  >
                    <table
                      cellPadding={0}
                      cellSpacing={0}
                      style={{
                        borderCollapse: 'collapse',
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              lineHeight: '1.2',
                              padding: '0.01px 0.01px 10px 0.01px',
                            }}
                          >
                            <span
                              style={{
                                fontFamily: fonts.body,
                                textTransform: 'initial',
                                fontWeight: 'bold',
                              }}
                            >
                              <span
                                style={{
                                  fontSize: sizes.textLarge,
                                }}
                              >
                                <img width={sizes.logoWidth} src={toAssetPath(tr.logoFull)} alt='' />
                              </span>
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{
                              lineHeight: '1.2',
                              padding: `0.01px 0.01px ${sizes.paddingMedium}px 0.01px`,
                            }}
                          >
                            <span
                              style={{
                                fontFamily: fonts.body,
                                textTransform: 'initial',
                                fontWeight: 'bold',
                              }}
                            >
                              <span
                                style={{
                                  color: colors.bigText,
                                  fontSize: sizes.textLarge,
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: safelyWrapCjk([props.name[currentLang], props.name[altLang]].filter(Boolean).join(' '))
                                }}
                              />
                            </span>
                            <br />
                            <span
                              style={{
                                fontSize: sizes.textMedium,
                                letterSpacing: '0px',
                                fontFamily: fonts.body,
                                textTransform: 'initial',
                                fontWeight: 'bold',
                                color: colors.bigText,
                              }}
                              dangerouslySetInnerHTML={{
                                __html: safelyWrapCjk(props.jobTitle)
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              padding: '0.01px',
                              lineHeight: 0,
                            }}
                          >
                            <table
                              cellPadding={0}
                              cellSpacing={0}
                              style={{
                                borderCollapse: 'collapse',
                              }}
                            >
                              <tbody>
                                {props.phone.number && (
                                  <tr>
                                    <td
                                      style={{
                                        padding: '0.01px',
                                      }}
                                    >
                                      <table
                                        cellPadding={0}
                                        cellSpacing={0}
                                        style={{
                                          borderCollapse: 'collapse',
                                        }}
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              style={{
                                                lineHeight: '0%',
                                                padding: `0.01px 0.01px ${sizes.paddingSmall}px 0.01px`,
                                              }}
                                            >
                                              <table
                                                cellPadding={0}
                                                cellSpacing={0}
                                                style={{
                                                  borderCollapse: 'collapse',
                                                  lineHeight: '14px',
                                                  fontSize: sizes.textSmall,
                                                  fontFamily: fonts.body,
                                                }}
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style={{
                                                        padding: '0.01px',
                                                        fontFamily: fonts.body,
                                                        fontSize: sizes.textSmall,
                                                        color: colors.smallText,
                                                      }}
                                                    >
                                                      <HtmlEmailLink
                                                        href={`tel:${props.phone.number}`}

                                                      >
                                                        {props.phone.number}
                                                      </HtmlEmailLink>
                                                      {props.phone.usedForWechat ? ` ${tr.wechat}` : null}
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                            <td
                                              style={{
                                                lineHeight: '0%',
                                                padding: `0.01px 0.01px ${sizes.paddingSmall}px 0.01px`,
                                              }}
                                            ></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                )}
                                <tr>
                                  <td
                                    style={{
                                      padding: '0.01px',
                                    }}
                                  >
                                    <table
                                      cellPadding={0}
                                      cellSpacing={0}
                                      style={{
                                        borderCollapse: 'collapse',
                                      }}
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style={{
                                              lineHeight: '0%',
                                              padding: `0.01px 0.01px ${sizes.paddingSmall}px 0.01px`,
                                            }}
                                          >
                                            <table
                                              cellPadding={0}
                                              cellSpacing={0}
                                              style={{
                                                borderCollapse: 'collapse',
                                                lineHeight: '14px',
                                                fontSize: sizes.textSmall,
                                                fontFamily: fonts.body,
                                              }}
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style={{
                                                      padding: '0.01px',
                                                      colorScheme: 'light only',
                                                      fontFamily: fonts.body,
                                                      fontSize: sizes.textSmall,
                                                    }}
                                                  >
                                                    <HtmlEmailLink href={`mailto:${props.email}`}>
                                                      {props.email}
                                                    </HtmlEmailLink>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              cellPadding={0}
              cellSpacing={0}
              /* @ts-ignore */
              border={0}
              style={{ maxWidth: '600px', width: '100%' }}
            >
              <tbody>
                <tr>
                  <td style={{ lineHeight: 0 }} />
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
