import React, { useState } from "react";
import styled from "styled-components/macro";
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const Button = styled.button`
    background: transparent;
    width: 30px;
    height: 30px;
    border: none;
    font-size: 30px;
    position: absolute;
    bottom: 10px;
    right: 10px;
`

export const LikeButton = ({handleClick}) => {
const [like, setLike] = useState(false)
    return <Button onClick = {handleClick} > {like? <Favorite /> : <FavoriteBorder />}
    </Button>
}