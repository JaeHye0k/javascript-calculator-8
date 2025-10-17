const ERROR_PREFIX = "[ERROR]";

function setPrefix(message) {
  return `${ERROR_PREFIX} ${message}`;
}

export const ERROR_MESSAGES = Object.freeze({
  EMPTY_CUSTOM_DELIMITER: setPrefix("커스텀 구분자는 빈 문자열일 수 없습니다"),
  CUSTOM_DELIMITER_INCLUDES_DOT: setPrefix(
    "커스텀 구분자는 온점('.')을 포함할 수 없습니다. (소숫점과 혼동)"
  ),
  CUSTOM_DELIMITER_INCLUDES_NUMBER: setPrefix(
    "커스텀 구분자는 숫자를 포함할 수 없습니다."
  ),
});
