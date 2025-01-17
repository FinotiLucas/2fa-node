export const OTPTypeEnum = {
  TOTP : 'TOTP',
  HOTP : 'HOTP'
} as const

export type Strategy = keyof typeof OTPTypeEnum
