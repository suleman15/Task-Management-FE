import Cryptr from "cryptr";
import { CYPRES_SECRET } from "../config/envManager.js";

const cryptr = new Cryptr(CYPRES_SECRET);

export const encrptUsingCypres = async (encrpt) => {
  const encryptedString = cryptr.encrypt(String(encrpt));
  return encryptedString;
};

export const decrptUsingCypres = async (decrypt) => {
  const decryptedString = cryptr.decrypt(decrypt);
  return decryptedString;
};
