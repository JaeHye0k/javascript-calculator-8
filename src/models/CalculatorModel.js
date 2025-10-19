import { ERROR_MESSAGES } from "../constants/error.js";
import {
  isEmptyString,
  isFloat,
  isIncludesDot,
  isNumberString,
  isNumber,
  isBigInt,
  isMinus,
} from "../utils/validator.js";

class CalculatorModel {
  validateCustomDelimiter(customDelimiters) {
    if (customDelimiters.some(isEmptyString)) {
      throw Error(ERROR_MESSAGES.EMPTY_CUSTOM_DELIMITER);
    }

    if (customDelimiters.some(isIncludesDot)) {
      throw Error(ERROR_MESSAGES.CUSTOM_DELIMITER_INCLUDES_DOT);
    }

    if (customDelimiters.some(isNumberString)) {
      throw Error(ERROR_MESSAGES.CUSTOM_DELIMITER_INCLUDES_NUMBER);
    }

    return customDelimiters;
  }

  validateNumbers(numbers) {
    if (numbers.some(isMinus)) throw Error(ERROR_MESSAGES.INCLUDES_MINUS);
    if (numbers.every((e) => isNumber(e) || isBigInt(e))) {
      return numbers;
    }
    throw Error(ERROR_MESSAGES.INCLUDES_NAN);
  }

  sum(numbers) {
    let decimalSum = 0;
    let bigintSum = 0n;

    numbers.forEach((number) => {
      if (isFloat(number)) decimalSum = this.add(decimalSum, number);
      else if (typeof number === "bigint" || typeof number === "number")
        bigintSum += BigInt(number);
    });

    return {
      int: bigintSum,
      decimal: decimalSum,
    };
  }

  add(a, b) {
    const aDecimal = (a.toString().split(".")[1] || "").length;
    const bDecimal = (b.toString().split(".")[1] || "").length;
    const maxDecimal = Math.max(aDecimal, bDecimal);

    const multiple = Math.pow(10, maxDecimal);

    return (a * multiple + b * multiple) / multiple;
  }
}

export default CalculatorModel;
