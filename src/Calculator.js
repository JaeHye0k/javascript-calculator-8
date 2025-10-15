import { Console } from "@woowacourse/mission-utils";

class Calculator {
  constructor() {
    this.inputPrefix = "덧셈할 문자열을 입력해 주세요.\n";
    this.outputPrefix = "결과 : ";
  }

  async input() {
    const input = await Console.readLineAsync(this.inputPrefix);
    return input;
  }
}

export default Calculator;
