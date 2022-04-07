import styled from "@emotion/styled";

import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import IconBack from "../../../assets/common/icon_back.svg";
import IconWishFill from "../../../assets/product/icon-wish-fill.png";
import IconWishStroke from "../../../assets/product/icon-wish-stroke.png";

import IconHeartEmpty from "../../../assets/product/icon-heart-empty.svg";
import IconHeartFill from "../../../assets/product/icon-heart-fill.svg";
import MaterialBox from "../../../components/products/materials/MaterialBox";
import { fetcher } from "../../../fetch/fetcher";
import { addWish, delWish, getWishs } from "../../../utils/localstorage";
import IconSearch from "../../../assets/common/icon_search.svg";
import IconLogo from "../../../assets/common/icon_logo.svg";
import { useRecoilValue } from "recoil";
import mobile from "../../../recoil/mobile";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import useInput from "../../../hooks/useInput";
type MaterialType = {

    title: string,
    description: string,
    orderList? : number
}
type MaterialObjectType = {
    type: string,
    list: MaterialType[],
    orderList? : number
}
export default function Product () {
    const navigate = useNavigate();
    const params = useParams();
    const [isWish, setIsWish] = useState<boolean>(false);
    const isMobile = useRecoilValue(mobile);
    const query = useInput("");
    const { data, error } = useSWR(`/product/info/${params.id}`, fetcher);

    const [materials, setMaterials] = useState([]);



    useEffect(() => {
        if (!data) return;
Wishs()?.split(",").includes(String(data.data.id))) {

        data.data.materials.map((objs: MaterialObjectType) => {
            objs.list.sort((a, b) => a.orderList - b.orderList)
        })

        setMaterials(data.data.materials)

        if (getWishs()?.split(',').includes(String(data.data.id))) {
          setIsWish(true);
        }
    }, [data, materials]);

    if (error) return <div>erro!!!!!!!!!!!!!!!!!!!!r!</div>;
    if (!data) return <div>loading...</div>;

    const onToggleWish = () => {
        if (isWish) {
            delWish(data.data.id);
        } else {
            addWish(data.data.id);
        }
        setIsWish(!isWish);
    };
    const onBack = () => {
        navigate(-1);
    };
    const onSearch = (event: any) => {
        if (event.key === "Enter") {
            navigate(`/products?query=${query.value}`);
        }
    };

    if (isMobile) {
        return (
            <Container>
                <Header>
                    <BackButton src={IconBack} onClick={onBack} />
                    <WishButton
                        src={isWish ? IconWishFill : IconWishStroke}
                        onClick={onToggleWish}
                    />
                </Header>
                <ProductContainer>
                    <ProductImage
                        src={"https://kr.object.ncloudstorage.com/blume/" + data.data.imageUrl}
                    />
                    <ProductTitle>{data.data.trans_name}</ProductTitle>
                </ProductContainer>
                <MaterialContainer>
                    <MaterialTitle>구조별 전 소재 성분 정보</MaterialTitle>
                    {data.data.materials.map((materialObject: MaterialObjectType) => (
                        <>
                            <MaterialMenu>{materialObject.type}</MaterialMenu>
                            {materialObject.list.map((material: MaterialType, id: number) => (
                                <MaterialBox
                                    key={id}
                                    title={material.title}
                                    description={material.description}
                                />
                            ))}
                        </>
                    ))}
                </MaterialContainer>
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
                    margin: 90px 20px 160px 20px;
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
                        onKeyDown={onSearch}
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
            <article
                css={css`
                    display: flex;
                    width: 1200px;
                `}
            >
                <img
                    src={"https://kr.object.ncloudstorage.com/blume/" + data.data.imageUrl}
                    alt={"상품 사진"}
                    css={css`
                        display: block;
                        height: 463px;
                        width: 463px;
                        margin-right: 80px;
                        box-shadow: 0px 1px 30px 1px rgba(0, 0, 0, 0.1);
                        border-radius: 3px;
                    `}
                />
                <div>
                    <div
                        css={css`
                            display: flex;
                            align-items: center;
                            width: calc(1200px - 543px);
                        `}
                    >
                        <img
                            src={isWish ? IconHeartFill : IconHeartEmpty}
                            onClick={onToggleWish}
                            alt={"찜"}
                            css={css`
                                width: 56px;
                                padding: 12px;
                                border: 1px solid #dddddd;
                                border-radius: 5px;
                                margin-right: 20px;
                            `}
                        />
                        <p
                            css={css`
                                font-size: 34px;
                                font-weight: 700;
                                margin: 0;
                            `}
                        >
                            {data.data.trans_name}
                        </p>
                    </div>
                    <p
                        css={css`
                            font-size: 16px;
                            font-weight: 500;
                            color: #999999;
                        `}
                    >
                        {data.data.description}
                    </p>
                    <div>

                        {materials?.length > 0 && materials?.map((materialObject: MaterialObjectType) => 
                            <div css={css`
                                border-top: 1px solid #f4F4F4;
                                border-bottom: 1px solid #f4F4F4;
                            `}>
                                <p css={css`
                                    font-size: 20px;
                                    color: #666666;

                                `}>{materialObject.type}</p>
                                {materialObject.list.map((material: MaterialType, id: number) =>
                                    <MaterialBox
                                        key={id}
                                        title={material.title}
                                        description={material.description}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </article>
        </div>
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

    border-bottom: 1px solid #e7e7e7;
`;
const BackButton = styled.img`
    height: 25px;
`;
const WishButton = styled.img``;

// product
const ProductContainer = styled.div``;

const ProductImage = styled.img`
    border-bottom: 1px solid #e7e7e7;
    width: 100vw;
    height: 100vw;
    object-fit: contain;
`;
const ProductTitle = styled.p`
    margin: 0;
    font-size: 17px;
    padding: 12px 24px 6px;
`;

// material
const MaterialContainer = styled.div``;

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
    background: #f1f1f5;
`;
