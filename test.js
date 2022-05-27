import { genBase64, decodeBase64 } from "./index.js";

const code = genBase64("汉字");
console.log("code", code);

const decodeRes = decodeBase64(code);
console.log("decodeRes", decodeRes);
