# React-query

- React Application 에서 서버의 상태를 불러오고, 캐싱하며, 지속적으로 동기화하고 업데이트 하는 작업을 도와주는 라이브러리
- Hook 을 사용하여 React Component 내부에서 자연스럽게 서버의 데이터를 사용할 수 있는 방법을 제공
- 우선적으로, `index.js`에서 provider를 사용하여 프로젝트 코드를 감싸 React Query를 내 프로젝트에서 사용할 수 있게 해야 함.

---

1. useQuery
2. useQueries: 여러 개의 useQuery를 한 번에 실행할 때 사용
3. useMutation: PUT/UPDATE/DELETE와 같이 값을 변경할 때 사용

---

- `React-query` 또한 React의 `ContextAPI`를 기반으로 동작
- 대체로, GET에는 useQuery 사용
- PUT, UPDATE, DELETE에는 useMutation 사용

> 사용한 api: https://api.github.com/repositories/207645083
