import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import { useDispatch, useSelector } from 'react-redux'

import mechanics from '../data/mechanics.json'
import categories from '../data/categories.json'
import { fetchSingleGame } from '../reducers/boardGames'
import { Menu } from '../components/Menu'

const Wrapper = styled.div`
position: relative;
display: flex;
flex-direction: column;
align-items: center;`

const ImageContainer = styled.div`
width: 300px;
height: 200px;
overflow: hidden;
`

const Image = styled.img`
height: 100%;
min-width: 100%;
object-fit: cover;`

const Title = styled.h1`
font-size: 22px;
margin: 20px;`

const Bold = styled.span `
font-weight: 600;`

const Text = styled.p`
width: 300px;`

const SingleGame = () => {
  const arr = [];
  const dispatch = useDispatch();
  const { Id } = useParams()
  const game= useSelector((store) => store.boardGames.game)

  useEffect(() => {
      dispatch(fetchSingleGame(Id))
  }, [Id, dispatch])

  const renderGameInfo = (name, value1, value2) => {
    if (!value1 && !value2) {
      return <></>;
    } else if (typeof value1 === "object") {
      for (const [key, value] of Object.entries(value1)) {
        return key === "name" ? (
          <Text>
            <Bold>{name}:</Bold> {value}
          </Text>
        ) : (
          <></>
        );
      }
    }
    return (
      <Text>
        <Bold>{name}:</Bold>{" "}
        {value2 === null ? value1 : `${value1} - ${value2}`}
      </Text>
    );
  };

  const renderCategoriesMechanics = (name, value, array) => {
    if (value && value.length !== 0) {
      value.flat(Infinity).map((item) => {
        for (const [key, value] of Object.entries(item)) {
          if(key === "id"){
            array.map((x) => (x.id === value ? arr.push(x.name) : null))
          }
        }
        return item;
      });
      return (
        <Text>
          <Bold>{name}: </Bold>
          {arr.toString().replaceAll(",", ", ")}
        </Text>
      );
    }
 
  };

  return (
    <Wrapper>
       <Menu />
      <Title>{game.name}</Title>
      <ImageContainer>
        <Image src={game.image_url} />
      </ImageContainer>
      {renderGameInfo("Players", game.min_players, game.max_players)}
      {renderGameInfo("Play-time (minutes)", game.min_playtime, game.max_playtime)}
      {renderGameInfo("Minimum age", game.min_age, null)}
      {renderCategoriesMechanics("Categories", game.categories, categories)}
      {renderCategoriesMechanics("Mechanics", game.mechanics, mechanics)}
      {renderGameInfo("Primary publisher", game.primary_publisher, null)}
      {renderGameInfo("Description", game.description_preview, null)}
    </Wrapper>
  )
}

export default SingleGame;