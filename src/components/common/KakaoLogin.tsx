// @ts-ignore
import React, { Component } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// @ts-ignore
import icon from "../../assets/common/kakao_login_small.png";
import { baseURL } from "../../fetch/fetcher";
import axios from "axios";
import styled from "@emotion/styled";
// @ts-ignore
const { Kakao } = window;

export default function KakaoLogin() {
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
        Kakao.Auth.setAccessToken("access_token");
        return;
    };

    const kakaoLogout = async () => {
        if (Kakao.Auth.getAccessToken() == !null) {
            console.log("Not logged in.");
            return;
        }
        Kakao.Auth.setAccessToken(null);
        console.log("Sign out");
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
    height: 30px;
    margin-left: 340px;
    cursor: pointer;
`;
const Logout = styled.div`
    height: 30px;
    margin-left: 340px;
    color: gray;
    font-size: small;
    cursor: pointer;
`;
