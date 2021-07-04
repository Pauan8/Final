import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { TextInput } from '../components/Reusable/TextInput';
import { PasswordInput } from '../components/LoginSignup/PasswordInput';
import { regexArr } from '../data/regExValdate';
import { ExitButton } from '../components/Reusable/ExitButton';
import { Validation } from 'components/LoginSignup/Validation';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1``;

const Signin = () => {
  const [value, setValue] = useState({
    username: '',
    password: '',
  });

  return (
    <>
      <ExitButton />
      <Wrapper>
        <Title>Login</Title>
        <TextInput
          title='username'
          helptext='Enter your Username'
          value={value}
          setValue={setValue}
          regexp={regexArr[0].regex}
        />
        <PasswordInput type='Login' value={value} setValue={setValue} />
        <Validation mode='login' value={value} />
        <Link to='/signup'> No account? Click here to Sign Up!</Link>
      </Wrapper>
    </>
  );
};

export default Signin;
