import React from 'react'
import styled from 'styled-components/macro'
import {useDispatch} from 'react-redux'

import { TextInput } from '../components/LoginSignup/TextInput'
import { PasswordInput } from '../components/LoginSignup/PasswordInput'
import { SubmitButton } from '../components/LoginSignup/SubmitButton'

import { addUser } from '../reducers/user'

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
  const dispatch = useDispatch()
  return (
    <Wrapper>
      <Title>Sign Up</Title>
      <TextInput title="Name" helptext="Your first name" />
      <TextInput title="Surname" helptext="Your last name" />
      <TextInput title="Username" helptext="Choose a username 5-12 chars" />
      <PasswordInput type="Singup" />
      <SubmitButton btntext="Submit" handleClick={() => dispatch(addUser())} />
    </Wrapper>
  )
}

export default Signup;