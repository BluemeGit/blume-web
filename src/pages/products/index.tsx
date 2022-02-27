
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

import MobileHeader from '../../components/common/mobile/MobileHeader';
import AdvertiseBox from '../../components/products/ads/AdvertiseBox';
import Product from '../../components/products/Product';

import { fetcher } from '../../fetch/fetcher';
import useInput from '../../hooks/useInput';

import IconSearch from '../../assets/product/icon-search.png';
import { getWishs } from '../../utils/localstorage';
import { useLocation } from 'react-router-dom';
type ProductType = {
    id: number,
    trans_name: string,
    description: string,
    imageUrl: string
}
type AdsType = {
    title: string,
    ImageURL: string,
}
export default function Products () {
    const query = useInput('');
    const [debounceQuery, setDebounceQuery] = useState<string>('');
    const [timer, setTimer] = useState<any>(undefined); // 디바운싱 타이머
    const [isWish, setIsWish] = useState<boolean>(false);
    const location = useLocation();
    useEffect(() => {
        
        if (timer) {
            clearTimeout(timer);
        }
        const newTimer = setTimeout(async () => {
            setDebounceQuery(query.value);
        }, 800);
        setTimer(newTimer);
    }, [query.value]);
    useEffect(() => {
        // Query String Setting
        const queries = location.search.split('query=');
        if (queries.length > 1) {
            query.onChange(decodeURI(queries[1].split('&')[0]));
        }
    },[]);
    const { data: products, error: productError } = useSWR(`/product/search?query=${debounceQuery}`, fetcher);
    const { data: ads, error: adError } = useSWR('/product/ads', fetcher);
    
    if (productError || adError) return <div>error!</div>
    

    
    return (
        <Container>
            <MobileHeader/>
            <SearchContainer>
                <SearchIcon src={IconSearch}/>
                <Search {...query} placeholder={'사용하고 계신 제품 이름을 검색해보세요!'}/>
            </SearchContainer>
            <ToggleContainer>
                <ToggleButton selected={!isWish} onClick={() => setIsWish(false)}>전체 제품</ToggleButton>
                <ToggleButton selected={isWish} onClick={() => setIsWish(true)}>찜한 제품</ToggleButton>
            </ToggleContainer>  
            
            <ProductContainer>
                {products && ads && products.data.map((product: ProductType, id: number) => {
                    if (isWish && !getWishs()?.includes(String(product.id))) {
                        return <></>;
                    }
                    return (
                        <>
                            <Product
                                imageLink={product.imageUrl}
                                id={product.id}
                                title={product.trans_name}
                                content={product.description}
                            />
                            {id % 4 === 3 && 
                                <AdvertiseBox src={ads.data[Math.floor(id / 4) % ads.data.length].ImageURL}/>
                            }
                        </>
                    );
                })}
            </ProductContainer>  
        </Container>
    );
}

const Container = styled.div`

`;

const SearchContainer = styled.div`
    position: relative;
`
const Search = styled.input`
    width: calc(100% - 2px);
    box-sizing: border-box;
    border: none;
    height: 40px;
    padding: 0px 20px 0px 45px;
`;
const SearchIcon = styled.img`
    position: absolute;
    left: 16px;
    top: 10px;
`;

const ToggleContainer = styled.div`
    border-top: 1px solid #F1F1F5;
    width: 100vw;
    height: 40px;
`;
const ToggleButton = styled.p<{selected?: boolean}>`
    margin: 0;
    line-height: 36px;
    display: inline-block;
    width: 50vw;
    font-size: 13px;
    text-align: center;
    /* font-weight: ${(props) => props.selected ? 'bold' : '400'}; */
    color: ${(props) => props.selected ? '#333333' : '#F1F1F5'};
    border-bottom: 2px solid ${(props) => props.selected ? '#1ED154' : '#F1F1F5'};
`;
const ProductContainer = styled.div`
    
    height: calc(100vh - 101px);
    overflow-y: auto;

    width: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`