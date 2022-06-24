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
                <img id="logo" src={icon} onClick={kakaoLogin} alt="button" />{" "}
            </Login>
        );
    } else {
        return (
            <Logout>
                <span onClick={kakaoLogout}>로그아웃</span>
            </Logout>
        );
    }
}

const Login = styled.div`
    test-align: right;
    height: 30px;
    margin-left: 340px;
    cursor: pointer;
`;
const Logout = styled.div`
    height: 30px;
    margin-left: 340px;
    padding: 10px;
    color: gray;
    font-size: small;
    cursor: pointer;
`;
