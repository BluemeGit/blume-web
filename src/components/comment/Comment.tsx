// import React from "react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import CommentBox from "./CommentBox";
import { useParams } from "react-router-dom";
import { putter } from "../../fetch/fetcher";
import { userState } from "../../recoil/atom";
import { useRecoilValue } from "recoil";
export default function Comment() {
    const [cat, setCat] = useState("orderByLatest");
    const [commentList, setCommentList] = useState<any[]>([]);
    const [description, setDescription] = useState("");
    const [pageInfo, setPageInfo] = useState<any>({ pageNm: 1, pageSize: 10, pageEnd: false });

    const user = useRecoilValue(userState);
    const params = useParams();
    const onChangeInput = (e: any) => {
        setDescription(e.target.value);
    };
    const onClickSubmit = () => {
        putter(`/comment/${params.id}`, user.accessToken, { description }).then((result) => {
            commentId = result.data.commentId;
            alert("완료되었습니다.");
        });

        window.location.reload();
    };

    const onClickLike = (commentId: any) => {
        putter(`/comment/like/${commentId}`, user.accessToken).then((result) => {
            console.log(result.data);
        });
        window.location.reload();
    };

    const onClickSort = (type: any = "orderByLatest") => {
        putter(`/comment/${params.id}?type=${type}`, user.accessToken, pageInfo)
            .then((res) => {
                if (res.data.length === 0) setPageInfo({ ...pageInfo, pageEnd: true });
                setCommentList((prev) => {
                    return [...prev, ...res.data];
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        onClickSort(cat);
    }, [cat, pageInfo.pageNm]);

    const onClickPaging = (type: any) => {
        setPageInfo({ ...pageInfo, pageNm: pageInfo.pageNm + 1 });
    };
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
                        setCommentList([]);
                        setCat("orderByLatest");
                        setPageInfo({ ...pageInfo, pageNm: 1, pageEnd: false });
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
                        setCommentList([]);
                        setCat("orderByRecommend");
                        setPageInfo({ ...pageInfo, pageNm: 1, pageEnd: false });
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
                                likeCnt={item.empathy}
                                commentId={item.id}
                                userId={item.userId}
                                nickname={item.nickname}
                                indate={item.indate}
                                description={item.description}
                                key={item.id}
                                onClickLike={onClickLike}
                            />
                        );
                    })}
            </section>

            <Paging>
                <ViewMore onClick={() => onClickPaging("next")}>
                    {!pageInfo.pageEnd && "더보기"}
                </ViewMore>
            </Paging>
        </Wrap>
    );
}

const Wrap = styled.section`
    min-width: 1200px;
`;

const Paging = styled.section`
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

const ViewMore = styled.span`
    cursor: pointer;
`;
