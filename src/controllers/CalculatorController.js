import CalculatorModel from "../models/CalculatorModel.js";

class CalculatorController {
  static sum(input) {
    const calc = new CalculatorModel();
    const [rawCustomDelimiter, rawNumbers] =
      CalculatorController.parseInput(input);

    let customDelimiters;
    if (rawCustomDelimiter) {
      customDelimiters = calc.extractCustomDelimiter(rawCustomDelimiter);
      customDelimiters = calc.validateCustomDelimiter(customDelimiters);
    }

    let numbers;
    numbers = calc.extractNumbers(rawNumbers);
    numbers = calc.validateNumbers(numbers);

    const { int, decimal } = calc.sum(numbers);
    const output = CalculatorController.parseOutput(int, decimal);

    return output;
  }

  static parseInput(input) {
    const [_, rawCustomDelimiter, rawNumbers] =
      input.match(/(^\/\/.*\\n)?(.*)/);
    return [rawCustomDelimiter, rawNumbers];
  }

  static parseOutput(int, decimal) {
    const output =
      decimal > 0 ? `${int}.${decimal.toString().split(".")[1]}` : `${int}`;
    return output;
  }
}

export default CalculatorController;
