import styled from '@emotion/styled';
import React from 'react';

interface TextProps {
    fontSize?: number,
    bold?: boolean
    lineHeight?: string,
    textAlign?: 'left' | 'right' | 'center'
    color?: string
    marginBottom?: string
}
const Text = styled.p<TextProps>`
    display: inline-block;
    padding: 0;
    margin: 0;

    font-size: ${props => props.fontSize}px;
    font-weight: ${props => props.bold ? '700' : '400'};
    line-height: ${props => props.lineHeight};
    text-align: ${props => props.textAlign};
    color: ${props => props.color};
    margin-bottom: ${props => props.marginBottom};
`;
Text.defaultProps = {
    fontSize: 14,
    bold: false,
    lineHeight: '150%',
    textAlign: 'left',
    color: '#000000'
}
export default Text;