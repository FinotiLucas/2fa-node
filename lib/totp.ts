import { authenticator } from 'otplib'

/**
 * Generates a time-based one-time password (TOTP) token based on the provided secret.
 *
 * @param {string} secret - The secret key used for generating the TOTP token.
 *
 * @returns {Object | null} - An object containing the generated token:
 *   - `token`: The generated TOTP token.
 *   If the secret is invalid or missing, returns `null`.
 *
 * @example
 * const secret = 'JBSWY3DPEHPK3PXP'; // Your pre-generated secret
 * const result = generateToken(secret);
 * console.log(result.token); // The generated token
 */
export function generateToken(secret: string): { token: string } | null {
  if (!secret || !secret.length) return null

  const token = authenticator.generate(secret)

  return { token: token }
}

/**
 * Verifies if a provided TOTP token is valid for the given secret.
 *
 * @param {string} secret - The secret key associated with the TOTP token.
 * @param {string} [token] - The TOTP token to verify.
 * @param {number | [number, number]} [window = 4] - Tokens in the previous and future x-windows that should be considered valid. If integer, same value will be used for both. Alternatively, define array: [past, future]
 *
 * @returns {boolean|null} - Returns `true` if the token is valid, `false` if it's invalid, or `null` if the token is missing.
 *
 * @example
 * const secret = 'JBSWY3DPEHPK3PXP'; // The secret key used for verification
 * const token = '123456'; // The token to verify
 * const isValid = verifyToken(secret, token);
 * console.log(isValid); // true if valid, false if invalid
 */
export function verifyToken(secret: string, token?: string, window: number | [number, number] = 4): boolean | null {
  if (!token || !token.length) return null

  authenticator.options = {
    window: window
  }

  return authenticator.check( token, secret )
}
