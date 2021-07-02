import React from 'react';
import styled from 'styled-components/macro';

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;
const Text = styled.p`
  margin: 5px;
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
`;

export const TransparentBtn = ({ text, handleClick, fontSize, color }) => {
  return (
    <Button onClick={handleClick}>
      <Text size={fontSize} color={color}>
        {text}
      </Text>
    </Button>
  );
};
