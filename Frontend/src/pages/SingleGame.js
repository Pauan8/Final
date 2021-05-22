import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'

const SingleGame = () => {
  const { Id } = useParams()
  const game = useSelector((store) => store.boardGames.game)

  return <><p style={{margin:0}}>{game.name}</p></>
}

export default SingleGame;