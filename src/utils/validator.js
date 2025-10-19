export function isEmptyString(string) {
  return string === "";
}

export function isIncludesDot(string) {
  return string.includes(".");
}

export function isNumberString(string) {
  return /\d+/.test(string);
}

export function isNumber(number) {
  if (Number.isNaN(number)) return false;
  if (!isFinite(number)) return false;
  if (typeof number === "number") return true;
  return false;
}

export function isBigInt(number) {
  return typeof number === "bigint";
}

export function isMinus(number) {
  return number < 0;
}

export function isFloat(number) {
  return Number(number) === number && number % 1 !== 0;
}

export function isEmpty(string) {
  return string.trim() === "";
}
