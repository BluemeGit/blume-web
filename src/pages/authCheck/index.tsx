import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atom";
import { useNavigate } from "react-router-dom";
import { poster } from "../../fetch/fetcher";
const data: any = window;
const { Kakao } = data;

export default function AuthCheck() {
    const navigate = useNavigate();

    const { accessToken } = useParams();
    Kakao.Auth.setAccessToken(accessToken);
    const [user, setUser] = useRecoilState(userState);

    useEffect(() => {
        if (accessToken)
            poster("/user/getUser", accessToken, { accessToken }).then((result) => {
                setUser({ ...result.data[0], accessToken });
                navigate("/products");
            });
    }, []);

    return <div></div>;
}

// import styled from "@emotion/styled";
// import React from "react";
// import { Link } from "react-router-dom";
// import { countState, inputState } from "./atom"; // 새로 변경된 코드
// import countStateSelector from "./selector"; // 새로 추가된 코드
// import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";

// export default function Privacy() {
//     const [counter, setCounter] = useRecoilState(countState);
//     // useState와 같지만, useRecoilState을 사용하여 다른 파일에 있는 아톰을 읽을 수 있다.
//     const currentCount = useRecoilValue(countState); // 읽기 전용!
//     const counterHandler = useSetRecoilState(countState); // 값만 변경 시키기
//     const resetCounter = useResetRecoilState(countState); // 디폴트값으로 값 변경

//     // 새로 추가된 코드
//     const currentInput = useRecoilValue(inputState);
//     const inputHandlerState = useSetRecoilState(inputState);
//     const resultValue = useRecoilValue(countStateSelector);

//     const plusCount = () => {
//         counterHandler((pre) => pre + 1);
//     };
//     const minusCount = () => {
//         counterHandler((pre) => pre - 1);
//     };

//     // 새로 추가된 코드
//     const inputHandler = (e) => {
//         let target = e.target.value;
//         inputHandlerState(target);
//     };
//     const submitCount = () => counterHandler((pre) => pre + Number(currentInput));

//     return (
//         <Container>
//             <div>{currentCount}</div>
//             <button onClick={() => setCounter((num) => num + 1)}>+</button>
//             <button onClick={() => setCounter((num) => num - 1)}>-</button>

//             <button onClick={plusCount}>+</button>
//             <button onClick={minusCount}>-</button>
//             <button onClick={resetCounter}>reset</button>

//             <div>
//                 <input type="text" onChange={inputHandler}></input>
//                 <button onClick={submitCount}>입력값 더하기</button>
//                 <div>{resultValue}</div>
//             </div>
//         </Container>
//     );
// }

// const Container = styled.div`
//     width: 100vw;
//     overflow: scroll;
//     white-space: pre-wrap;
//     padding: 24px;
// `;
