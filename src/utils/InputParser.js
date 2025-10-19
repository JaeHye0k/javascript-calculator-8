class InputParser {
  static parse(input) {
    const normalized = input.trim() === "" ? "0" : input;
    const [_, rawCustomDelimiter, rawNumbers] =
      normalized.match(/(^\/\/.*\\n)?(.*)/);
    return [rawCustomDelimiter, rawNumbers];
  }
}

export default InputParser;
