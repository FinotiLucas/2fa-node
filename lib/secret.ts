import QRCode from 'qrcode'
import { authenticator } from 'otplib'
import { Options } from './interfaces.js'
import type { OTPType } from './types.js'

/**
 * Generates a secret key for two-factor authentication (TOTP or HOTP), along with a URI and a QR code for easy integration with an authenticator app.
 *
 * @param {Options} options - The options for generating the secret key.
 * @param {string} options.name - The name of the application or service (displayed in the authenticator app).
 * @param {string} options.account - The account identifier (e.g., email or username) associated with the user.
 * @param {number} [options.counter] - The counter value, required only for HOTP. Defaults to `0` if not provided and the type is "HOTP".
 * @param {OTPType} [type="TOTP"] - The type of OTP to generate. Defaults to "TOTP" (Time-based OTP). Use "HOTP" for counter-based OTP.
 *
 * @returns {Promise<{ secret: string, uri: string, qr: string }>} - A Promise that resolves to an object containing:
 *    - `secret` (string): The generated secret key for OTP.
 *    - `uri` (string): The otpauth URI containing the secret and configuration details.
 *    - `qr` (string): A Data URL representing the QR code that can be scanned by an authenticator app.
 *
 * @example
 * // Generating a time-based (TOTP) secret:
 * const options = { name: 'MyApp', account: 'user@example.com' };
 *
 * generateSecret(options).then(result => {
 *   console.log(result.secret); // The generated secret key
 *   console.log(result.uri);    // The otpauth URI
 *   console.log(result.qr);     // The Data URL for the QR code
 * });
 *
 * @example
 * // Generating a counter-based (HOTP) secret:
 * const options = { name: 'MyApp', account: 'user@example.com', counter: 1 };
 *
 * generateSecret(options, 'HOTP').then(result => {
 *   console.log(result.secret); // The generated secret key
 *   console.log(result.uri);    // The otpauth URI for HOTP
 *   console.log(result.qr);     // The Data URL for the QR code
 * });
 */


export async function generateSecret(
  options: Options,
  type: OTPType = 'TOTP'
): Promise<{
  secret: string
  uri: string
  qr: string
}> {
  const config = {
    name: encodeURIComponent(options?.name ?? 'App'),
    account: options.account ? encodeURIComponent(`:${options.account}`) : '',
    count: type === 'HOTP' ? (options.counter ?? 0).toString() : undefined,
  } as const

  const secret = authenticator.generateSecret(20)

  const uri =
    type === 'TOTP'
      ? new URL(`otpauth://totp/${config.name}${config.account}`)
      : new URL(`otpauth://hotp/${config.name}${config.account}`)

  const params: Record<string, string> = {
    secret,
    name: config.name,
  }

  if (type === 'HOTP' && config.count) {
    params.counter = config.count
  }

  uri.search = new URLSearchParams(params).toString()

  return {
    secret,
    uri: uri.href,
    qr: await QRCode.toDataURL(uri.href),
  }
}
