import CryptoJS from "crypto-js";

// Use a secret key from .env or fallback
const SECRET_KEY = process.env.REACT_APP_ENCRYPTION_KEY || "mySecretKey123";

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};



export const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  // If not JSON, return raw text
  try {
    return JSON.parse(decrypted);
  } catch (err) {
    return decrypted; // return plain string
  }
};
