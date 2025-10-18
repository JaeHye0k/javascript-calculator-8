import Calculator from "../src/Calculator";
import { ERROR_MESSAGES } from "../src/constants/error";
import { PREFIX } from "../src/constants/prefix";
import { getLogSpy, mockQuestions } from "./ApplicationTest";

describe("Caculator", () => {
  const calc = new Calculator();

  describe("입력 기능", () => {
    test("사용자로부터 값을 입력받아 반환한다", async () => {
      // given: 입력값이 주어짐
      const inputs = ["1,2,3", "//;\\n1;2;3"];
      mockQuestions(inputs);
      const expected = ["1,2,3", "//;\\n1;2;3"];

      // when: input 메서드 호출
      const results = await Promise.all([calc.input(), calc.input()]);

      // then: 입력값이 그대로 반환
      results.forEach((result, i) => {
        expect(result).toBe(expected[i]);
      });
    });

    test("입력값이 빈 문자열일 경우 0을 반환한다.", async () => {
      // given: 빈 입력값이 주어짐
      const inputs = ["", "   "];
      mockQuestions(inputs);
      const expected = ["0", "0"];

      // when: input 메서드 호출
      const results = await Promise.all([calc.input(), calc.input()]);

      // then: 입력값이 그대로 반환
      results.forEach((result, i) => {
        expect(result).toBe(expected[i]);
      });
    });
  });

  describe("분리", () => {
    test("커스텀 구분자 영역과 숫자 영역을 분리한다", () => {
      // given: 커스텀 구분자가 설정된 입력 원문이 주어짐
      const input = ["//-\\n1-2-3", "//;;\\n//-\\n1;;2-3"];
      const expected = [
        ["//-\\n", "1-2-3"],
        ["//;;\\n//-\\n", "1;;2-3"],
      ];

      // when: 분리 시
      const results = input.map(calc.splitInput);

      // then: 커스텀 구분자 영역과, 숫자 영역으로 분리
      results.forEach((result, i) => {
        expect(result[0]).toBe(expected[i][0]);
        expect(result[1]).toBe(expected[i][1]);
      });
    });

    test("커스텀 구분자를 설정하지 않을 경우 커스텀 구분자 영역은 undefined가 된다", () => {
      // given: 커스텀 구분자가 설정되지 않은 입력 원문이 주어짐
      const input = "1,2,3";
      const expected = "1,2,3";

      // when: 분리 시
      const result = calc.splitInput(input);

      // then: undefined 와 숫자 영역으로 분리
      expect(result[0]).toBeUndefined();
      expect(result[1]).toBe(expected);
    });
  });

  describe("커스텀 구분자 추출", () => {
    test("커스텀 구분자 기호(//\\n)를 벗겨 구분자만 반환한다", () => {
      // given: 입력값이 주어짐 (커스텀 구분자 포함)
      const customDelimiters = ["//;\\n", "//  \\n", "//\\n"];
      const expected = [[";"], ["  "], [""]];

      // when: 커스텀 구분자 추출 시
      const results = customDelimiters.map((customDelimiter) =>
        calc.extractCustomDelimiter(customDelimiter)
      );

      // then: 구분자만 반환
      expected.forEach((e, i) => {
        expect(results[i]).toEqual(expect.arrayContaining(e));
      });
    });

    test("커스텀 구분자 선언 기호가 2개 이상인 경우, 각각의 커스텀 구분자를 유효한 구분자로 취급한다", () => {
      // given: 2개 이상의 커스텀 구분자 선언
      const customDelimiter = "//-\\n//_\\n";
      const expected = ["-", "_"];

      // when: 커스텀 구분자 추출 시
      const result = calc.extractCustomDelimiter(customDelimiter);

      // then: 두 개의 구분자 모두 반환
      expect(result).toEqual(expect.arrayContaining(expected));
    });
  });

  describe("커스텀 구분자 검증", () => {
    test("구분자가 빈 문자열일 경우, 에러가 발생한다", () => {
      // given: 커스텀 구분자에 빈 문자열이 포함되어 있음
      const customDelimiters = [""];

      // when: 커스텀 구분자 검증 시
      // then: 에러 발생
      expect(() => calc.validateCustomDelimiter(customDelimiters)).toThrow(
        ERROR_MESSAGES.EMPTY_CUSTOM_DELIMITER
      );
    });

    test("커스텀 구분자가 온점('.')이면 에러가 발생한다", () => {
      // given: 커스텀 구분자에 '.'이 포함되어있음
      const customDelimiters = ["."];

      // when: 커스텀 구붅자 검증 시
      // then: 에러 발생
      expect(() => calc.validateCustomDelimiter(customDelimiters)).toThrow(
        ERROR_MESSAGES.CUSTOM_DELIMITER_INCLUDES_DOT
      );
    });

    test("커스텀 구분자에 숫자가 포함되어있을 경우, 에러가 발생한다", () => {
      // given: 커스텀 구분자 숫자가 포함되어있음
      const customDelimiters = ["1"];

      // when: 커스텀 구분자 검증 시
      // then: 에러 발생
      expect(() => calc.validateCustomDelimiter(customDelimiters)).toThrow(
        ERROR_MESSAGES.CUSTOM_DELIMITER_INCLUDES_NUMBER
      );
    });

    test("한글, 이모지도 커스텀 문자로 사용할 수 있다", () => {
      // given: 커스텀 구분자에 한글, 이모지가 포함되어있음
      const customDelimiters = ["a", "가", "😂"];
      const expected = ["a", "가", "😂"];

      // when: 커스텀 구분자 검증 시
      const results = calc.validateCustomDelimiter(customDelimiters);

      // then: 입력된 커스텀 구분자 그대로 반환
      results.forEach((result, i) => {
        expect(result).toBe(expected[i]);
      });
    });
  });

  describe("숫자 추출", () => {
    test("숫자 영역에서 구분자를 기준으로 숫자를 분리한다", () => {
      // given: 커스텀 구분자와 숫자 문자열이 주어짐
      const customDelimiters = [
        ["-", "/"],
        ["-", "--"],
      ];
      const numbers = ["1,2:3-4/5", "1--2-3"];
      const expected = [
        [1, 2, 3, 4, 5],
        [1, 2, 3],
      ];

      // when: 숫자 추출 시
      const results = numbers.map((number, i) =>
        calc.extractNumbers(number, customDelimiters[i])
      );

      // then: 분리된 숫자 반환
      expect(results).toEqual(expected);
    });

    test("Number.MAX_SAFE_INTGER를 초과하는 수는 BigInt로 변환한다", () => {
      // given: Number.MAX_SAFE_INTEGER를 초과하는 숫자가 포함된 숫자 문자열이 주어짐
      const numberString = "9007199254740992,9007199254740991,1";
      const expected = [9007199254740992n, 9007199254740991, 1];

      // when: 숫자 추출 시
      const result = calc.extractNumbers(numberString);

      // then: BigInt와 Number 숫자 배열 반환
      expect(result).toEqual(expected);
    });
  });

  describe("숫자 검증", () => {
    test("숫자 이외의 타입인 요소가 포함되어 있을 경우 에러가 발생한다", () => {
      // given: 숫자 이외의 타입이인 요소가 포함되어 주어짐
      const numbers = [
        [NaN, 1],
        [Infinity, 1],
      ];

      // when: 숫자 검증 시
      // then: 에러 발생
      numbers.forEach((number) => {
        expect(() => calc.validateNumbers(number)).toThrow(
          ERROR_MESSAGES.INCLUDES_NAN
        );
      });
    });
  });

  describe("숫자 합산", () => {
    test("배열의 모든 숫자를 더한다", () => {
      // given: 숫자 배열이 주어짐
      const numbers = [1, 2, 3];
      const expected = {
        int: 6n,
        decimal: 0,
      };

      // when: 합산 시
      const result = calc.sum(numbers);

      // then: 합 반환
      expect(result).toEqual(expected);
    });

    test("부동소수점 오차 없는 소수 계산을 한다", () => {
      // given: 2진수로 변환했을 때 순환 소수가 되는 수를 포함한 소수가 주어짐
      const numbers = [0.1, 0.2];
      const expected = {
        int: 0n,
        decimal: 0.3,
      };

      // when: 합산 시
      const result = calc.sum(numbers);

      // then: 정확히 계산됨
      expect(result).toEqual(expected);
    });

    test("MAX_SAFE_INTEGER를 초과하는 숫자도 정확히 계산한다", () => {
      // given: MAX_SAFE_INTEGER를 초과하는 수, 소수가 함께 주어짐
      const numbers = [9007199254740992n, 1, 0.1, 0.2];
      const expected = {
        int: 9007199254740993n,
        decimal: 0.3,
      };

      // when: 합산 시
      const result = calc.sum(numbers);

      // then: 정수부, 소수부 모두 올바른 결과 출력
      expect(result).toEqual(expected);
    });
  });

  describe("출력 기능", () => {
    test("합산한 숫자를 `Console.print()`를 사용해 출력한다", () => {
      // given: 정수부와 소수부로 구분된 숫자가 주어짐
      const result = {
        int: 9007199254740993n,
        decimal: 0.3,
      };
      const expected = PREFIX.OUTPUT + "9007199254740993.3";
      const logSpy = getLogSpy();

      // when: 출력 시
      calc.print(result);

      // then: 정수부와 소수부가 합쳐져 출력됨
      expect(logSpy).toHaveBeenCalledWith(expected);
    });
  });
});
