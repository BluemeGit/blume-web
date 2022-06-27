import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

import Header from "../../components/common/Header";
import ImageSeacrh from "../../assets/home/image-search.png";
import IconMae from "../../assets/common/icon_maee.svg";
import ProductBox from "../../components/products/ProductBox";
import Footer from "../../components/common/Footer";

import ProductImage1 from "../../assets/home/image_product_1.png";
import ProductImage2 from "../../assets/home/image_product_2.png";
import ProductImage3 from "../../assets/home/image_product_3.png";
import ProductImage4 from "../../assets/home/image_product_4.png";
import IconSearch from "../../assets/common/icon_search.svg";
import ImageRending from "../../assets/common/image-rending.png";

import Aos from "aos";
import "aos/dist/aos.css";
import Text from "../../components/common/Text";
import Image from "../../components/common/Image";
import Input from "../../components/common/Input";
import { useRecoilValue } from "recoil";
import { mobile } from "../../recoil/atom";
import { useNavigate } from "react-router-dom";
import MobileHeader from "../../components/common/mobile/MobileHeader";

export default function Home() {
    const navigate = useNavigate();
    const DownloadRef = useRef<HTMLDivElement | null>(null);
    const isMobile = useRecoilValue(mobile);
    const [query, setQuery] = useState<string>("");
    const onAppDownload = () => {
        window.open(
            "https://play.google.com/store/apps/details?id=com.blume",
            "_blank"
        );
    };
    const goToWeb = () => {
        window.open("/products", "_blank");
    };
    const scrollToDownload = () => {
        if (DownloadRef.current)
            DownloadRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        Aos.init();
    }, []);

    const onSearchEnter = (event: any) => {
        if (event.key === "Enter") {
            navigate(`/products?query=${query}`);
        }
    };
    if (isMobile) {
        return (
            <MobileContainer>
                <MobileHeader />
                <MobilePageContainer
                    data-aos="fade-up"
                    style={{ paddingTop: "120px" }}
                >
                    <Text
                        fontSize={30}
                        bold={true}
                        textAlign={"center"}
                        lineHeight={"130%"}
                    >
                        '나'의 2405일,
                        <br />그 이상을 위한 검색
                    </Text>
                    <div
                        css={css`
                            position: relative;
                            padding: 20px 0px;
                        `}
                    >
                        <input
                            css={css`
                                padding: 0px 10px;
                                width: 204px;
                                height: 27.44px;
                                background: #f7f7f7;
                                border: 2px solid #1ed154;
                                border-radius: 30px;
                            `}
                            onKeyDown={onSearchEnter}
                            onChange={(event: any) =>
                                setQuery(event.target.value)
                            }
                            value={query}
                        />
                        <img
                            alt={"검색 아이콘"}
                            src={IconSearch}
                            css={css`
                                position: absolute;
                                top: 50%;
                                right: 10px;
                                width: 11.22px;
                                height: 12.94px;
                                transform: translateY(-50%);
                            `}
                        />
                    </div>
                    {/* <Image onClick={scrollToDownload} src={ImageSeacrh} alt={'상품 검색'}/> */}
                    <Text
                        fontSize={12}
                        textAlign={"center"}
                        marginBottom={"10px"}
                    >
                        일생의 2405일 동안 15000개의 생리대를 쓰는 우리.
                        <br />그 시간과 개수들은 내 평생의 삶과 직결됩니다.
                    </Text>
                    <Text fontSize={13} textAlign={"center"} bold={true}>
                        그런데 왜<br />
                        모르고 써야하나요?
                    </Text>
                </MobilePageContainer>
                <MobilePageContainer backgroundColor={"#F7FFF9"}>
                    <Text fontSize={20} textAlign={"center"} bold={true}>
                        무의미하던 성분표기
                        <br />
                        <Text fontSize={22} color={"#1ED05B"} bold={true}>
                            해석
                        </Text>
                        해서 의미를 만듭니다
                    </Text>
                    <img
                        alt={"랜딩 이미지"}
                        src={ImageRending}
                        style={{
                            objectFit: "contain",
                            width: "calc(100% - 40px",
                            padding: "20px 0px",
                        }}
                    />
                    <Text
                        fontSize={12}
                        textAlign={"center"}
                        marginBottom={"10px"}
                    >
                        읽기조차 힘든 성분표기,
                        <br />
                        우린 알 수 없었기에 마케팅에 휘둘렸고,
                        <br />
                        업체는 제품보다 마케팅에 집중합니다.
                    </Text>
                    <Text fontSize={12} textAlign={"center"} bold={true}>
                        우리가 알아야 시장이 변화합니다.
                        <br />
                        세잎이 해석하겠습니다.
                    </Text>
                </MobilePageContainer>
                <MobilePageContainer>
                    <Text fontSize={22} textAlign={"center"} bold={true}>
                        그래서 뭐가 좋은 생리대인데?
                        <br />
                        <Text fontSize={22} color={"#1ED05B"} bold={true}>
                            세잎
                        </Text>
                        은 섣불리 추천하지 않습니다.
                    </Text>
                    <PlayerContainer>
                        <ReactPlayer
                            width="100%"
                            height="100%"
                            data-aos="fade-up"
                            url={"https://www.youtube.com/watch?v=yxGBq7fr9fI"}
                            controls={false}
                        />
                    </PlayerContainer>
                    <Text
                        fontSize={12}
                        textAlign={"center"}
                        marginBottom={"20px"}
                    >
                        세잎의 목표는
                        <br />
                        투명하고 건강한 여성용품 생태계를 만드는 것
                    </Text>
                    <Text fontSize={12} textAlign={"center"} bold={true}>
                        이를 위해 답안지같은 추천이 아닌,
                        <br />
                        능동적인 선택을 돕는 콘텐츠를 만듭니다.
                    </Text>
                </MobilePageContainer>
                <MobilePageContainer>
                    <Image
                        data-aos="fade-up"
                        src={IconMae}
                        alt="세잎이"
                        width="80px"
                        style={{ marginBottom: "20px" }}
                    />
                    <ButtonContainer>
                        <Button data-aos="fade-up" onClick={onAppDownload}>
                            세잎 앱 다운로드
                        </Button>
                        <Button data-aos="fade-up" onClick={goToWeb}>
                            세잎 웹으로 이동
                        </Button>
                    </ButtonContainer>
                </MobilePageContainer>
                <Footer data-aos="fade-up" />
            </MobileContainer>
        );
    }
    return (
        <Container>
            <Header />
            <PageContainer data-aos="fade-up">
                <Title>{"‘나’의 2405일,\n그 이상을 위한 검색"}</Title>
                {/* <Image onClick={scrollToDownload} src={ImageSeacrh} alt={'상품 검색'}/> */}
                <div
                    css={css`
                        position: relative;
                        padding: 20px 0px;
                        margin-bottom: 20px;
                    `}
                >
                    <input
                        css={css`
                            width: 380px;
                            height: 52px;
                            background: #f7f7f7;
                            border: 2px solid #1ed154;
                            border-radius: 30px;
                            padding: 0px 20px;
                        `}
                        onKeyDown={onSearchEnter}
                        onChange={(event: any) => setQuery(event.target.value)}
                        value={query}
                    />
                    <img
                        alt={"검색 아이콘"}
                        src={IconSearch}
                        css={css`
                            position: absolute;
                            height: 21.27272605895996px;
                            width: 20.909090042114258px;
                            top: 50%;
                            right: 20px;
                            transform: translateY(-50%);
                        `}
                    />
                </div>
                <Content>
                    {
                        "나는\n일생의 2405일 동안 15000개의 생리대를 씁니다.\n그 시간과 개수들은 내 평생의 삶과 직결됩니다.\n\n그런데 나는 왜.\n모르고 쓰고 있었을까요?"
                    }
                </Content>
            </PageContainer>
            <PageContainer backgroundColor={"#F7FFF9"}>
                <Title data-aos="fade-up">
                    {"무의미하던 성분표기\n"}
                    <BoldGreen>해석</BoldGreen>
                    {"해서 의미를 만듭니다"}
                </Title>
                <ProductContainer data-aos="fade-up" onClick={scrollToDownload}>
                    <ProductBox imageLink={ProductImage1} />
                    <ProductBox imageLink={ProductImage2} />
                    <ProductBox imageLink={ProductImage3} />
                    <ProductBox imageLink={ProductImage4} />
                </ProductContainer>
                <Content data-aos="fade-up">
                    {
                        "읽기조차 힘든 성분표기,\n기준도 명확치 않아 같은 성분을 업체마다 다르게 표기합니다.\n우린 알 수 없었기에 마케팅에 휘둘렸고, 업체는 제품보다 마케팅에 집중합니다.\n\n우리가 알아야 시장이 변화합니다.\n세잎이 해석하겠습니다."
                    }
                </Content>
            </PageContainer>
            <PageContainer data-aos="fade-up">
                <Title data-aos="fade-up">
                    {"그래서 뭐가 좋은 생리대인데?\n"}
                    <BoldGreen>세잎</BoldGreen>
                    {"은 섣불리 추천하지 않습니다"}
                </Title>
                <ReactPlayer
                    data-aos="fade-up"
                    url={"https://www.youtube.com/watch?v=yxGBq7fr9fI"}
                ></ReactPlayer>
                <Content data-aos="fade-up">
                    {
                        "세잎의 목표는\n투명하고 건강한 여성용품 생태계를 만드는 것.\n\n이를 위해 답안지같은 추천이 아닌,\n능동적인 선택을 돕는 콘텐츠를 만듭니다."
                    }
                </Content>
            </PageContainer>
            <PageContainer
                data-aos="fade-up"
                backgroundColor={"#F7FFF9"}
                ref={DownloadRef}
            >
                <Title data-aos="fade-up">
                    {"2022년 1월,\n세잎 앱 서비스 출시 예정"}
                </Title>
                <Image
                    data-aos="fade-up"
                    src={IconMae}
                    alt="세잎이"
                    width="89px"
                />
                <ButtonContainer>
                    <Button data-aos="fade-up" onClick={onAppDownload}>
                        세잎 앱 다운로드
                    </Button>
                    <Button data-aos="fade-up" onClick={goToWeb}>
                        세잎 웹으로 이동
                    </Button>
                </ButtonContainer>
            </PageContainer>
            <Footer data-aos="fade-up" />
        </Container>
    );
}

const MobileContainer = styled.div`
    // display: flex;
    // flex-direction: column;
    // align-items: center;
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
const PlayerContainer = styled.div`
    position: relative;
    margin: 20px 0px;
    width: calc(100vw - 40px);
    height: calc(56.25vw - 22.5px);
    border-radius: 20px;
    overflow: hidden;
`;
const PageContainer = styled.div<{ backgroundColor?: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: ${(props) =>
        props.backgroundColor ? props.backgroundColor : "#FFFFFF"};
    min-height: 700px;
    width: 100%;
    padding: 80px 0px;

    & > * {
        padding-bottom: 40px;
    }
    & > *:last-child {
        padding-bottom: 0px;
    }
`;
const MobilePageContainer = styled.div<{ backgroundColor?: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 40px 0px;

    background: ${(props) =>
        props.backgroundColor ? props.backgroundColor : "#FFFFFF"};
    width: 100%;
`;
const ProductContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    width: 1200px;
    grid-gap: 30px;
`;
const Title = styled.h4`
    font-size: 46px;
    font-weight: 700px;
    text-align: center;
    white-space: pre;
    margin: 0;
`;
const Content = styled.span`
    font-size: 18px;
    text-align: center;
    white-space: pre;
`;
const BoldGreen = styled.b`
    color: #1ed154;
`;

const ButtonContainer = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
`;

const Button = styled.button`
    border-radius: 5px;
    height: 40px;
    width: 120px;
    font-size: 12px;
    background: #1ed154;
    color: #ffffff;
    border: 1px solid #e7e7e7;
    &:hover {
        background: #0dc043;
    }
`;
