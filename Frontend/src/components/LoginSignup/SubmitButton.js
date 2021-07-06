import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components/macro';

const ButtonContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:after {
    color: ${(props) =>
      props.validate === false
        ? 'red'
        : props.errors !== null && props.errors
        ? 'red'
        : 'black'};
    content: '${(props) =>
      props.validate === false
        ? 'Not valid info, try again!'
        : props.errors !== null && props.errors
        ? props.errors.error
        : ''}';
  }
`;

const Button = styled.button`
  background: #b5d5b5;
  font-family: 'Raleway', sans-serif;
  width: 100px;
  padding: 5px;
  font-size: 16px;
  box-shadow: 2px 2px 2px 1px grey;
  border-radius: 5px;
  margin: 10px;
`;

export const SubmitButton = ({ btntext, handleClick, validate }) => {
  const errors = useSelector((store) => store.user.errors);
  const history = useHistory();

  return (
    <>{errors === null && validate === true ? history.push('/') : 
    <ButtonContainer errors={errors} validate={validate}>
      <Button onClick={handleClick} validate={validate}>
        {btntext}
      </Button>
    </ButtonContainer>}</>
  );
};
