import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import user, { signUp, login } from '../../reducers/user';
import { regexArr } from '../../data/regExValdate';
import { SubmitButton } from './SubmitButton';

export const Validation = ({ mode, value }) => {
  const errors = useSelector((store) => store.user.errors);
  const [validate, setValidate] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  let valid;

  useEffect(() => {
    dispatch(user.actions.setErrors('init'));
  }, [dispatch]);

  const handleClick = () => {
    regexArr.map((item) => {
      if (item.value === 'password' || item.value === 'username') {
        if (item.regex.test(value[item.value])) {
          setValidate(true);
          valid = true;
        } else {
          setValidate(false);
          valid = false;
          return valid;
        }
      } else if (value[item.value] !== '' && item.value !== 'age') {
        if (item.regex.test(value[item.value])) {
          setValidate(true);
          valid = true;
        } else {
          setValidate(false);
          valid = false;
          return valid;
        }
      }
      return validate;
    }
    );

    if (valid) {
      mode === 'login'
        ? dispatch(login(value.username, value.password))
        : dispatch(signUp({ ...value }));
      if (errors === null) {
        history.push('/');
      }
    }
  };

  return (
    <>
      <SubmitButton
        btntext={mode === login ? 'Login' : 'Submit'}
        validate={validate}
        handleClick={handleClick}
      />
    </>
  );
};
