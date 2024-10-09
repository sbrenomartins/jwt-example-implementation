import { sign } from "./jwt/sign";
import { verify } from "./jwt/verify";

const token = sign({
  data: {
    sub: "@brenomartins.dev",
  },
  exp: Date.now() + 24 * 60 * 60 * 1000,
  secret: "123",
});

const response = verify({
  secret: "123",
  token,
});

console.log({ response });
