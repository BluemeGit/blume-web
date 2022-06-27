import React from "react";
import styled from "@emotion/styled";

import IconLogo from "../../../assets/common/icon_logo.svg";
import KakaoLogin from "../../common/KakaoLogin";
import { useNavigate } from "react-router-dom";

export default function MobileHeader() {
    const navigate = useNavigate();
    return (
        <Container>
            <div></div>
            <Header>
                <img
                    src={IconLogo}
                    alt={"세잎"}
                    style={{
                        cursor: "pointer",
                        height: "30px",
                        objectFit: "contain",
                        marginLeft: "50px",
                    }}
                    onClick={() => navigate("/products")}
                />
            </Header>
            <Login>
                <KakaoLogin />
            </Login>
        </Container>
    );
}

const Login = styled.div`
    margin-top: 12px;
`;
const Container = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
`;

const Header = styled.header`
    flex-direction: row;
    padding: 10px 24px;
`;
