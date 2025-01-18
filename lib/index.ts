import { generateToken, verifyToken } from "./totp.js";
import { generateHOTPToken, verifyHOTPToken } from "./hotp.js";
import { generateSecret } from "./secret.js";

export {
  generateToken,
  verifyToken,
  generateHOTPToken,
  verifyHOTPToken,
  generateSecret,
};
