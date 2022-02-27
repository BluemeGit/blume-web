import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconLogo from '../../assets/common/icon_logo.svg';
import Image from './Image';

export default function Header () {
    const navigate = useNavigate();
    return (
        <HeaderContainer>
            <HeaderWrapper>
                <Image src={IconLogo} alt='세잎 로고' style={{ cursor: 'pointer'}} onClick={() => navigate('/')} height={'30px'}/>
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