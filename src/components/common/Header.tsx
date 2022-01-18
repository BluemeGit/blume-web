import styled from '@emotion/styled';
import React from 'react';
import IconLogo from '../../assets/header/icon-logo.png';

export default function Header () {
    return (
        <HeaderContainer>
            <HeaderWrapper>
                <img src={IconLogo} alt='세잎 로고'/>
            </HeaderWrapper>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    position: fixed;
    z-index: 999;
    background: #FFFFFF;
    
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 60px;
    border-bottom: 1px solid #E7E7E7;
`
const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;

    width: 1280px;
    height: 100%;
    padding: 0px 40px;
`;