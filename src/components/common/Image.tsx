import styled from '@emotion/styled';
import React from 'react';

interface ImageProps {
    width?: string,
    height?: string,
    objectFit?: 'contain' | 'cover'
}
const Image = styled.img<ImageProps>`
    width: ${props => props.width};
    height: ${props => props.height};
    object-fit: ${props => props.objectFit};
`;
Image.defaultProps = {
    
    objectFit: 'contain'
}
export default Image;