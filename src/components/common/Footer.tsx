import styled from '@emotion/styled';
import React from 'react';
export default function Footer () {
    return (
        <FooterContainer>
            <FooterWrapper>
                <Intro>
                    <b>회사명</b>{'\t\t\t메에컴퍼니'}{'\n'}
                    <b>주소</b>{'\t\t\t서울특별시 동작구 상도로55길 8-3 365, 스테이션 202호'}{'\n'}
                    <b>대표명</b>{'\t\t\t김성우'}{'\n'}
                    <b>사업자등록번호</b>{'\t144-23-01384'}{'\n'}
                </Intro>
                <Intro>
                    <b>문의</b>{'\t\tmaeee@maeee.co.kr'}{'\n'}
                    <b></b>{'\t\t\tjming@maeee.co.kr'}{'\n'}
                </Intro>
            </FooterWrapper>
        </FooterContainer>
    );
}

const FooterContainer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;
    
    width: 100%;
    
    
    background: #FFFFFF;
    border-top: 1px solid #E7E7E7;
`;
const FooterWrapper = styled.div`
    display: flex;
    flex-direction: row;

    width: 1280px;
    padding: 40px;
    & > * {
        margin-right: 80px;
    }
    & > *:last-child {
        margin-right: 0px;
    }
`
const Intro = styled.span` 
    font-size: 14px;
    line-height: 36px;
    color: #7F7F7F;
    white-space: pre;
`;