import styled from "@emotion/styled";

import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import useSWR from "swr";
import IconBack from "../../../assets/common/icon_back.svg";
import IconWishFill from "../../../assets/product/icon-wish-fill.png";
import IconWishStroke from "../../../assets/product/icon-wish-stroke.png";
import IconHeartEmpty from "../../../assets/product/icon-heart-empty.svg";
import IconHeartFill from "../../../assets/product/icon-heart-fill.svg";
import MaterialBox from "../../../components/products/materials/MaterialBox";
import { baseURL, fetcher } from "../../../fetch/fetcher";
import { addWish, delWish, getWishs } from "../../../utils/localstorage";
import IconSearch from "../../../assets/common/icon_search.svg";
import IconLogo from "../../../assets/common/maeee_icon.png";
import { useRecoilValue, useRecoilState } from "recoil";

import { mobile } from "../../../recoil/atom";
import Comment from "../../../components/comment/Comment";
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

    const [productList, setProductList] = useState([]);

    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        if (!data) return;

        data.data.materials.map((objs: MaterialObjectType) => {
            // ????????? orderlist??????
            if (objs.type === "?????????") objs.orderList = 0;
            else if (objs.type === "??????") objs.orderList = 1;
            else if (objs.type === "?????????") objs.orderList = 2;
            else if (objs.type === "?????????") objs.orderList = 3;
            else if (objs.type === "?????????") objs.orderList = 4;
            else objs.orderList = 10;
            // ????????? ???????????? ?????? ?????????
            objs.list.sort((a, b) => a.orderList - b.orderList);
        });

        data.data.materials.sort((a, b) => a.orderList - b.orderList);

        setMaterials(data.data.materials);

        if (getWishs()?.split(",").includes(String(data.data.id))) {
            setIsWish(true);
        }
    }, [data, materials]);

    if (error) return <div>error!!!</div>;
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

        axios
            .get(`${baseURL}/product/search?query=${query || debounceQuery}`)
            .then((result) => {
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
                        src={
                            "https://kr.object.ncloudstorage.com/blume/" +
                            data.data.imageUrl
                        }
                    />
                    <ProductTitle>{data.data.trans_name}</ProductTitle>
                </ProductContainer>
                <MaterialContainer>
                    <MaterialTitle>????????? ??? ?????? ?????? ??????</MaterialTitle>
                    {materials.map(
                        (materialObject: MaterialObjectType, idx: number) => (
                            <div key={idx}>
                                <MaterialMenu>
                                    {materialObject.type}
                                </MaterialMenu>
                                {materialObject.list.map(
                                    (material: MaterialType) => (
                                        <MaterialBox
                                            key={material.title}
                                            title={material.title}
                                            description={material.description}
                                        />
                                    )
                                )}
                            </div>
                        )
                    )}
                </MaterialContainer>
                {/* <PlayerContainer>
                    <ReactPlayer
                        width="100%"
                        height="100%"
                        data-aos="fade-up"
                        url={"https://www.youtube.com/watch?v=yxGBq7fr9fI"}
                        controls={false}
                    />
                </PlayerContainer> */}

                <CommentMobile>
                    <Comment />
                </CommentMobile>
                <Footer>
                    1. ????????? ??? ?????? ?????? ?????? ????????? ????????? ?????? ?????????????????????.
                    {"\n"}
                    2. ?????? ?????? ????????? ?????? ????????? ?????? ?????? ????????????, ??????
                    ????????? ?????? ????????????.
                    {"\n"}
                    3. ???????????? ????????? ?????? ??? ????????????.
                    {"\n"}?????? ?????? ??? ????????????????????? ????????? ????????? ?????? ??? ???
                    ??? ??????????????? ???????????????.{"\n"}
                    4. ????????? ?????? ?????? ????????? ?????? ?????? ??????????????? ????????? ??????,
                    {"\n"}?????? ????????? ?????? ??? ????????????.{"\n"}
                </Footer>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        backgroundColor: "#1ED154",
                        height: "3rem",
                        bottom: "0rem",
                        width: "100%",
                    }}
                >
                    <a
                        style={{
                            color: "white",
                            fontWeight: "bold",
                            textDecoration: "none",
                        }}
                        href={`https://search.shopping.naver.com/search/all?query=${data.data.trans_name}`}
                    >
                        ????????? ?????????
                    </a>
                    <a
                        style={{
                            color: "white",
                            fontWeight: "bold",
                            textDecoration: "none",
                        }}
                        href={`http://search.danawa.com/dsearch.php?k1=${data.data.trans_name}`}
                    >
                        ????????? ?????????
                    </a>
                </div>

                <div style={{ height: "3rem" }}></div>
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
                    justify-content: space-between;
                    width: 1200px;
                    margin: 90px 20px 90px 20px;
                `}
            >
                <div
                    css={css`
                        justify-content: center;
                    `}
                >
                    <a href="https://www.youtube.com/channel/UCD97T1NyJfkbACBpEQ4rNUQ">
                        <img
                            src={Youtube_icon}
                            css={css`
                                position: relative;
                                right: 22px;
                                width: 25px;
                                height: 20px;
                                margin-left: 20px;
                                opacity: 0.5;
                            `}
                        />
                    </a>
                    <a href="https://www.instagram.com/3_leaf_official/">
                        <img
                            src={Insta_icon}
                            css={css`
                                position: relative;
                                top: -1px;
                                right: 22px;
                                width: 22px;
                                height: 18px;
                                margin-left: 20px;
                                opacity: 0.5;
                            `}
                        />
                    </a>
                    <a
                        href="/"
                        css={css`
                            text-decoration-line: none;
                            position: relative;
                            top: -5px;
                            right: 22px;
                            width: 22px;
                            height: 19px;
                            margin-left: 20px;
                            opacity: 0.5;
                            color: black;
                            font-size: small;
                            font-weight: bold;
                            cursor: pointer;
                            padding: 10px; ;
                        `}
                    >
                        <span>?????? ??????</span>
                    </a>
                </div>
                <a href="/products">
                    <img
                        src={IconLogo}
                        alt="????????????"
                        css={css`
                            display: flex;
                            display: block;
                            height: 150px;
                            margin-right: 100px;
                        `}
                    />
                </a>
                <KakaoLogin></KakaoLogin>
            </HeaderContainer>
            {/* <a href="https://dullyshin.github.io/" height="5" width="10" target="_blank">
	                <img src="\images\logo.png" alt="?????? ???????????? ????????? ???????????????.">
                <a> */}
            <div
                css={css`
                    text-align: center;
                    position: absolute;
                    margin-top: 200px;
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
                    placeholder={"?????? ?????? ???????????? ????????? ???????????????."}
                    onChange={onChangeInput}
                    value={debounceQuery}
                    onKeyDown={onClickSubmit}
                />
                <img
                    alt={"?????? ?????????"}
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

            <article
                css={css`
                    display: flex;
                    width: 1200px;
                `}
            >
                <img
                    src={
                        "https://kr.object.ncloudstorage.com/blume/" +
                        data.data.imageUrl
                    }
                    alt={"?????? ??????"}
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
                        {materials?.length > 0 &&
                            materials?.map(
                                (
                                    materialObject: MaterialObjectType,
                                    idx: number
                                ) => (
                                    <div
                                        key={idx}
                                        css={css`
                                            border-top: 1px solid #f4f4f4;
                                            border-bottom: 1px solid #f4f4f4;
                                        `}
                                    >
                                        <p
                                            css={css`
                                                font-size: 20px;
                                                color: #666666;
                                            `}
                                        >
                                            {materialObject.type}
                                        </p>

                                        {materialObject.list.map(
                                            (
                                                material: MaterialType,
                                                id: number
                                            ) => (
                                                <MaterialBox
                                                    key={id}
                                                    title={material.title}
                                                    description={
                                                        material.description
                                                    }
                                                />
                                            )
                                        )}
                                    </div>
                                )
                            )}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row-reverse",
                            backgroundColor: "1ED154",
                            marginTop: "1rem",
                            marginBottom: "5rem",
                        }}
                    >
                        <a
                            style={{
                                // marginLeft: "auto",
                                padding: "0.5rem",
                                paddingTop: "14px",
                                width: "9rem",
                                textAlign: "center",
                                backgroundColor: "#1ED154",
                                borderRadius: "6px",
                                color: "white",
                                fontWeight: "bold",
                                textDecoration: "none",
                                marginBottom: "2rem",
                                verticalAlign: "middle",

                                fontSize: "1.2rem",
                            }}
                            href={`https://search.shopping.naver.com/search/all?query=${data.data.trans_name}`}
                        >
                            ????????? ?????????
                        </a>

                        <a
                            style={{
                                // marginLeft: "auto",
                                padding: "0.5rem",
                                paddingTop: "14px",

                                width: "9rem",
                                textAlign: "center",
                                backgroundColor: "#1ED154",
                                borderRadius: "6px",
                                color: "white",
                                fontWeight: "bold",
                                textDecoration: "none",
                                marginBottom: "2rem",
                                marginRight: "1rem",
                                verticalAlign: "middle",
                                // height: "2.5rem",
                                fontSize: "1.2rem",

                                height: "56px",
                            }}
                            href={`http://search.danawa.com/dsearch.php?k1=${data.data.trans_name}`}
                        >
                            ????????? ?????????
                        </a>

                        <img
                            src={isWish ? IconHeartFill : IconHeartEmpty}
                            onClick={onToggleWish}
                            alt={"???"}
                            css={css`
                                width: 56px;
                                padding: 12px;
                                border: 1px solid #dddddd;
                                border-radius: 5px;
                                margin-right: 20px;
                                height: 56px;
                                /* margin-left: "auto"; */
                            `}
                        />
                    </div>
                </div>
            </article>
            <CommentBox>
                <Comment />
            </CommentBox>
            <FooterPC>
                {"\n"}
                {"\n"}
                {"\n"}
                1. ????????? ??? ?????? ?????? ?????? ????????? ????????? ?????? ?????????????????????.
                {"\n"}
                2. ?????? ?????? ????????? ?????? ????????? ?????? ?????? ????????????, ?????? ?????????
                ?????? ????????????.{"\n"}
                3. ???????????? ????????? ?????? ??? ????????????. ?????? ?????? ??? ?????????????????????
                ????????? ????????? ?????? ??? ??? ??? ??????????????? ???????????????.{"\n"}
                4. ????????? ?????? ?????? ????????? ?????? ?????? ??????????????? ????????? ??????,
                ?????? ????????? ?????? ??? ????????????.{"\n"}
                {"\n"}
                {"\n"}
                {"\n"}
            </FooterPC>
        </div>
    );
}

// container
const Container = styled.div`
    width: 100vw;
    height: 100vh;
`;
const PlayerContainer = styled.div`
    position: relative;
    margin: 20px;
    width: calc(100vw - 40px);
    height: calc(56.25vw - 22.5px);
    border-radius: 20px;
    overflow: hidden;
`;
const CommentBox = styled.section`
    // position: relative;
    padding: 5rem;
    border-top: 1px solid #e7e7e7;
    min-width: 1200px;
`;

const CommentMobile = styled.div`
    margin-left : 100px
    min-width: 10px;
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
    white-space: pre;
    font-size: 10px;
    color: #666666;
`;
const FooterPC = styled.div`
    white-space: pre;
    width: 80vw;
    font-size: 10px;
    color: #666666;
`;

const HeaderContainer = styled.div`
    display: flex;
    flex: 1 1 2 2;
`;
