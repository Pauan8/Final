import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../reducers/user';
import { TextInput } from '../components/Reusable/TextInput';
import { PasswordInput } from '../components/LoginSignup/PasswordInput';
import { SubmitButton } from '../components/LoginSignup/SubmitButton';
import { Button } from '../components/Reusable/Button';
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

const Title = styled.h1``;

const Signin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [validate, setValidate] = useState();
  const errors = useSelector((store) => store.user.errors);
  const [value, setValue] = useState({
    username: '',
    password: '',
  });
  let validateString;

  const handleClick = () => {
    regexArr.map((item) => {
      if (item.value === 'password' || item.value === 'username') {
        if (item.regex.test(value[item.value])) {
          validateString += 'true';
        } else {
          validateString += 'false';
        }
      }
    });
    if (!validateString.includes('false')) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  };

  if (validate) {
    dispatch(login(value.username, value.password));
    if (errors === null) {
      history.push('/');
      setValidate();
      validateString="";
    }
  }

  const onBackClick = () => {
    return history.location.state !== undefined ? history.goBack() : null;
  };

  return (
    <>
      <ExitButton />
      <Wrapper>
        {!localStorage.getItem('token') ? (
          <>
            <Title>Login</Title>
            <TextInput
              title='username'
              helptext='Enter your Username'
              value={value}
              setValue={setValue}
              regexp={regexArr[0].regex}
            />
            <PasswordInput type='Login' value={value} setValue={setValue} />
            <SubmitButton
              btntext='Login'
              handleClick={handleClick}
              validate={validate}
            />
          </>
        ) : (
          <Wrapper>
            <Title>Already logged in</Title>
            <Button text='back' handleClick={onBackClick} />
          </Wrapper>
        )}
        <Link to='/signup'> No account? Click here to Sign Up!</Link>
      </Wrapper>
    </>
  );
};

export default Signin;
