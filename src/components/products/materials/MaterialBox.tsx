import styled from '@emotion/styled';
import { prependListener } from 'process';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import IconArrowDown from '../../../assets/material/icon-arrow-down.png';
import IconArrowRight from '../../../assets/material/icon-arrow-right.png';
import { mobile } from '../../../recoil/atom';
type MaterialBoxType = {
    title: string,
    description: string
}
export default function MaterialBox ({
    title,
    description
}: MaterialBoxType) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const isMobile = useRecoilValue(mobile);
    if (isMobile) {
        return (
            <Container>
                <TitleContainer onClick={() => setIsOpen(!isOpen)}>
                    <Title>
                        {title}
                    </Title>
                    <OpenButton src={isOpen ? IconArrowDown : IconArrowRight}/>
                </TitleContainer>
                {isOpen &&
                    <Description>
                        {description}
                    </Description>
                }
            </Container>
        )
    }
    return (
        <div onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' , whiteSpace:'pre-line'}}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <p style={{ fontSize: '16px', fontWeight: 'bold'}}>{title}</p>
                <OpenButton src={isOpen ? IconArrowDown : IconArrowRight}/>
            </div>
            {isOpen &&
                <p style={{ fontSize: '16px', color: '#333' , }}>{description}</p>
            }
        </div>
    );
}

const Container = styled.div`
    
`;
const TitleContainer = styled.div`
    height: 45px;
    padding: 0px 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #E7E7E7;
`
const Title = styled.p`
    margin: 0;
    font-size: 14px;
`
const OpenButton = styled.img`
    
`;
const Description = styled.p`
    margin: 0;
    width: 100vw;
    padding: 10px 24px;
    font-size: 12px;
    color: #464646;
    border-bottom: 1px solid #E7E7E7;
    white-space: pre-wrap;
    
`;