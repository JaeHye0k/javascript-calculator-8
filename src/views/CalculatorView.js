import { Console } from "@woowacourse/mission-utils";

class CalculatorView {
  static INPUT_PREFIX = "덧셈할 문자열을 입력해 주세요.\n";
  static OUTPUT_PREFIX = "결과 : ";

  static async input() {
    const input = await Console.readLineAsync(CalculatorView.INPUT_PREFIX);
    return input;
  }

  static print(output) {
    Console.print(CalculatorView.OUTPUT_PREFIX + output);
  }
}

export default CalculatorView;
