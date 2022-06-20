import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function AuthCheck() {
    const { accessToken } = useParams();
    console.log(accessToken);
    useEffect(() => {
        axios.post(`http://localhost:5000/user/getUser`, { accessToken }).then((result) => {
            console.log(result.data);
        });
    }, []);
    return (
        <Container>
            <b>
                개인정보처리방침 <Link to={"/"}>홈으로</Link>
            </b>

            {`\n

        `}
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    overflow: scroll;
    white-space: pre-wrap;
    padding: 24px;
`;
