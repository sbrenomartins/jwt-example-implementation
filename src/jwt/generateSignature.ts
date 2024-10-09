import { createHmac } from "node:crypto";

interface IGenerateSignature {
  secret: string;
  header: string;
  payload: string;
}

export function generateSignature({
  header,
  payload,
  secret,
}: IGenerateSignature) {
  const hmac = createHmac("sha256", secret);

  const signature = hmac.update(`${header}.${payload}`).digest("base64url");

  return signature;
}
