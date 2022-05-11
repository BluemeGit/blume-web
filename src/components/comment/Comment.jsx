// import React from "react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import CommentBox from "./CommentBox";

export default function Comment() {
    const [cat, setCat] = useState("orderByRecommend");
    let commentList = [
        { userId: 1, nick: "원태경", content: "댓글테스트", createdAt: "오늘" },
        { userId: 1, nick: "원태경", content: "댓글테스트", createdAt: "오늘" },
        { userId: 1, nick: "원태경", content: "댓글테스트", createdAt: "오늘" },
        { userId: 1, nick: "원태경", content: "댓글테스트", createdAt: "오늘" },
        { userId: 1, nick: "원태경", content: "댓글테스트", createdAt: "오늘" },
        { userId: 1, nick: "원태경", content: "댓글테스트", createdAt: "오늘" },
        { userId: 1, nick: "원태경", content: "댓글테스트", createdAt: "오늘" },
        { userId: 1, nick: "원태경", content: "댓글테스트", createdAt: "오늘" },
    ];

    return (
        <Wrap>
            <input
                style={{ width: "100%", height: "5rem", marignTop: "4rem" }}
                placeholder="제품에 대한 후기/의견/댓글을 자유롭게 써주시되 욕설, 모욕, 비방은 자제해주세요!"
            ></input>
            <div style={{ display: "flex" }}>
                <span
                    style={{
                        marginLeft: "auto",
                        backgroundColor: "#1ED154",
                        padding: "0.3rem 0.5rem",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        color: "white",
                        marginTop: "0.3rem",
                        fontSize: "0.9rem",
                    }}
                >
                    등록
                </span>
            </div>
            <section style={{ display: "flex", justifyContent: "center" }}>
                <span
                    style={{
                        marginRight: "0.5rem",
                        color: cat === "orderByRecommend" ? "rgb(30, 209, 84)" : "black",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        setCat("orderByRecommend");
                    }}
                >
                    추천순
                </span>
                <span
                    style={{
                        color: cat === "orderByLatest" ? "rgb(30, 209, 84)" : "black",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        setCat("orderByLatest");
                    }}
                >
                    최신순
                </span>
            </section>
            <section>
                {commentList?.map((item) => {
                    return (
                        <CommentBox
                            userId={item.userId}
                            nick={item.nick}
                            content={item.content}
                            createdAt={item.createdAt}
                        />
                    );
                })}
            </section>
        </Wrap>
    );
}

const Wrap = styled.section`
    /* width: 100%; */
    min-width: 1200px;
`;
