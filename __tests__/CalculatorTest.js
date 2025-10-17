import Calculator from "../src/Calculator";
import { ERROR_MESSAGES } from "../src/constants/error";
import { mockQuestions } from "./ApplicationTest";

describe("Caculator", () => {
  const calc = new Calculator();

  describe.only("입력 기능", () => {
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

  describe.only("분리", () => {
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

  describe.only("커스텀 구분자 추출", () => {
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

  describe.only("커스텀 구분자 검증", () => {
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

  describe("숫자 추출 기능", () => {
    test("입력값에서 기본 구분자를 기준으로 숫자를 분리해 반환한다.", () => {});
    test("커스텀 구분자가 존재할 경우 기본 구분자 대신 커스텀 구분자를 사용한다.", () => {});
    test("구분자, 숫자를 제외한 문자를 포함할 경우 에러를 발생시킨다.", () => {});
    test("연속해서 두 개의 구분자가 올 경우 에러를 발생시킨다", () => {});
    test("입력값이 음수인 경우도 정상적으로 처리한다", () => {});
    test("숫자 문자열을 BigInt 자료형으로 변환한다", () => {});
    test("소수는 숫자로 처리하지 않는다.", () => {});
  });

  describe("숫자 합산 기능", () => {
    test("배열의 모든 숫자를 더한다", () => {});

    test("더할 숫자가 없을 경우 0을 반환한다.", () => {});
  });
  describe("예외 처리 기능", () => {});
  describe("출력 기능", () => {
    test("합산한 숫자를 `Console.print()`를 사용해 출력한다.", () => {});
  });
});
