import React from 'react';
import styled from "@emotion/styled";

interface InputProps {
    width?: string
    height?: string
    icon?: string
    css?: any
    value?: string
    onChange?: () => void;
}
const Input = ({ width, height, icon, css }: InputProps) => {
    if (!icon) return <InputElement width={width} height={height} css={css}/>;
    return (
        <Container>
            <InputElement width={width} height={height} css={css}/>
            <Icon src={icon}/>
        </Container>
    )
}
const Container = styled.div`
    display: relative;
`;
const InputElement = styled.input<InputProps>`
    width: ${props => props.width};
    height: ${props => props.height};
    border: 0;
    ${props => props.css}
`;
const Icon = styled.img`
    position: relative;
    top: 50%;
    right: 20px;
    translate: translateY(-50%);
`;
export default Input;