import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'

import mechanics from '../data/mechanics.json'
import categories from '../data/categories.json'

const Wrapper = styled.div`
position: relative;`

const Image = styled.img``

const Title = styled.h1``

const Bold = styled.span ``

const Text = styled.p``

const SingleGame = () => {
  const arr = [];
  const { Id } = useParams()
  const game = useSelector((store) => store.boardGames.game)

  const renderGameInfo =(name, value1, value2) => {
    if(!value1 && !value2){
      return <></>
    } else if(typeof value1 === 'object'){
      for (const [key, value] of Object.entries(value1)) {
      return  key === "name"? <Text><Bold>{name}:</Bold> {value}</Text>: <></>
    }
  } 
  return <Text><Bold>{name}:</Bold> {value2 === null? value1 : `${value1} - ${value2}`}</Text>
  }

  const renderCategoriesMechanics = (name, value) => {
    if (value && value.length !== 0) {
      value.flat(Infinity).map((item) => {
        for (const [key, value] of Object.entries(item)) {
          if (key === "id") {
            name === "Mechanics"
              ? mechanics.map((mech) =>
                  mech.id === value ? arr.push(mech.name) : null
                )
              : categories.map((cat) =>
                  cat.id === value ? arr.push(cat.name) : null
                );
          }
        }
      });
      return (
        <Text>
          <Bold>{name}: </Bold>
          {arr.toString()}
        </Text>
      );
    }
 
  };

  return (
    <Wrapper>
      <Image src={game.image_url} />
      <Title>{game.name}</Title>
      {renderGameInfo("Players", game.min_players, game.max_players)}
      {renderGameInfo("Play-time (minutes)", game.min_playtime, game.max_playtime)}
      {renderGameInfo("Minimum age", game.min_age, null)}
      {renderCategoriesMechanics("Categories", game.categories)}
      {renderCategoriesMechanics("Mechanics", game.mechanics)}
      {renderGameInfo("Primary publisher", game.primary_publisher, null)}
    </Wrapper>
  )
}

export default SingleGame;