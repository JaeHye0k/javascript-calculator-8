<div align="center">

![배너 이미지](/assets/woowacourse-logo.webp)

</div>

# 우테코 프리코스 1주차 미션 - 문자열 덧셈 계산기

![Static Badge](https://img.shields.io/badge/precourse-week1-orange.svg)
![Static Badge](https://img.shields.io/badge/test-18_passed-green.svg)
![Static Badge](https://img.shields.io/badge/version-1.0.0-fedcba.svg)

> 우아한테크코스 프리코스 1주차 미션, 문자열 덧셈 계산기를 구현한 저장소 입니다.

## 🗂️ 목차

- [디렉토리 구조](#-디렉토리-구조)
- [아키텍처](#️-아키텍처)
- [흐름도](#️-flow-chart)
- [기능 목록](#-기능-목록)

## 📁 디렉토리 구조

```
javascript-calculator-8/
├── src/
│   ├── index.js                    # 진입점
│   ├── App.js                      # 애플리케이션 메인
│   │
│   ├── controllers/
│   │   └── CalculatorController.js # 비즈니스 흐름 제어
│   │
│   ├── models/
│   │   └── CalculatorModel.js      # 도메인 로직 (검증, 계산)
│   │
│   ├── views/
│   │   └── CalculatorView.js       # 입출력 (UI)
│   │
│   ├── utils/
│   │   ├── InputParser.js          # 입력 파싱
│   │   ├── OutputFormatter.js      # 출력 포맷팅
│   │   └── validator.js            # 검증 유틸리티
│   │
│   └── constants/
│       └── error.js                # 에러 메시지
│
└── __tests__/
    ├── ApplicationTest.js
    ├── CalculatorTest.js
    ├── InputParserTest.js
    └── OutputFormatter.js
```

## 🏛️ 아키텍처

![아키텍처](/assets/architecture.svg)

## 🔄️ Flow Chart

<div align="center">

![흐름도](/assets/flowchart.svg)

</div>

## 📋 기능 목록

### 📖 용어 정의

- 입력값 원문: 유저가 입력한 전체 문자열
  - 예: `//-\n1,2,3`
- 커스텀 구분자 영역: `//-\n`
  - 커스텀 구분자 선언기호: `//\n`
  - 커스텀 구분자: `-`
- 숫자 영역: `1,2,3`
- 구분자: 커스텀 구분자 + 기본 구분자

### 1.입력값 파싱

- [x] 빈 문자열이 입력되었을 경우, 0반환
- [x] 커스텀 구분자 영역과 숫자 영역을 분리해서 반환한다.

### 2.커스텀 구분자 추출

- [x] 커스텀 구분자 기호(//\n)를 벗겨 구분자만 반환한다.
- [x] 커스텀 구분자 선언 기호가 2개 이상인 경우 각각의 커스텀 구분자를 유효한 구분자로 취급한다.
  - 예: `//;;\n//-\n1;;2-3` -> `[";;", "-"]`

### 3.커스텀 구분자 검증

- [x] 커스텀 구분자가 빈 문자열일 경우, 에러가 발생한다.
  - 공백은 유효한 구분자로 취급함
- [x] 커스텀 구분자에 온점('.')이 포함되어 있을 경우, 에러가 발생한다.
  - 소숫점과 혼동될 수 있는 문제 예방
- [x] 커스텀 구분자에 숫자가 포함되어있을 경우, 에러가 발생한다.
- [x] 한글, 이모지도 커스텀 구분자로 사용할 수 있다.

### 4. 숫자 추출

- [x] 숫자 영역을 구분자로 분리해 숫자 배열을 반환한다.
- [x] Number.MAX_SAFE_INTGER를 초과하는 수는 BigInt로 변환한다.

### 5. 숫자 검증

- [x] 숫자 이외의 타입인 요소가 포함되어 있을 경우 에러가 발생한다.
  - 통과: BigInt, Number
  - 에러: Infinity, NaN, 그 외
- [x] 음수가 포함되어 있을 경우 에러가 발생한다.

### 6. 숫자 합산

- [x] 모든 숫자를 더한다.
- [x] 부동소수점 오차 없는 소수 계산을 한다.
  - 예: `[0.1, 0.2]` -> 0.3
- [x] `Number.MAX_SAFE_INTEGER`를 초과하는 숫자도 정확히 계산한다.
  - 예: '9007199254740992,1' -> 9007199254740993
- [x] 합산 결과를 정수부, 소수부로 분리해 반환한다

### 7. 출력 형태 포멧팅

- [x] 정수부, 소수부를 합친 문자열 반환
