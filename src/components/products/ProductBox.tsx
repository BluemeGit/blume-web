import styled from '@emotion/styled';
import React from 'react';
type ProductBoxType = {
    imageLink: string
}
export default function ProductBox({ imageLink }: ProductBoxType) {

    return (
        <Container>
            <Image src={imageLink}/>
            <Button>{'전 성분 해석보기'}</Button>
        </Container>
    );
}

const Container = styled.div`
    position: relative;

    width: 278px;
    height: 278px;

    background: #ffffff;
    border: 1px solid #E7E7E7;
    border-radius: 20px;
    &:hover {
        border: 1px solid #A7A7A7;
        & > button {
            background: #E7E7E7;
        }
    }
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 20px;
`;
const Button = styled.button`
    position: absolute;
    bottom: -15px;
    left: calc(50% - 60px);

    height: 28px;
    width: 120px;

    border: 1px solid #E7E7E7;
    border-radius: 20px;
    
    background: #ffffff;
    font-weight: bold;

`;