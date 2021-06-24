import React, { useCallback, useEffect } from "react";
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
  cursor: pointer;
`;

export const LikeButton = ({ handleClick, id, like, setLike }) => {
  const lists = useSelector((store) => store.user.userInfo.lists);

  const handleLikes = useCallback(() => {
    if (
      (lists && lists.favourites.filter((item) => item.id === id).length > 0) ||
      (lists && lists.ownedgames.filter((item) => item.id === id).length > 0) ||
      (lists && lists.wishlist.filter((item) => item.id === id).length > 0)
    ) {
      return "includes";
    } else {
      return "none";
    }
  }, [id, lists]);

  const render = useCallback(() => {
    return like === "includes" || like === "recent" ? (
      <Favorite style={{ color: red[700] }} />
    ) : (
      <FavoriteBorder />
    );
  }, [like]);

  useEffect(() => {
    setLike(handleLikes());
  }, [setLike, handleLikes]);

  useEffect(() => {
    render();
  }, [render]);

  return <Button onClick={handleClick}> {render()}</Button>;
};
