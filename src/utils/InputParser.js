class InputParser {
  static DEFAULT_DELIMITERS = [",", ":"];

  static parse(input) {
    const normalized = input.trim() === "" ? "0" : input;
    const [_, rawCustomDelimiter, rawNumbers] =
      normalized.match(/(^\/\/.*\\n)?(.*)/);
    return [rawCustomDelimiter, rawNumbers];
  }

  static extractDelimiter(rawCustomDelimiter) {
    if (!rawCustomDelimiter) return [];

    const rawDelimiters = rawCustomDelimiter.match(/(\/\/.*?\\n)/g) ?? [];
    return rawDelimiters.map((rawDelimiter) => {
      const { delimiter } = rawDelimiter.match(
        /\/\/(?<delimiter>.*)\\n/
      ).groups;
      return delimiter;
    });
  }

  static extractNumbers(numberString, customDelimiters = []) {
    const delimiters = [...customDelimiters, ...InputParser.DEFAULT_DELIMITERS];
    delimiters.sort((a, b) => b.length - a.length);
    const splited = numberString.split(RegExp(delimiters.join("|")));
    const numbers = splited.map((number) => {
      return Number(number) > Number.MAX_SAFE_INTEGER
        ? BigInt(number)
        : Number(number);
    });
    return numbers;
  }
}

export default InputParser;
