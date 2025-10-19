import CalculatorController from "./controllers/CalculatorController.js";
import CalculatorView from "./views/CalculatorView.js";

class App {
  async run() {
    const input = await CalculatorView.input();

    const output = CalculatorController.sum(input);

    CalculatorView.print(output);
  }
}

export default App;
