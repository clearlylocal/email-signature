import { FC } from 'react'
import { colors, fonts } from '../styles/constants'
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
                      padding: '0.01px 14px 0.01px 0.01px',
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
                              padding: '6px 0.01px 0.01px 0.01px',
                              fontSize: '15.6px',
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
                      fontSize: '1pt',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    style={{
                      padding: '0.01px 14px 0.01px 14px',
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
                                  fontSize: '15.6px',
                                }}
                              >
                                <img width={150} src={toAssetPath(tr.logoFull)} alt='' />
                              </span>
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{
                              lineHeight: '1.2',
                              padding: '0.01px 0.01px 12px 0.01px',
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
                                  fontSize: '15.6px',
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: safelyWrapCjk([props.name[currentLang], props.name[altLang]].filter(Boolean).join(' '))
                                }}
                              />
                            </span>
                            <br />
                            <span
                              style={{
                                fontSize: '13.2px',
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
                                                padding: '0.01px 0.01px 6px 0.01px',
                                              }}
                                            >
                                              <table
                                                cellPadding={0}
                                                cellSpacing={0}
                                                style={{
                                                  borderCollapse: 'collapse',
                                                  lineHeight: '14px',
                                                  fontSize: '12px',
                                                  fontFamily: fonts.body,
                                                }}
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style={{
                                                        padding: '0.01px',
                                                        fontFamily: fonts.body,
                                                        fontSize: '12px',
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
                                                padding: '0.01px 0.01px 6px 0.01px',
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
                                              padding: '0.01px 0.01px 6px 0.01px',
                                            }}
                                          >
                                            <table
                                              cellPadding={0}
                                              cellSpacing={0}
                                              style={{
                                                borderCollapse: 'collapse',
                                                lineHeight: '14px',
                                                fontSize: '12px',
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
                                                      fontSize: '12px',
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
