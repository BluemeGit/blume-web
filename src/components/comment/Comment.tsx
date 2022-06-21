// import React from "react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import CommentBox from "./CommentBox";
import { useParams } from "react-router-dom";
import { fetcher, putter } from "../../fetch/fetcher";
import { userState } from "../../recoil/atom";
import { useRecoilValue, useRecoilState } from "recoil";
export default function Comment() {
    const [cat, setCat] = useState("orderByLatest");
    const [commentList, setCommentList] = useState([]);
    const [description, setDescription] = useState("");
    const user = useRecoilValue(userState);
    const params = useParams();
    const onChangeInput = (e: any) => {
        setDescription(e.target.value);
    };
    const onClickSubmit = () => {
        putter(`/comment/${params.id}`, user.accessToken, { description }).then((result) => {
            alert("완료되었습니다.");
        });
        refreshFunction();
    };

    const onClickLike = (commentId: any) => {
        putter(`/comment/like/${commentId}`, user.accessToken).then((result) => {
            console.log(result.data);
        });
    };

    //수정필요
    const refreshFunction: any = () => {
        setDescription("");
    };
    useEffect(() => {
        fetcher(`/comment/${params.id}?type=orderByLatest`, user.accessToken)
            .then((res) => {
                setCommentList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <Wrap>
            <input
                style={{ width: "100%", height: "5rem", marginTop: "4rem" }}
                placeholder="제품에 대한 후기/의견/댓글을 자유롭게 써주시되 욕설, 모욕, 비방은 자제해주세요!"
                onChange={onChangeInput}
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
                        cursor: "pointer",
                    }}
                    onClick={onClickSubmit}
                >
                    등록
                </span>
            </div>
            <section style={{ display: "flex", justifyContent: "center" }}>
                <span
                    style={{
                        marginRight: "0.5rem",
                        color: cat === "orderByLatest" ? "rgb(30, 209, 84)" : "black",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        setCat("orderByLatest");
                    }}
                >
                    최신순
                </span>
                <span
                    style={{
                        color: cat === "orderByRecommend" ? "rgb(30, 209, 84)" : "black",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        setCat("orderByRecommend");
                    }}
                >
                    추천순
                </span>
            </section>
            <section>
                {commentList.length > 0 &&
                    commentList?.map((item: any) => {
                        return (
                            <CommentBox
                                commentId={item.id}
                                userId={item.userId}
                                nickname={item.nickname}
                                indate={item.indate}
                                description={item.description}
                                key={item.id}
                                refreshFunction={refreshFunction}
                                onClickLike={onClickLike}
                            />
                        );
                    })}
            </section>
        </Wrap>
    );
}

const Wrap = styled.section`
    min-width: 1200px;
`;
