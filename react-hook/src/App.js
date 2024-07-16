// before, starting...
// You must install react-hook-form-package
// enter this
// npm install react-hook-form

import { useForm } from "react-hook-form";

/*
 * useForm 의 주요 함수
 * register: 입력 필드를 react-hook-form 상태와 연결
 * handleSubmit: 폼이 제출될 때 호출되어 submit 이벤트 처리. onSubmit 콜백 함수와 함께 사용
 * formState: 폼 상태 정보를 제공. errors 속성을 통해 유효성 검사 에러 정보 확인 가능(dirtyFields 등의 다른 요소도 사용 가능)
 * setValue: 입력 필드의 값을 동적으로 설정
 * getValue: 현재 폼의 모든 입력 필드의 값을 가져옴
 * watch: 특정 입력 필드의 값을 감시하는 데 사용. 입력 필드의 변화를 실시간 감지, 활용 가능
 * reset: 폼의 입력 값을 초기 상태로 되돌림. 주로 폼 재설정이나 초기화에 사용.
 */

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(`이름: ${data.name}\n이메일: ${data.email}`);
  };

  return (
    <div>
      <h1>Simple React Form Example</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "이름을 입력해주세요" })}
            /*
             * ...(spread) 연산자는 register 함수가 반환하는 객체의 모든 속성을 해당 'input' 엘리먼트에 전달함.
            즉, register 함수가 반환하는 속성들을 펼쳐 `<input>` 엘리먼트의 props로 설정함.
            만일, register함수가 
            {
              name: "name",
              ref: someFunction,
              onChange: someOtherFunction,
              onBlur: anotherFunction,
            }
            다음과 같을 경우 `...register("name", { required: "이름을 입력해주세요" })`는 위 객체의 모든 속성을 `<input>` 엘리먼트의 props로 전달.
            <input
              type="text"
              id="name"
              name="name"
              ref={someFunction}
              onChange={someOtherFunction}
              onBlur={anotherFunction}
              required="이름을 입력해주세요"
            />
             */
          />
          {errors.name && <p> {errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            id="email"
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9._%+-]+\.[A-Z]{2,}$/i,
                message: "유효한 이메일 주소를 입력해주세요",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <button type="submit">제출</button>
      </form>

      <div>이름 : {watch("name")}</div>
      <div>이메일: {watch("email")}</div>
    </div>
  );
}
