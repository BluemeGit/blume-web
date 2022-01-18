import React from 'react';
import styled from '@emotion/styled';

import IconLogo from '../../../assets/header/icon-logo.png';

export default function MobileHeader () {
    return (
        <Header>
            <img src={IconLogo} alt={'세잎'}/>
        </Header>
    );
}



const Header = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 10px 24px;
    border-bottom: 1px solid #E7E7E7;
`;
