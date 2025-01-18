import { hotp } from "otplib";

/**
 * Generates a HMAC-based one-time password (HOTP) token based on the provided secret and counter.
 *
 * @param {string} secret - The secret key used for generating the HOTP token.
 * @param {number} [counter=0] - The counter value used to generate the HOTP token. Defaults to 0 if not provided.
 *
 * @returns {Object|null} - An object containing the generated token:
 *   - `token`: The generated HOTP token.
 *   If the secret is invalid or missing, returns `null`.
 *
 * @example
 * const secret = 'JBSWY3DPEHPK3PXP'; // Your pre-generated secret
 * const counter = 1; // Optional counter (defaults to 0)
 * const result = generateHOTPToken(secret, counter);
 * console.log(result.token); // The generated HOTP token
 */
export function generateHOTPToken(
  secret: string,
  counter: number = 0,
): { token: string } | null {
  if (!secret || !secret.length) return null;
  const token = hotp.generate(secret, counter!);
  return { token: token };
}

/**
 * Verifies if a provided HOTP token is valid for the given secret and counter.
 *
 * @param {string} secret - The secret key associated with the HOTP token.
 * @param {string} [token] - The HOTP token to verify.
 * @param {number} [counter=0] - The counter value used to generate the HOTP token. Defaults to 0 if not provided.
 * @param {number | [number, number]} [window = 4] - Tokens in the previous and future x-windows that should be considered valid. If integer, same value will be used for both. Alternatively, define array: [past, future]
 *
 *
 * @returns {boolean|null} - Returns `true` if the token is valid, `false` if it's invalid, or `null` if the token is missing.
 *
 * @example
 * const secret = 'JBSWY3DPEHPK3PXP'; // The secret key used for verification
 * const token = '123456'; // The token to verify
 * const counter = 1; // The counter associated with the token
 * const isValid = verifyHOTPToken(secret, token, counter);
 * console.log(isValid); // true if valid, false if invalid
 */
export function verifyHOTPToken(
  secret: string,
  token?: string,
  counter: number = 0,
  window: number | [number, number] = 4,
): boolean | null {
  if (!token || !token.length) return null;

  hotp.options = {
    window: window,
  };

  return hotp.verify({ token, secret, counter: counter! });
}
