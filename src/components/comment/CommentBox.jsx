// import React from "react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { timeForToday } from "../../utils/timeForToday";

export default function CommentBox({ userId, nickname, indate, description }) {
    const [cat, setCat] = useState("orderByRecommend");

    return (
        <div>
            <Wrap>
                <Nick>{nickname}</Nick>
                <InnerWrap>
                    <Btn style={{ marginRight: "0.5rem" }}>추천</Btn>
                    <Btn>신고</Btn>
                </InnerWrap>
            </Wrap>
            <CreatedAt>{timeForToday(indate)}</CreatedAt>
            <Content>{description}</Content>
            <FinishLine></FinishLine>
        </div>
    );
}

const Nick = styled.div`
    font-weight: bold;
    font-size: 0.9rem;
`;

const CreatedAt = styled.div`
    font-size: 0.5rem;
`;

const Content = styled.div`
    font-size: 0.8rem;
`;

const FinishLine = styled.hr`
    margin-bottom: 1rem;
    border: none;
    height: 0.5px;
    background-color: #eeeeee;
    /* background-color: red; */
    /* color: red; */
    /* border-color: #090909; */
    border-bottom: 0.5px;
`;

const Wrap = styled.div`
    display: flex;
    justify-content: space-between;
`;

const InnerWrap = styled.div``;

const Btn = styled.span`
    font-size: 0.9rem;
    cursor: pointer;
`;