import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { login } from '../reducers/user'
import { TextInput } from '../components/Reusable/TextInput'
import { PasswordInput } from '../components/LoginSignup/PasswordInput'
import { SubmitButton } from '../components/LoginSignup/SubmitButton'
import { Button } from '../components/Reusable/Button'
import { regexArr } from '../data/regExValdate'

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

const Signin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(store => store.user.accessToken)
  const [value, setValue] = useState({
    username: '',
    password: ''
  });

  const handleClick = () => {
    dispatch(login(value.username, value.password))
    history.push("/")
  }

  const onBackClick = () => {
    return history.location.state !== undefined
    && history.location.state.prev === "signup" 
    ? history.go(-2) 
    : history.goBack()
  }
 
  console.log(token)
  return (
    <Wrapper>
      {!token ? (
        <>
          <Title>Login</Title>
          <TextInput
            title="username"
            helptext="Enter your Username"
            value={value}
            setValue={setValue}
            regexp = {regexArr[0].regex}
          />
          <PasswordInput type="Login" value={value} setValue={setValue} />
          <SubmitButton
            type="button"
            btntext="Login"
            handleClick={handleClick}
          />
        </>
      ) : (
        <Wrapper>
        <Title>  
          Already logged in 
        </Title>
        <Button text="back" handleClick={onBackClick} />
        </Wrapper>
      )}
    </Wrapper>
  );
};

export default Signin;