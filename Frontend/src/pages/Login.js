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

const Login = () => {
  return (
    <Wrapper>
      <Title>Login</Title>
      <TextInput title="Username" helptext="Enter your Username" />
      <PasswordInput type="Login" />
    </Wrapper>
  );
};

export default Login;