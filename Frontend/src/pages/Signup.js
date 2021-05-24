import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

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
    password: '',
    e_mail: ''
  })
  const [validate, setValidate] = useState(true)
  const dispatch = useDispatch()
  const isSignedUp = useSelector(store => store.user.signup)

  console.log(isSignedUp.success)
  const handleClick = () =>{ 
    let regex = /[%<>\\$'"]/
    if (regex.test(value.username)){
      setValidate(false)
    } else {
      setValidate(true)
      dispatch(
        signUp({...value}))
        if(isSignedUp.success){
          return <Redirect to="/Login" />
        } else { 
          return <Title>Fail</Title>
        }
  
}}

console.log(value.username, value.password)
  return (
    <Wrapper>
      <Title>Sign Up</Title>
      <TextInput
        title="name"
        helptext="Your first name"
        value={value}
        setValue={setValue}
      />
      <TextInput
        title="surname"
        helptext="Your last name"
        value={value}
        setValue={setValue}
      />
      <TextInput
        title="username"
        helptext="Choose a username 5-12 chars"
        value={value}
        setValue={setValue}
        min="5"
        max="12"
      />
      <PasswordInput type="Singup" value={value} setValue={setValue} />
      <TextInput
        title="e_mail"
        helptext="Enter your e-mail"
        value={value}
        setValue={setValue}
        min="5"
        max=""
      />
      <SubmitButton
        btntext="Submit"
        validate={validate}
        handleClick={handleClick}
      />
    </Wrapper>
  );
}

export default Signup;