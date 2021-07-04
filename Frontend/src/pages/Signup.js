import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { TextInput } from '../components/Reusable/TextInput';
import { PasswordInput } from '../components/LoginSignup/PasswordInput';
import { Validation } from 'components/LoginSignup/Validation';
import { regexArr } from '../data/regExValdate';
import { ExitButton } from '../components/Reusable/ExitButton';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  max-width: 600px;
`;

const Signup = () => {
  const [value, setValue] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
    e_mail: '',
  });

  return (
    <>
      <ExitButton />
      <Wrapper>
        <Title>Sign Up</Title>
        <TextInput
          title='name'
          helptext='Your first name'
          value={value}
          setValue={setValue}
          regexp={regexArr[1].regex}
        />
        <TextInput
          title='surname'
          helptext='Your last name'
          value={value}
          setValue={setValue}
          regexp={regexArr[2].regex}
        />
        <TextInput
          title='username'
          helptext='Choose a username 5-12 chars'
          value={value}
          setValue={setValue}
          regexp={regexArr[0].regex}
        />
        <PasswordInput type='Singup' value={value} setValue={setValue} />
        <TextInput
          title='e_mail'
          helptext='Enter your e-mail'
          value={value}
          setValue={setValue}
          regexp={regexArr[3].regex}
        />
        <Validation mode='Signup' value={value} />
        <Link to='/login'> Already got a account? Go to login</Link>
      </Wrapper>
    </>
  );
};

export default Signup;
