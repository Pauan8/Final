import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useDispatch } from 'react-redux'

import { TextInput } from '../components/LoginSignup/TextInput'
import { PasswordInput } from '../components/LoginSignup/PasswordInput'
import { SubmitButton } from '../components/LoginSignup/SubmitButton'

import { signUp } from '../reducers/user'

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
  const [value, setValue] = useState({
    name: '',
    surname: '',
    username: '',
    password: ''
  })
  const dispatch = useDispatch()
console.log(value.username, value.password)
  return (
    <Wrapper>
      <Title>Sign Up</Title>
      <TextInput title="name" helptext="Your first name" value={value} setValue={setValue} />
      <TextInput title="surname" helptext="Your last name" value={value} setValue={setValue} />
      <TextInput title="username" helptext="Choose a username 5-12 chars" value={value} setValue={setValue} />
      <PasswordInput type="Singup" value={value} setValue={setValue} />
      <SubmitButton btntext="Submit" handleClick={() => dispatch(signUp(value.username, value.password, value.name, value.surname))} />
    </Wrapper>
  )
}

export default Signup;