import QRCode from 'qrcode'
import { authenticator } from 'otplib'

export interface Options {
  name: string
  account: string
}

/**
 * Generates a secret key for two-factor authentication (TOTP), along with a URI and a QR code for easy integration with an authenticator app.
 *
 * @param {Options} options - The options for generating the secret.
 * @param {string} options.name - The name of the application or service (displayed in the authenticator app).
 * @param {string} options.account - The account identifier (e.g., email or username) associated with the user.
 *
 * @returns {Promise<{ secret: string, uri: string, qr: string }>} - A Promise that resolves to an object containing:
 *    - `secret`: The generated secret key for TOTP.
 *    - `uri`: The otpauth URI containing the secret and configuration details.
 *    - `qr`: A Data URL representing the QR code that can be scanned by an authenticator app.
 *
 * @example
 * const options = { name: 'MyApp', account: 'user@example.com' };
 *
 * generateSecret(options).then(result => {
 *   console.log(result.secret); // The generated secret key
 *   console.log(result.uri);    // The otpauth URI
 *   console.log(result.qr);     // The Data URL for the QR code
 * });
 */
export async function generateSecret(options: Options): Promise<{
  secret: string
  uri: string
  qr: string
}> {
  const config = {
    name: encodeURIComponent(options?.name ?? 'App'),
    account: encodeURIComponent(options?.account ? `:${options.account}` : ''),
  } as const

  const secret = authenticator.generateSecret(20)

  const uri = new URL(`otpauth://totp/${config.name}${config.account}`)

  uri.search = new URLSearchParams({
    secret: secret,
    name: config.name,
  }).toString()

  return {
    secret,
    uri: uri.href,
    qr: await QRCode.toDataURL(uri.href),
  }
}
