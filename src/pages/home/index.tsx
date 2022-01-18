import styled from '@emotion/styled';
import React from 'react';
import Header from '../../components/common/Header';
import ReactPlayer from 'react-player/youtube'
import ImageSeacrh from '../../assets/home/image-search.png';
import IconMae from '../../assets/common/icon-mae.png';
import ProductBox from '../../components/products/ProductBox';
import Footer from '../../components/common/Footer';
export default function Home () {
    const onSearch = () => {
        alert('아직 검색 서비스가 준비되지 않았습니다.');
    }
    const onAppDownload = () => {
        alert('아직 앱 서비스가 준비되지 않았습니다.');
    }
    
    return (
        <Container>
            <Header></Header>
            <PageContainer>
                <Title>{'‘나’의 2405일,\n그 이상을 위한 검색'}</Title>
                <img onClick={onSearch} src={ImageSeacrh} alt={'상품 검색'}/>
                <Content>{'나는 12세에 첫 생리를 하고, 49세 즈음 폐경을 맞습니다.\n1년 중 65일, 일생 중 2405일 동안 15000개의 생리대를 씁니다.\n그 시간과 개수들은 내 평생의 삶과 직결됩니다.\n\n그런데 나는 왜?\n모르고 쓰고 있었을까?'}</Content>
            </PageContainer>
            <PageContainer backgroundColor={'#F7FFF9'}>
                <Title>{'무의미하던 성분표기\n'}<BoldGreen>해석</BoldGreen>{'해서 의미를 만듭니다'}</Title>
                <ProductContainer>
                    <ProductBox/>
                    <ProductBox/>
                    <ProductBox/>
                    <ProductBox/>
                    {/* <ProductBox/>
                    <ProductBox/>
                    <ProductBox/>
                    <ProductBox/> */}
                </ProductContainer>
                <Content>{'읽기조차 힘든 성분표기,\n기준도 명확치 않아 같은 성분을 업체마다 다르게 표기합니다.\n우린 알 수 없었기에 마케팅에 휘둘렸고, 업체는 제품보다 마케팅에 집중합니다.\n\n우리가 알아야 시장이 변화합니다.\n세잎이 해석하겠습니다.'}</Content>
            </PageContainer>
            <PageContainer>
                <Title>{'그래서 뭐가 좋은 생리대인데?\n'}<BoldGreen>세잎</BoldGreen>{'은 섣불리 추천하지 않습니다'}</Title>
                <ReactPlayer url={'https://www.youtube.com/watch?v=yxGBq7fr9fI'}></ReactPlayer>
                <Content>{'세잎의 목표는\n투명하고 건강한 여성용품 생태계를 만드는 것.\n\n이를 위해 답안지같은 추천이 아닌,\n능동적인 선택을 돕는 콘텐츠를 만듭니다.'}</Content>
            </PageContainer>
            <PageContainer backgroundColor={'#F7FFF9'}>
                <Title>{'2022년 1월,\n세잎 앱 서비스 출시 예정'}</Title>
                <img src={IconMae} alt='세잎이'/>
                <Button onClick={onAppDownload}>세잎 앱 다운로드</Button>
            </PageContainer>
            <Footer/>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
const PageContainer = styled.div<{backgroundColor?: string}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${props => props.backgroundColor ? props.backgroundColor : '#FFFFFF'};
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
    color: #1ED154;
`;
const Button = styled.button`
    border-radius: 20px;
    height: 40px;
    width: 120px;
    background: #1ED154;
    color: #ffffff;
    border: 1px solid #E7E7E7;
    &:hover{
        background: #0DC043;
    }
`;