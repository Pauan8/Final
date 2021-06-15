import React from 'react';
import styled from 'styled-components/macro';

const Btn = styled.button`
  background: white;
  box-shadow: 2px 2px 1px 2px grey;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  padding: 5px;
  width: 100px;
  position: relative;

  &:hover {
    background: #f2d3ac;
  }

  &:active {
    box-shadow: none;
    transform: translateY(4px);
    transform: translateX(4px);
  }
`;

export const Button = ({ text, handleClick }) => {
  return <Btn onClick={handleClick}>{text}</Btn>;
};
