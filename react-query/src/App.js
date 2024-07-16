import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  /*
  useQuery는 첫 번째 파라미터로 unique key를 포함한 배열이 들어감.
  이는 이후 동일한 쿼리를 불러올 때 유용하게 사용
  첫 번째 파라미텅 들어가는 배열의 첫 요소는 unique key로 사용
  두 번째 요소부터는 query 함수 내부의 파라미터로 값들이 전달
  두 번째 파라미터로 실제 호출하고자 하는 비동기 함수가 들어감.
  이때 함수는 Promise를 반환하는 형태여야 함.
  최종 반환 값은 API의 성공, 실패 여부, 반환값을 포함한 객체
  cf. useQuery의 세 번째 인자로는 다양한 옵션 값이 들어감.
  enabled에 값을 대입하면 해당 값이 true 일 때 useQuery를 동기적으로 실행함.
  
  ex.
  queryKey: ['nextTodos'],
  queryFn: fetchNextTodoList,
  enabled: !!todoList // true가 되면 fetchNextTodoList를 실행
  */
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"], // 쿼리의 고유 키 지정
    // 데이터를 가져오는 비동기 함수 지정
    queryFn: () =>
      // fetch 함수는 네트워크 요청이 완료되면 Promise 반환
      // .then 메서드를 사용하여 Promise가 성공적으로 완료되었을 때의 동작 정의
      // res는 fetch 요청에 대한 응답 객체
      // res.json() 은 응답 객체의 본문을 JSON 형식으로 변환하는 또 다른 Promise를 반환
      fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
        (res) => res.json()
      ),
  });

  // isPending: Loading 여부
  if (isPending) return "Loading...";
  // error: 에러 발생 여부
  if (error) return "An error has occurred: " + error.message;
  // data를 통해 성공 시 데이터 반환
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}
