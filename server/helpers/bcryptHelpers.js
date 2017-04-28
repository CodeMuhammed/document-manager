import bCrypt from 'bcrypt-nodejs';

/**
 * This helper function checks a non-salted pasword against its salt
 */
const isValid = (passwordStr, passwordSalted) =>
                bCrypt.compareSync(passwordStr, passwordSalted);

/**
 * This helper creates a salt from a password string
 */
const createHash = passwordStr => bCrypt.hashSync(passwordStr, null, null);

// Export functions.
export default {
  isValid,
  createHash,
};
