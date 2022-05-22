import React from 'react';
import styled from '@emotion/styled';

import IconLogo from '../../../assets/common/icon_logo.svg';
import KakaoLogin from '../../common/KakaoLogin';
import { useNavigate } from 'react-router-dom';

export default function MobileHeader () {
    const navigate = useNavigate();
    return (
        <Header>
            <img src={IconLogo} 
                alt={'세잎'} 
                style={{ cursor: 'pointer', height: '30px', objectFit: 'contain'}}
                onClick={() => navigate('/')}/>
            <KakaoLogin />
        </Header>
    );
}

const Header = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100vw;
    padding: 10px 24px;
    border-bottom: 1px solid #E7E7E7;
`;
