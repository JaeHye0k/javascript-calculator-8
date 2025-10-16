import { Console } from "@woowacourse/mission-utils";
import { ERROR_MESSAGES } from "./constants/error.js";

class Calculator {
  constructor() {
    this.inputPrefix = "덧셈할 문자열을 입력해 주세요.\n";
    this.outputPrefix = "결과 : ";
    this.delimiters = [",", ":"];
  }

  async input() {
    const input = await Console.readLineAsync(this.inputPrefix);
    return input;
  }

  extractCustomDelimiter(input) {
    const delimiter = input.match(/^\/\/(.*)\\n/);
    if (delimiter === null) return null;
    if (delimiter[1] === "") throw Error(ERROR_MESSAGES.EMPTY_CUSTOM_DELIMITER);
    return delimiter[1];
  }
}

export default Calculator;
