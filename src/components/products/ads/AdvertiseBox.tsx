import styled from '@emotion/styled';
import React from 'react';

const Container = styled.img`
    width: 100vw;
    object-fit: contain;
`;

type AdvertiseBoxType = {
    src: string
}
export default function AdvertiseBox ({src}: AdvertiseBoxType) {
    return <Container src={'https://kr.object.ncloudstorage.com/blume/' + src}></Container>
}
