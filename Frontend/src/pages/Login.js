import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { useDispatch, useSelector } from 'react-redux'

import { login, status } from '../reducers/user'
import { TextInput } from '../components/LoginSignup/TextInput'
import { PasswordInput } from '../components/LoginSignup/PasswordInput'
import { SubmitButton } from '../components/LoginSignup/SubmitButton'

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

const Login = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    username: '',
    password: ''
  });

  const handleClick = () => {
    dispatch(login(value.username, value.password))
  }

  useEffect(() => {
    dispatch(status())
  }, [])

  return (
    <Wrapper>
      <Title>Login</Title>
      <TextInput title="username" helptext="Enter your Username" value={value} setValue={setValue} />
      <PasswordInput type="Login" value={value} setValue={setValue} />
      <SubmitButton type="button" btntext="Login" handleClick={handleClick} />
    </Wrapper>
  );
};

export default Login;