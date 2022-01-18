import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';
type ProductType = {
    id: number,
    title: string,
    content: string
    imageLink: string,
}
export default function Product ({
    id,
    title,
    content,
    imageLink,
}: ProductType) {
    const navigate = useNavigate();
    const onProductClick = (id: number) => () => {
        navigate(`/products/${id}`);
    };
    return (
        <Container onClick={onProductClick(id)}>
            <ProductImage src={'https://kr.object.ncloudstorage.com/blume/' + imageLink}/>
            <ProductInfo>
                <ProductTitle>{title}</ProductTitle>
                <ProductContent>{content}</ProductContent>
            </ProductInfo>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    padding: 0px 20px;
    border-bottom: 1px solid #E7E7E7;
    height: 100px;
    display: flex;
    align-items: center;
    
    transition: 0.3s;
    &:active {
        opacity: 0.6;
    }
`;
const ProductImage = styled.img`
    height: 100px;
    width: 100px;
    object-fit: contain;
    
`;
const ProductInfo = styled.div`
    margin-left: 20px;
    & > * {
        margin: 0;
        margin-bottom: 4px;
    }
    & > *:last-child {
        margin: 0;
        margin-bottom: 0px;
    }
`;
const ProductTitle = styled.p`
    font-size: 14px;
    font-weight: bold;
`;
const ProductContent = styled.p`
    font-size: 12px;
    color: #999999;
    font-weight: bold;
`;