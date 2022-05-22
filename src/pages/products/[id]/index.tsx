import styled from "@emotion/styled";

import React, { useEffect, useState } from "react";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import useSWR from "swr";
import IconBack from "../../../assets/common/icon_back.svg";
import IconWishFill from "../../../assets/product/icon-wish-fill.png";
import IconWishStroke from "../../../assets/product/icon-wish-stroke.png";
import IconHeartEmpty from "../../../assets/product/icon-heart-empty.svg";
import IconHeartFill from "../../../assets/product/icon-heart-fill.svg";
import MaterialBox from "../../../components/products/materials/MaterialBox";
import {baseURL, fetcher} from "../../../fetch/fetcher";
import { addWish, delWish, getWishs } from "../../../utils/localstorage";
import IconSearch from "../../../assets/common/icon_search.svg";
import IconLogo from "../../../assets/common/maeee_icon.png";
import { useRecoilValue } from "recoil";
import mobile from "../../../recoil/mobile";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import useInput from "../../../hooks/useInput";
import KakaoLogin from "../../../components/common/KakaoLogin";
import Insta_icon from "../../../assets/common/instagram_icon.svg";
import Youtube_icon from "../../../assets/common/youtube_icon.svg";
import axios from "axios";

type MaterialType = {
    title: string;
    description: string;
    orderList?: number;
};
type MaterialObjectType = {
    type: string;
    list: MaterialType[];
    orderList?: number;
};
export default function Product() {
    const navigate = useNavigate();
    const params = useParams();
    const [isWish, setIsWish] = useState<boolean>(false);
    const isMobile = useRecoilValue(mobile);
    const query = useInput("");
    const { data, error } = useSWR(`/product/info/${params.id}`, fetcher);
    const [debounceQuery, setDebounceQuery] = useState<string>("");
    const [timer, setTimer] = useState<any>(undefined); // 디바운싱 타이머
    const location = useLocation();
    const [productList, setProductList] = useState([]);

    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        if (!data) return;

        data.data.materials.map((objs: MaterialObjectType) => {
            // 대분류 orderlist입력
            if (objs.type === "표지층") objs.orderList = 0;
            else if (objs.type === "날개") objs.orderList = 1;
            else if (objs.type === "흡수층") objs.orderList = 2;
            else if (objs.type === "방수충") objs.orderList = 3;
            else if (objs.type === "접착제") objs.orderList = 4;
            else objs.orderList = 10;
            // 숫자가 낮을수록 위로 올라감
            objs.list.sort((a, b) => a.orderList - b.orderList);
        });

        data.data.materials.sort((a,b) => a.orderList - b.orderList);

        setMaterials(data.data.materials);

        console.log(data.data.materials)

        if (getWishs()?.split(",").includes(String(data.data.id))) {
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
    const onSubmit = (query = undefined) => {
        console.log(query);

        axios.get(`${baseURL}/product/search?query=${query || debounceQuery}`).then((result) => {
            setProductList(result.data.data);
        });
    };

    const onClickSubmit = (e: any) => {
        if (e.keyCode === 13) {
            onSubmit();
            navigate(`/products?query=${debounceQuery}`);
        }
    };
    const onChangeInput = (e: any) => {
        setDebounceQuery(e.target.value);
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
                    {materials.map((materialObject: MaterialObjectType, idx : number) => (
                        <div key={idx}>
                            <MaterialMenu>{materialObject.type}</MaterialMenu>
                            {materialObject.list.map((material: MaterialType) => (
                                <MaterialBox
                                    key={material.title}
                                    title={material.title}
                                    description={material.description}
                                />
                            ))}
                        </div>
                    ))}
                </MaterialContainer>
                <Footer>
            1. 서비스 내 모든 성분 해석 정보는 세잎의 단순 ‘의견’입니다.{'\n'}
            2. 성분 해석 정보는 제품 구매를 위한 참고 정보이며, 법적 책임을 지지 않습니다.{'\n'}
            3. 데이터의 오류가 있을 수 있습니다. 제품 구매 전 제조판매업자가 표기한 전성분 표를 한 번 더 확인하시길 권장합니다.{'\n'}
            4. 세잎의 성분 해석 정보를 허가 없이 상업적으로 활용할 경우, 법적 조치를 받을 수 있습니다.{'\n'}
                </Footer>
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
            <HeaderContainer
                css={css`
                    display: flex;
                    align-items: center;
                    width: 1200px;
                    margin: 90px 20px 90px 20px;
                `}
            >
                <a href ="https://www.youtube.com/channel/UCD97T1NyJfkbACBpEQ4rNUQ">
                    <img
                        src ={Youtube_icon}
                        css = {css`
                            position: relative;
                            margin-left: 75px;
                            top: 70%;
                            right: 20px;
                            width: 22px;
                            height: 26px;
                            opacity: 0.5;
                       `}
                    />
                </a>
                <a href ="https://www.instagram.com/3_leaf_official/">
                    <img
                        src ={Insta_icon}
                        css = {css`
                        position: relative;
                        margin-left: 10px;
                        top: 50%;
                        right: 20px;
                        width: 18.82px;
                        height: 18.82px;
                        opacity : 0.5;
                        `}
                    />
                </a>

                <a href="/products">
                    <img
                        src={IconLogo}
                        alt="세잎로고"
                        css={css`
                            display: flex;
                            text-align: center;
                            display: block; 
                            margin: 0px auto;
                            height: 150px;
                            margin-left: 340px;
                        `}
                    />
                </a>
                {/* <a href="https://dullyshin.github.io/" height="5" width="10" target="_blank">
	                <img src="\images\logo.png" alt="위의 이미지를 누르면 연결됩니다.">
                <a> */}
                <div
                    css={css`
                        text-align: center;
                        position: absolute;
                        margin-left: 370px;
                        margin-top: 150px;
                        width: 500px;
                    `}
                >
                    <input
                        css={css`
                            text-align: center;
                            padding: 0px 20px;
                            background: #f7f7f7;
                            border: 2px solid #1ed154;
                            border-radius: 30px;
                            width: 80%;
                            height: 46px;
                        `}
                        {...query}
                        placeholder={"알고 싶은 생리대의 이름을 검색하세요."}
                        onChange={onChangeInput}
                        value={debounceQuery}
                        onKeyDown={onClickSubmit}
                    />
                    <img
                        alt={"검색 아이콘"}
                        src={IconSearch}
                        css={css`
                            position: absolute;
                            top: 50%;
                            right: 80px;
                            width: 18.82px;
                            height: 18.82px;
                            transform: translateY(-50%);
                        `}
                    />
                </div>
                <KakaoLogin></KakaoLogin>
            </HeaderContainer>
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
                        {materials?.length > 0 && materials?.map((materialObject: MaterialObjectType, idx : number) => (
                            <div key={idx}  css={css`border-top: 1px solid #f4f4f4; border-bottom: 1px solid #f4f4f4; `}>

                                <p css={css` font-size: 20px; color: #666666;`}>
                                    {materialObject.type}
                                </p>

                                {materialObject.list.map(
                                    (material: MaterialType, id: number) => (
                                        <MaterialBox
                                            key={id}
                                            title={material.title}
                                            description={material.description}
                                        />
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </article>
            <FooterPC>
            {'\n'}{'\n'}{'\n'}
            1. 서비스 내 모든 성분 해석 정보는 세잎의 단순 ‘의견’입니다.{'\n'}
            2. 성분 해석 정보는 제품 구매를 위한 참고 정보이며, 법적 책임을 지지 않습니다.{'\n'}
            3. 데이터의 오류가 있을 수 있습니다. 제품 구매 전 제조판매업자가 표기한 전성분 표를 한 번 더 확인하시길 권장합니다.{'\n'}
            4. 세잎의 성분 해석 정보를 허가 없이 상업적으로 활용할 경우, 법적 조치를 받을 수 있습니다.{'\n'}
            {'\n'}{'\n'}{'\n'}
            </FooterPC>
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
const Footer = styled.div`
    padding: 20px;
    white-space : pre;
    font-size: 12px;
    color: #666666;
`
const FooterPC = styled.div`
    white-space : pre;
    width: 80vw;
    font-size: 10px;
    color: #666666;
`
const HeaderContainer = styled.div`
    display : flex;
    flex: 1 1 2 2;
`;