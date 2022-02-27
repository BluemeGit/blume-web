import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import IconBack from '../../../assets/common/icon_back.svg';
import IconWishFill from '../../../assets/product/icon-wish-fill.png';
import IconWishStroke from '../../../assets/product/icon-wish-stroke.png';
import MaterialBox from '../../../components/products/materials/MaterialBox';
import { fetcher } from '../../../fetch/fetcher';
import { addWish, delWish, getWishs } from '../../../utils/localstorage';

type MaterialType = {
    title: string,
    description: string
}
type MaterialObjectType = {
    type: string,
    list: MaterialType[]
}
export default function Product () {
    const navigate = useNavigate();
    const params = useParams();
    const [isWish, setIsWish] = useState<boolean>(false);
    
    const { data, error } = useSWR(`/product/info/${params.id}`, fetcher);
    useEffect(() => {
        if (!data) return;
        if (getWishs()?.split(',').includes(String(data.data.id))) {
            setIsWish(true);
        }
    }, [data]);

    if (error) return <div>error!</div>
    if (!data) return <div>loading...</div>
    
    const onToggleWish = () => {
        if (isWish) {
            delWish(data.data.id);
        } else {
            addWish(data.data.id);
        }
        setIsWish(!isWish)
    }
    const onBack = () => {
        navigate(-1);
    }
    
   
    return (
        <Container>
            <Header>
                <BackButton src={IconBack} onClick={onBack}/>
                <WishButton src={isWish ? IconWishFill : IconWishStroke} onClick={onToggleWish}/>
            </Header>
            <ProductContainer>
                <ProductImage src={'https://kr.object.ncloudstorage.com/blume/' + data.data.imageUrl}/>
                <ProductTitle>{data.data.trans_name}</ProductTitle>
            </ProductContainer>
            <MaterialContainer>
                <MaterialTitle>
                    구조별 전 소재 성분 정보
                </MaterialTitle>
                {data.data.materials.map((materialObject: MaterialObjectType) => 
                    <>
                        <MaterialMenu>
                            {materialObject.type}
                        </MaterialMenu>
                        {materialObject.list.map((material: MaterialType, id: number) =>
                            <MaterialBox
                                key={id} 
                                title={material.title}
                                description={material.description}
                            />
                        )}
                    </>
                )}
                
            </MaterialContainer>
        </Container>
    );
}

// container
const Container = styled.div`
    width: 100vw;
    height: 100vh;
`;

// header
const Header = styled.header`
    width: 100vw;
    height: 50px;
    padding: 12px 24px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px solid #E7E7E7;
`;
const BackButton = styled.img`
    
`;
const WishButton = styled.img`

`;

// product
const ProductContainer = styled.div`
`;

const ProductImage = styled.img`
    border-bottom: 1px solid #E7E7E7;
    width: 100vw;
    height: 100vw;
    object-fit: contain;
`
const ProductTitle = styled.p`
    margin: 0;
    font-size: 17px;
    padding: 12px 24px 6px;
`;

// material
const MaterialContainer = styled.div`
`;

const MaterialTitle = styled.p`
    padding: 6px 24px 12px;
    margin: 0;
    font-size: 14px;
    font-weight: bold;
`;
const MaterialMenu = styled.p`
    width: 100vw;
    height: 40px;

    line-height: 40px;
    font-size: 14px;

    padding: 0px 24px;
    margin: 0;
    background: #F1F1F5;
`;