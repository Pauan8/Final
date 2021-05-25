import React from 'react'
import styled from 'styled-components/macro'

const Btn = styled.button`
background: white;
box-shadow: 2px 2px 2px 3px grey;
font-size: 18px;
border: none;
border-radius: 10px;
padding: 5px;
width: 100px;

&:hover{
    background: #B5D5B5
}

&:active{
    box-shadow: none;
}`;

export const Button = ({text, handleClick}) => {
    return <Btn onClick={handleClick}>{text}</Btn>
}