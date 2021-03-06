// @ts-ignore
import React, { Component } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// @ts-ignore
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atom";
import icon from "../../assets/common/kakao_login_small.png";
import { baseURL } from "../../fetch/fetcher";
import axios from "axios";
import styled from "@emotion/styled";
// @ts-ignore
const { Kakao } = window;

export default function KakaoLogin() {
    const [user, setUser] = useRecoilState(userState);
    const kakaoLogin = async (res: Response, req: Request) => {
        try {
            if (Kakao.Auth.getAccessToken() == null) {
                Kakao.Auth.authorize({
                    redirectUri: `${baseURL}/user/kakao/auth`,
                    scope: "profile_nickname, account_email, gender",
                });
            } else console.log("Logged in.");
        } catch (err) {
            console.log(err);
        }
        console.log("Sign in");
        return;
    };

    const kakaoLogout = async () => {
        if (Kakao.Auth.getAccessToken() == !null) {
            console.log("Not logged in.");
            return;
        }
        Kakao.Auth.setAccessToken(null);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        setUser(null);
        console.log(user);

        window.location.href = "/products";
    };

    if (Kakao.Auth.getAccessToken() == null) {
        return (
            <Login>
                <img
                    id="logo"
                    src={icon}
                    onClick={kakaoLogin}
                    alt="button"
                    css={css`
                        height: 60%;
                        width: 60%;
                        margin-top: 5px;
                    `}
                />{" "}
            </Login>
        );
    } else {
        return (
            <Logout>
                <span onClick={kakaoLogout}>๋ก๊ทธ์์</span>
            </Logout>
        );
    }
}

const Login = styled.div`
    cursor: pointer;
`;
const Logout = styled.div`
    margin-top: 5px;
    color: black;
    opacity: 0.5;
    font-size: 8px;
    font-weight: bold;
    cursor: pointer;
`;
