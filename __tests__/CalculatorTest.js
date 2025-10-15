import Calculator from "../src/Calculator";
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

  describe("커스텀 구분자 추출 기능", () => {
    test("커스텀 구분자 기호(//\n)를 벗겨 구분자만 반환한다.", () => {});
    test("구분자가 없을 경우 에러를 발생시킨다.", () => {});
    test("구분자가 여러 문자(abc)인 경우 통째로 하나의 구분자로 취급한다.", () => {});
    test("커스텀 구분자가 없다면 null을 반환한다.", () => {});
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
