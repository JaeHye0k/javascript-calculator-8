export function isEmptyString(string) {
  return string === "";
}

export function isIncludesDot(string) {
  return string.includes(".");
}

export function isNumberString(string) {
  return /\d+/.test(string);
}
