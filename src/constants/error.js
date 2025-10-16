const ERROR_PREFIX = "[ERROR]";

function setPrefix(message) {
  return `${ERROR_PREFIX} ${message}`;
}

export const ERROR_MESSAGES = Object.freeze({
  EMPTY_CUSTOM_DELIMITER: setPrefix("커스텀 구분자는 빈 문자열일 수 없습니다"),
});
