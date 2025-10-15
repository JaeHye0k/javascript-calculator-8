import { Console } from "@woowacourse/mission-utils";
import { ERROR } from "./errorMessages";

class Calculator {
  constructor() {
    this.inputPrefix = "덧셈할 문자열을 입력해 주세요.\n";
    this.outputPrefix = "결과 : ";
  }

  async input() {
    const input = await Console.readLineAsync(this.inputPrefix);
    return input;
  }

  extractCustomDelimiter(input) {
    const divisor = input.match(/^\/\/(.*)\\n/);
    if (divisor === null) return null;
    if (divisor[1] === "") throw Error(ERROR.EMPTY_CUSTOM_DELIMITER);
    return divisor[1];
  }
}

export default Calculator;
