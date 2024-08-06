# Debounce-And-Throttling

## Debounce 란?

- 연이어 발생하는 이벤트들 중 마지막 이벤트만을 처리하도록 하는 기술
- 즉, **이벤트가 여러 번 발생해도, 일정 시간 동안 이벤트가 발생하지 않을 때까지 기다렸다가 마지막 이벤트를 실행함.**

## Debounce의 주 사용처

1.  **검색창 자동완성**: 사용자가 키보드를 입력할 때마다 검색 요청을 보내지 않고, 입력이 끝난 후에 한 번만 요청을 보내도록 함.
2.  **폼 제출**: 버튼을 여러 번 클릭해도 마지막 클릭만 유효하게 처리

## Throttling 이란?

- **Throttling** 은 일정 시간 동안 발생하는 이벤트 중 **처음 발생한 이벤트를 처리**한 후, 지정된 시간이 지나기 전까지는 그 이후에 발생한 이벤트들을 무시하는 기술
- 즉, 일정 시간 간격으로 이벤트를 제한적으로 실행

## Throttling의 주 사용처

1. **스크롤 이벤트**: 페이지 스크롤 시, 너무 많은 이벤트가 발생하는 것을 방지하여 성능을 향상
2. **윈도우 리사이즈**: 윈도우 크기 조절 시, 리사이즈 이벤트를 제한적으로 처리하여 성능을 최적

## Debounce Vs. Throttling

- **Debounce** 는 연속된 이벤트가 끝나고 일정 시간이 지난 후에 한 번만 실행
- **Throttling** 은 일정 시간 간격으로 이벤트를 제한적으로 실행
  - **Debounce**
    - 주로 사용자 입력과 관련된 경우에 사용
    - ex. 검색창 입력, 폼 제출, 텍스트 입력
  - **Throttling**
    - 주로 자주 발생하는 이벤트를 제한하여 성능을 향상시키고자 할 때 사용
    - ex. 스크롤, 리사이즈, 마우스 움직임.

## Debounce 예제 코드

```jsx
import React, { useState, useCallback } from "react";
import debounce from "lodash/debounce";

const DebounceExample = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const fetchResults = (query) => {
    // API 호출을 흉내내는 함수
    console.log("Fetching result for ${query}");
    setResult(["Result for ${query}"]);
  };

  // fetchResults 함수를 debounce로 감싸서, 500ms 동안 입력이 멈추면 호출
  const debouncedFetchResults = useCallback(debounce(fetchResults, 500), []);

  // 입력 필드의 값이 변경될 때 호출되는 함수
  const handleInputChange = (e) => {
    setQuery(e.target.value); // 입력값을 상태로 업데이트
    debouncedFetchResults(e.target.value); // 디바운스된 함수 호출
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <ul>
        {result.map((result, index) => (
          <li key={index}>{result}</li>
          // 검색 결과를 리스트로 표시
        ))}
      </ul>
    </div>
  );
};
export default DebounceExample;
```

## Throttling 예제 코드

```jsx
import React, { useState, useEffect } from 'react';
import throttle from 'loadash/throttle';

const ThrottleExample = () => {
// 현재 스크롤 위치를 상태로 관리
const [scrollPosition, setScrollPosition] = useState(0);
// 스크롤 이벤트 헨들러(쓰로틀링 처리될 함수)
const handleScroll = throttle(() => { // 현재 스크롤 위치를 상태로 업데이트
    setScrollPosition(window.scrollY);
}, 200); // 200ms 간격으로 이벤트 처리

// 컴포넌트가 마운트될 때와 언마운트될 때 스크롤 이벤트 리스너를 추가/제거
useEffect(() => {
    window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 리스너 추가
    return () => {
        window.removeEventListener('scroll', handleScroll); // 스크롤 이벤트 리스너 제거
        };
}, [handleScroll]);

return (
    {/* 페이지의 높이를 크게 설정하여 스크롤 가능하게 만듦 */}
    <div style={{ height: '150vh' }}>
        <h1>Scroll down to see the throttle effect</h1>
        <p>Scroll Position: {scrollPosition} px</p> {/* 현재 스크롤 위치 표시 */}
    </div>
);
};
    export default ThrottleExample;
```

즉, 디바운스 함수는 입력이 멈춘 후 지정된 시간 동안 대기한 후에 함수를 실행

- `useCallback` 훅을 사용하여 `debouncedFetchResult` 함수를 메모이제이션
- 이렇게 하면 컴포넌트가 다시 렌더링될 때 새로운 디바운스된 함수가생성되지 않음
- `handleInputChange` 함수에서 입력값이 변경될 때마다 `debouncedFetchResults` 함수를 호출.
- 이로 인하여 사용자가 입력을 멈출 때까지 실제 API 호출이 지연
- 쓰로틀링 함수는 지정된 시간 간격마다 함수를 실행.
- `useEffect` 훅을 사용하여 컴포넌트가 마운트될 때 `scroll` 이벤트 리스너를 추가하고, 언 마운트될 때 제거
- 이로 인하여 메모리 누수 방지 가능
- `handleScroll` 함수에서 현재 스크롤 위치를 상태로 업데이트.
- 이 상태는 컴포넌트가 다시 렌더링 될 때 UI에 반영
