import { createHash } from "crypto";

const salt = "!IQX8q'y%Sl^lqn";

export const compareToHash = (hash: string, answer: string) => {
  const hashedAnswer = generateHash(answer);
  return hash === hashedAnswer;
};

export const generateHash = (str: string) => {
  return createHash("sha256")
    .update(str)
    .update(createHash("sha256").update(salt, "utf8").digest("hex"))
    .digest("hex");
}
