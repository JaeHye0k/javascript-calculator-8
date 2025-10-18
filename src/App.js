import Calculator from "./Calculator.js";

class App {
  async run() {
    const calc = new Calculator();
    const input = await calc.input();
    const [rawCustomDelimiter, rawNumbers] = calc.splitInput(input);

    let customDelimiters;
    if (rawCustomDelimiter) {
      customDelimiters = calc.extractCustomDelimiter(rawCustomDelimiter);
      customDelimiters = calc.validateCustomDelimiter(customDelimiters);
    }

    let numbers;
    numbers = calc.extractNumbers(rawNumbers);
    numbers = calc.validateNumbers(numbers);

    const result = calc.sum(numbers);

    calc.print(result);
  }
}

export default App;
