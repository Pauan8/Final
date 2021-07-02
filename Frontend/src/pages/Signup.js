import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { TextInput } from '../components/Reusable/TextInput';
import { PasswordInput } from '../components/LoginSignup/PasswordInput';
import { SubmitButton } from '../components/LoginSignup/SubmitButton';
import { Button } from '../components/Reusable/Button';
import { signUp } from '../reducers/user';
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
  const [validate, setValidate] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const errors = useSelector((store) => store.user.errors);
  let validateString;

  const handleValidation = () => {
    regexArr.map((item) => {
      if (item.value === 'password' || item.value === 'username') {
        if (item.regex.test(value[item.value])) {
          validateString += 'true';
        } else {
          validateString += 'false';
        }
      } else if (value[item.value] !== '' && item.value !== 'age') {
        if (item.regex.test(value[item.value])) {
          validateString += 'true';
        } else {
          validateString += 'false';
        }
      }
    });

    if (validateString.includes('false')) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  };

  if (validate) {
    dispatch(signUp({ ...value }));
    setValidate(false);
    if (errors === null) {
      history.push({ pathname: '/' });
      setValidate();
    }
  }

  return (
    <>
      <ExitButton />
      <Wrapper>
        {localStorage.getItem('token') ? (
          <>
            <Title>
              You're already logged in, log out or delete your user to be able
              to sign up
            </Title>
            <Button text='Back' handleClick={() => history.goBack()} />
          </>
        ) : (
          <>
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
            <SubmitButton
              btntext='Submit'
              validate={validate}
              handleClick={handleValidation}
            />

            <Link to='/login'> Already got a account? Go to login</Link>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Signup;
