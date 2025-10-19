import CalculatorModel from "./models/CalculatorModel.js";
import CalculatorView from "./views/CalculatorView.js";

class App {
  async run() {
    const calc = new CalculatorModel();
    const input = await CalculatorView.input();
    const [rawCustomDelimiter, rawNumbers] = CalculatorView.splitInput(input);

    let customDelimiters;
    if (rawCustomDelimiter) {
      customDelimiters = calc.extractCustomDelimiter(rawCustomDelimiter);
      customDelimiters = calc.validateCustomDelimiter(customDelimiters);
    }

    let numbers;
    numbers = calc.extractNumbers(rawNumbers);
    numbers = calc.validateNumbers(numbers);

    const result = calc.sum(numbers);

    CalculatorView.print(result);
  }
}

export default App;
