import { generateSignature } from "./generateSignature";

interface IVerifyOptions {
  token: string;
  secret: string;
}

export function verify({ token, secret }: IVerifyOptions) {
  let isValid = true;

  const [headerSent, payloadSent, signatureSent] = token.split(".");

  const signature = generateSignature({
    header: headerSent,
    payload: payloadSent,
    secret: secret,
  });

  isValid = signature === signatureSent;

  if (!isValid)
    return {
      payload: null,
      isValid,
    };

  const decodedPayload = JSON.parse(
    Buffer.from(payloadSent, "base64url").toString("utf-8")
  );

  isValid = decodedPayload.exp >= Date.now();

  return {
    payload: isValid ? decodedPayload : null,
    isValid,
  };
}
