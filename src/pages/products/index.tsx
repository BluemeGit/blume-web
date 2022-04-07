import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import MobileHeader from "../../components/common/mobile/MobileHeader";
import AdvertiseBox from "../../components/products/ads/AdvertiseBox";
import Product from "../../components/products/Product";

import { fetcher } from "../../fetch/fetcher";
import useInput from "../../hooks/useInput";

import IconSearch from "../../assets/common/icon_search.svg";
import IconLogo from "../../assets/common/icon_logo.svg";
import { getWishs } from "../../utils/localstorage";
import { useLocation, useNavigate } from "react-router-dom";
import mobile from "../../recoil/mobile";
import { useRecoilValue } from "recoil";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
//
type ProductType = {
    id: number;
    trans_name: string;
    description: string;
    imageUrl: string;
};
type AdsType = {
    title: string;
    ImageURL: string;
};
export default function Products() {
    const query = useInput("");
    const [debounceQuery, setDebounceQuery] = useState<string>("");
    const [timer, setTimer] = useState<any>(undefined); // 디바운싱 타이머
    const [isWish, setIsWish] = useState<boolean>(false);
    const isMobile = useRecoilValue(mobile);
    const location = useLocation();
    const navigate = useNavigate();
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
        const queries = location.search.split("query=");
        if (queries.length > 1) {
            query.onChange(decodeURI(queries[1].split("&")[0]));
        }
    }, []);
    const { data: products, error: productError } = useSWR(
        `/product/search?query=${debounceQuery}`,
        fetcher
    );
    const { data: ads, error: adError } = useSWR("/product/ads", fetcher);



    if (isMobile) {
        return (
            <Container>
                <MobileHeader />
                <SearchContainer>
                    <SearchIcon src={IconSearch} />
                    <Search {...query} placeholder={"사용하고 계신 제품 이름을 검색해보세요!"} />
                </SearchContainer>
                <ToggleContainer>
                    <ToggleButton selected={!isWish} onClick={() => setIsWish(false)}>
                        전체 제품
                    </ToggleButton>
                    <ToggleButton selected={isWish} onClick={() => setIsWish(true)}>
                        찜한 제품
                    </ToggleButton>
                </ToggleContainer>

                <ProductContainer>
                    {products &&
                        ads &&
                        products.data.map((product: ProductType, id: number) => {
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
                                    {id % 4 === 3 && (
                                        <AdvertiseBox
                                            src={
                                                ads.data[Math.floor(id / 4) % ads.data.length]
                                                    .ImageURL
                                            }
                                        />
                                    )}
                                </>
                            );
                        })}
                </ProductContainer>
            </Container>
        );
    }
    return (
        <div
            css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100vw;
            `}
        >
            <header
                css={css`
                    display: flex;
                    align-items: center;
                    width: 1200px;
                    margin: 90px 20px 90px 20px;
                `}
            >
                <a href="/products">
                    <img
                        src={IconLogo}
                        alt="세잎로고"
                        css={css`
                            display: block;
                            height: 49px;
                            margin-right: 16px;
                        `}
                    />
                </a>
                {/* <a href="https://dullyshin.github.io/" height="5" width="10" target="_blank">
	                <img src="\images\logo.png" alt="위의 이미지를 누르면 연결됩니다.">
                <a> */}
                /* */
                <div
                    css={css`
                        position: relative;
                        width: 342px;
                        height: 46px;
                    `}
                >
                    <input
                        css={css`
                            padding: 0px 20px;
                            background: #f7f7f7;
                            border: 2px solid #1ed154;
                            border-radius: 30px;
                            width: 100%;
                            height: 46px;
                        `}
                        {...query}
                        placeholder={"알고 싶은 생리대의 이름을 검색하세요."}
                    />
                    <img
                        alt={"검색 아이콘"}
                        src={IconSearch}
                        css={css`
                            position: absolute;
                            top: 50%;
                            right: 20px;
                            width: 18.82px;
                            height: 18.82px;
                            transform: translateY(-50%);
                        `}
                    />
                </div>
            </header>
            <section
                css={css`
                    width: 1060px;
                `}
            >
                <div
                    css={css`
                        margin-bottom: 48px;
                    `}
                >
                    <ToggleButtonPC selected={!isWish} onClick={() => setIsWish(false)}>
                        전체 제품
                    </ToggleButtonPC>
                    <ToggleButtonPC selected={isWish} onClick={() => setIsWish(true)}>
                        찜한 제품
                    </ToggleButtonPC>
                </div>
                <div
                    css={css`
                        display: grid;
                        grid-template-columns: 235px 235px 235px 235px;
                        gap: 40px 40px;
                    `}
                >
                    {products &&
                        ads &&
                        products.data.map((product: ProductType, id: number) => {
                            if (isWish && !getWishs()?.includes(String(product.id))) {
                                return <></>;
                            }
                            return (
                                <>
                                    <div
                                        css={css`
                                            cursor: pointer;
                                        `}
                                        onClick={() => navigate(`/products/${product.id}`)}
                                    >
                                        <img
                                            src={
                                                "https://kr.object.ncloudstorage.com/blume/" +
                                                product.imageUrl
                                            }
                                            alt={"상품이미지"}
                                            css={css`
                                                width: 235px;
                                                height: 235px;
                                                background: url(image.png);
                                                box-shadow: 0px 1px 30px 1px rgba(0, 0, 0, 0.1);
                                                border-radius: 3px;
                                            `}
                                        />
                                        <p
                                            css={css`
                                                font-size: 16px;
                                            `}
                                        >
                                            {product.trans_name}
                                        </p>
                                        <p
                                            css={css`
                                                font-size: 11px;
                                                color: #999999;
                                            `}
                                        >
                                            {product.description}
                                        </p>
                                    </div>
                                </>
                            );
                        })}
                </div>
            </section>
        </div>
    );
}
const ToggleButtonPC = styled.p<{ selected?: boolean }>`
    display: inline-block;
    cursor: pointer;
    color: ${(props) => (props.selected ? "#1ED154" : "#000000")};
    font-size: 20px;
    line-height: 26px;
    padding-bottom: 5px;
    border-bottom: ${(props) => (props.selected ? "2px solid #1ED154" : "0")};
    margin-right: 16px;
`;
const Container = styled.div``;

const SearchContainer = styled.div`
    position: relative;
`;
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
    border-top: 1px solid #f1f1f5;
    width: 100vw;
    height: 40px;
`;
const ToggleButton = styled.p<{ selected?: boolean }>`
    margin: 0;
    line-height: 36px;
    display: inline-block;
    width: 50vw;
    font-size: 13px;
    text-align: center;
    /* font-weight: ${(props) => (props.selected ? "bold" : "400")}; */
    color: ${(props) => (props.selected ? "#333333" : "#F1F1F5")};
    border-bottom: 2px solid ${(props) => (props.selected ? "#1ED154" : "#F1F1F5")};
`;
const ProductContainer = styled.div`
    height: calc(100vh - 101px);
    overflow-y: auto;

    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;
