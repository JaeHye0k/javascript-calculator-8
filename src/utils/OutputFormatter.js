class OutputFormatter {
  static format(int, decimal) {
    const output =
      decimal > 0 ? `${int}.${decimal.toString().split(".")[1]}` : `${int}`;
    return output;
  }
}

export default OutputFormatter;
