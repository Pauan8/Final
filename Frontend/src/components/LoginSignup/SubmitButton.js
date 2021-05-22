import React from 'react'
import styled from 'styled-components/macro'

const Button = styled.button``

export const SubmitButton = ({ btntext, handleClick }) => {
  return <Button onClick={handleClick}>{btntext}</Button>
}