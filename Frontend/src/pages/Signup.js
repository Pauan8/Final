import React from 'react'
import styled from 'styled-components/macro'

import { TextInput } from '../components/Login/TextInput'
import { PasswordInput } from '../components/Login/PasswordInput'

const Wrapper = styled.div`
position: relative;
width: 100%;
height: calc(100vh - 100px);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const Title = styled.h1`
`

const Signup = () => {
  return (
    <Wrapper>
      <Title>Sign Up</Title>
      <TextInput title="Name" helptext="Your first name" />
      <TextInput title="Surname" helptext="Your last name" />
      <TextInput title="Username" helptext="Choose a username 5-12 chars" />
      <PasswordInput type="Singup" />
    </Wrapper>
  )
}

export default Signup;