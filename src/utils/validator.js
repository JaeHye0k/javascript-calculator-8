export function isEmptyString(string) {
  return string === "";
}

export function isIncludesDot(string) {
  return string.includes(".");
}

export function isNumberString(string) {
  return /\d+/.test(string);
}

export function isValidNumber(number) {
  if (Number.isNaN(number)) return false;
  if (!isFinite(number)) return false;
  if (typeof number === "number") return true;
  if (typeof number === "bigint") return true;
  return false;
}
