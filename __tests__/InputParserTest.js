import InputParser from "../src/utils/InputParser";

describe("InputParser 테스트", () => {
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
