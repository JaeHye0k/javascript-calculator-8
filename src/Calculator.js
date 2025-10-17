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
    if (input.trim() === "") return "0";
    return input;
  }

  splitInput(input) {
    const [_, delimiter, numbers] = input.match(/(^\/\/.*\\n)?(.*)/);
    return [delimiter, numbers];
  }

  extractCustomDelimiter(customDelimiter) {
    const rawDelimiters = customDelimiter.match(/(\/\/.*?\\n)/g);
    const delimiters = rawDelimiters.map((rawDelimiter) => {
      const { delimiter } = rawDelimiter.match(
        /\/\/(?<delimiter>.*)\\n/
      ).groups;
      return delimiter;
    });
    return delimiters;
  }
}

export default Calculator;
