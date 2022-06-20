// // Counter.js
// import React from 'react';
// import { countState, inputState } from './atom';  // 새로 변경된 코드
// import countStateSelector from './selector';   // 새로 추가된 코드
// import {
//   useRecoilState,
//   useRecoilValue,
//   useSetRecoilState,
//   useResetRecoilState
// } from 'recoil';

// function Counter() {
//   const [counter, setCounter] = useRecoilState(countState);
//   // useState와 같지만, useRecoilState을 사용하여 다른 파일에 있는 아톰을 읽을 수 있다.
//   const currentCount = useRecoilValue(countState);  // 읽기 전용!
//   const counterHandler = useSetRecoilState(countState); // 값만 변경 시키기
//   const resetCounter = useResetRecoilState(countState); // 디폴트값으로 값 변경

//   // 새로 추가된 코드
//   const currentInput = useRecoilValue(inputState);
//   const inputHandlerState = useSetRecoilState(inputState);
//   const resultValue = useRecoilValue(countStateSelector);

//   const plusCount = () => {
//     counterHandler((pre) => pre + 1);
//   };
//   const minusCount = () => {
//     counterHandler((pre) => pre - 1);
//   };

//   // 새로 추가된 코드
//   const inputHandler = (e) => {
//     let target = e.target.value;
//     inputHandlerState(target);
//   };
//   const submitCount = () => counterHandler((pre) => pre + Number(currentInput));

// return (
// <div>
//  <div>
//   {/* <div>{counter}</div> */} // counter 또는 currentCount 둘 중 하나를 사용해도 상관없는거 같다.
//   <div>{currentCount}</div>  // 그러나 읽기만 하려고 currentCount를 사용했다.

//   {/* <button onClick={() => setCounter((num) => num + 1)}>+</button>
//   <button onClick={() => setCounter((num) => num - 1)}>-</button> */}
//   // 위의 코드도 작동한다.

//   <button onClick={plusCount}>+</button>
//   <button onClick={minusCount}>-</button>
//   <button onClick={resetCounter}>reset</button>

//   // 새로 추가된 코드
//   <div>
//     <input type='text' onChange={inputHandler}></input>
//     <button onClick={submitCount}>입력값 더하기</button>
//     <div>{resultValue}</div>
//   </div>

// </div>
//   );
// }

// export default Counter;
