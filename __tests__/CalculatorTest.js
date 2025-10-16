import Calculator from "../src/Calculator";
import { ERROR_MESSAGES } from "../src/constants/error";
import { mockQuestions } from "./ApplicationTest";

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

  describe("커스텀 구분자 추출 기능", () => {
    test("커스텀 구분자 기호(//\\n)를 벗겨 구분자만 반환한다.", () => {
      // given: 입력값이 주어짐 (커스텀 구분자 포함)
      const inputs = ["//;\\n1;2;3", "//  \\n1  2  3"];
      const expected = [";", "  "];
      mockQuestions(inputs);
      jest.spyOn(calc, "extractCustomDelimiter");

      // when: 커스텀 구분자 추출 메서드 호출
      inputs.forEach((input) => {
        calc.extractCustomDelimiter(input);
      });

      // then: 구분자만 반환
      expected.forEach((e, i) => {
        expect(calc.extractCustomDelimiter).toHaveNthReturnedWith(i + 1, e);
      });
    });

    test("구분자가 빈 문자열일 경우, 에러가 발생한다", () => {
      // given: 커스텀 구분자가 비어있음
      const input = "//\\n1,2,3";

      // when: 커스텀 구분자 추출 메서드 호출
      // then: 에러 발생
      expect(() => calc.extractCustomDelimiter(input)).toThrow(
        ERROR_MESSAGES.EMPTY_CUSTOM_DELIMITER
      );
    });

    test.only("커스텀 구분자를 설정하지 않았다면 null을 반환한다", () => {
      // given: 입력값이 주어짐 (커스텀 구분자 없음)
      const input = "1,2,3";
      const expected = null;

      // when: 커스텀 구분자 추출 메서드 호출
      const result = calc.extractCustomDelimiter(input);

      // then: null 반환
      expect(result).toBe(expected);
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
