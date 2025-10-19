import OutputFormatter from "../src/utils/OutputFormatter";

describe("OutputFormatter 테스트", () => {
  test("정수부와 소수부를 문자열로 합친다", () => {
    // given: 정수부와 소수부로 구분된 숫자가 주어짐
    const int = 9007199254740993n;
    const decimal = 0.3;
    const expected = "9007199254740993.3";

    // when: 출력 시
    const result = OutputFormatter.format(int, decimal);

    // then: 정수부와 소수부가 합쳐져 출력됨
    expect(result).toBe(expected);
  });
});
