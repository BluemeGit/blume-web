
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

import MobileHeader from '../../components/common/mobile/MobileHeader';
import AdvertiseBox from '../../components/products/ads/AdvertiseBox';
import Product from '../../components/products/Product';

import { fetcher } from '../../fetch/fetcher';
import useInput from '../../hooks/useInput';

import IconSearch from '../../assets/product/icon-search.png';
type ProductType = {
    id: number,
    name: string,
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

    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
        }
        const newTimer = setTimeout(async () => {
            setDebounceQuery(query.value);
        }, 800);
        setTimer(newTimer);
    }, [query.value]);
    
    const { data: products, error: productError } = useSWR(`/product/search?query=${debounceQuery}`, fetcher);
    const { data: ads, error: adError } = useSWR('/product/ads', fetcher);
    
    if (productError || adError) return <div>error!</div>
    

    
    return (
        <Container>
            <MobileHeader/>
            <SearchContainer>
                <SearchIcon src={IconSearch}/>
                <Search {...query} placeholder={'사용하고 계신 제품명을 검색해보세요!'}/>
            </SearchContainer>
            {products && ads &&
                <ProductContainer>
                    {products.data.map((product: ProductType, id: number) => 
                        <>
                            <Product
                                imageLink={product.imageUrl}
                                id={product.id}
                                title={product.name}
                                content={product.description}
                            />
                            {id % 4 === 3 && 
                                <AdvertiseBox src={ads.data[Math.floor(id / 4) % ads.data.length].ImageURL}/>
                            }
                        </>
                    )}
                </ProductContainer>
            }       
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
const ProductContainer = styled.div`
    height: calc(100vh - 101px);
    overflow-y: auto;

    width: 100%;
    border-top: 6px solid #F1F1F5;
`