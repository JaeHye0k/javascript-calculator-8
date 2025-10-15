import Calculator from "./Calculator.js";

class App {
  run() {
    const calc = new Calculator();
    const input = calc.input();
    const delimiter = calc.extractCustomDelimiter(input);
  }
}

export default App;
