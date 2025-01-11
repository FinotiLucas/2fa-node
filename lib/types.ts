export const OTPTypeEnum = {
  TOTP : 'TOTP',
  HOTP : 'HOTP'
} as const

export type OTPType = keyof typeof OTPTypeEnum
