import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import { RemoveGame } from '../User/RemoveGame'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const ListTitle = styled.h2`
  color: #f2d3ac;
  margin-top: 0;
  text-align: center;
`;

const GameList = styled.ul`
  display: ${(props) => (props.active === props.name ? "block" : "none")};
  background: ${(props) =>
  props.active === props.name ? "#D9756C" : "#F2D3AC"};
  margin: 0;
  margin-bottom: 10px;
  width: 300px;
  height: 460px;
  border: solid #a65151 0.5px;
  padding: 20px;
  padding-bottom: 24px;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: #a65151 transparent;


&::-webkit-scrollbar {
  width: 12px;
}

&::-webkit-scrollbar-track {
  background: transparent;
}

&::-webkit-scrollbar-thumb {
  background-color: #a65151;
  border-radius: 20px;
  border: 3px solid #a65151;
}
`;

const Game = styled.li`
  margin-bottom: 20px;
  list-style-type: none;
  border: solid #a65151;
  background: #f2d3ac;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageContainer = styled.div`
overflow: hidden;
border-right: solid #a65151;
background: white;
width: 100px;
min-width: 100px;
height: 100px;
display: flex;
align-items: center;
justify-content: center;
`
const GameImg = styled.img`
height: 100%;
object-fit: cover;
`

const GameLink = styled(Link)`
  text-decoration: none;
  color: #a65151;
  display: block;
  margin-left: 10px;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  height: 40px;
  width: 40px;
  background: ${(props) =>
    props.active === props.name ? "#D9756C" : "#F2D3AC"};
  border: solid #a65151 0.5px;
  border-bottom: none;
`;

export const ProfileGameList = () => {
  const profile = useSelector((store) => store.user.userInfo);
  const [active, setActive] = useState("favourites");

  const displayList = (type) => {
    if (profile.lists) {
      return profile.lists[type].map((game) => (
        <Game>
         <ImageContainer >
           <GameImg src={game.thumb_url} /> 
           </ImageContainer>
           <GameLink to={`/game/${game.id}`}>{game.name}</GameLink> <RemoveGame type={type} id={game.id} />
        </Game>
      ));
    }
  };

  const handleClick = (listtype) => {
    setActive(listtype);
  };

  return (
    <Wrapper>
      <ButtonContainer>
        <Button
          active={active}
          name="favourites"
          onClick={() => handleClick("favourites")}
        >
          💗
        </Button>
        <Button
          active={active}
          name="wishlist"
          onClick={() => handleClick("wishlist")}
        >
          💎
        </Button>
        <Button
          active={active}
          name="ownedgames"
          onClick={() => handleClick("ownedgames")}
        >
          ✅
        </Button>
      </ButtonContainer>
      <GameList active={active} name="favourites">
        <ListTitle>Favourites</ListTitle>
        {displayList("favourites")}
      </GameList>
      <GameList active={active} name="wishlist">
        <ListTitle>Wish-list</ListTitle>
        {displayList("wishlist")}
      </GameList>
      <GameList active={active} name="ownedgames">
        <ListTitle>Owned games</ListTitle>
        {displayList("ownedgames")}
      </GameList>
    </Wrapper>
  );
};
