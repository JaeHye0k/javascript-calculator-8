import { Console } from "@woowacourse/mission-utils";

class CalculatorView {
  static INPUT_PREFIX = "덧셈할 문자열을 입력해 주세요.\n";
  static OUTPUT_PREFIX = "결과 : ";

  static async input() {
    const input = await Console.readLineAsync(CalculatorView.INPUT_PREFIX);
    if (input.trim() === "") return "0";
    return input;
  }

  static splitInput(input) {
    const [_, delimiter, numbers] = input.match(/(^\/\/.*\\n)?(.*)/);
    return [delimiter, numbers];
  }

  static print(result) {
    const { int, decimal } = result;

    const output =
      decimal > 0 ? `${int}.${decimal.toString().split(".")[1]}` : `${int}`;
    Console.print(CalculatorView.OUTPUT_PREFIX + output);
  }
}

export default CalculatorView;
