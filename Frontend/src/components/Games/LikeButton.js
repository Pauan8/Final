import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import Favorite from "@material-ui/icons/Favorite";
import { red } from "@material-ui/core/colors";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { useSelector } from "react-redux";

const Button = styled.button`
  background: transparent;
  width: 30px;
  height: 30px;
  border: none;
  font-size: 30px;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export const LikeButton = ({ handleClick, id, like, setLike }) => {
  const lists = useSelector((store) => store.user.userInfo.lists);

  const handleLikes = () => {
    if (
      lists && lists.favourites.filter((item) => item.id === id).length > 0 ||
      lists && lists.ownedgames.filter((item) => item.id === id).length > 0 ||
      lists && lists.wishlist.filter((item) => item.id === id).length > 0
    ) {
      return "includes";
    } else {
      return "none";
    }
  };

  const render = () => {
    return like === "includes" || like === "recent" ? (
      <Favorite style={{ color: red[700] }} />
    ) : (
      <FavoriteBorder />
    );
  };

  useEffect(() => {
    setLike(handleLikes());
    render();
  }, [setLike]);

  return <Button onClick={handleClick}> {render()}</Button>;
};
