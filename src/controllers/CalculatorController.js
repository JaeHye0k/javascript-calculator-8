import CalculatorModel from "../models/CalculatorModel.js";
import InputParser from "../utils/InputParser.js";
import OutputFormatter from "../utils/OutputFormatter.js";

class CalculatorController {
  static sum(input) {
    const calc = new CalculatorModel();
    const [rawCustomDelimiter, rawNumbers] = InputParser.parse(input);

    let customDelimiters;
    if (rawCustomDelimiter) {
      customDelimiters = calc.extractCustomDelimiter(rawCustomDelimiter);
      customDelimiters = calc.validateCustomDelimiter(customDelimiters);
    }

    let numbers;
    numbers = calc.extractNumbers(rawNumbers, customDelimiters);
    numbers = calc.validateNumbers(numbers);

    const { int, decimal } = calc.sum(numbers);
    const output = OutputFormatter.format(int, decimal);

    return output;
  }
}

export default CalculatorController;
