import InputParser from "../src/utils/InputParser";

describe("InputParser 테스트", () => {
  describe("입력값 파싱", () => {
    test("입력값에서 커스텀 구분자 영역과 숫자 영역을 분리한다", () => {
      // given: 비어있지 않은 입력값이 주어짐
      const inputs = ["1,2,3", "//;\\n1;2;3"];
      const expected = [
        [undefined, "1,2,3"],
        ["//;\\n", "1;2;3"],
      ];

      // when: parse 호출
      const results = inputs.map((input) => {
        return InputParser.parse(input);
      });

      // then: 커스텀 구분자와 입력값 분리
      expect(results).toEqual(expected);
    });

    test("입력값이 비어있을 경우 0을 반환한다 (공백 포함)", () => {
      // given: 빈 입력값이 주어짐
      const inputs = ["", "   "];
      const expected = [
        [undefined, "0"],
        [undefined, "0"],
      ];

      // when: parse 호출
      const results = inputs.map((input) => {
        return InputParser.parse(input);
      });

      // then: 0 반환
      expect(results).toEqual(expected);
    });
  });

  describe("커스텀 구분자 추출", () => {
    test("커스텀 구분자 기호(//\\n)를 벗겨 구분자만 반환한다", () => {
      // given: 입력값이 주어짐 (커스텀 구분자 포함)
      const customDelimiters = ["//;\\n", "//  \\n", "//\\n"];
      const expected = [[";"], ["  "], [""]];

      // when: 커스텀 구분자 추출 시
      const results = customDelimiters.map((customDelimiter) =>
        InputParser.extractDelimiter(customDelimiter)
      );

      // then: 구분자만 반환
      expect(results).toEqual(expected);
    });

    test("커스텀 구분자 선언 기호가 2개 이상인 경우, 각각의 커스텀 구분자를 유효한 구분자로 취급한다", () => {
      // given: 2개 이상의 커스텀 구분자 선언
      const customDelimiter = "//-\\n//_\\n";
      const expected = ["-", "_"];

      // when: 커스텀 구분자 추출 시
      const result = InputParser.extractDelimiter(customDelimiter);

      // then: 두 개의 구분자 모두 반환
      expect(result).toEqual(expected);
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
        InputParser.extractNumbers(number, customDelimiters[i])
      );

      // then: 분리된 숫자 반환
      expect(results).toEqual(expected);
    });

    test("Number.MAX_SAFE_INTGER를 초과하는 수는 BigInt로 변환한다", () => {
      // given: Number.MAX_SAFE_INTEGER를 초과하는 숫자가 포함된 숫자 문자열이 주어짐
      const numberString = "9007199254740992,9007199254740991,1";
      const expected = [9007199254740992n, 9007199254740991, 1];

      // when: 숫자 추출 시
      const result = InputParser.extractNumbers(numberString);

      // then: BigInt와 Number 숫자 배열 반환
      expect(result).toEqual(expected);
    });
  });
});
