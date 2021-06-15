import React from 'react';
import styled from 'styled-components/macro';

const ButtonContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;

  &:after {
    color: ${(props) => (props.validate ? 'black' : 'red')};
    content: '${(props) => (props.validate ? '' : 'Invalid username')}';
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
  return (
    <ButtonContainer validate={validate}>
      <Button onClick={handleClick} validate={validate}>
        {btntext}
      </Button>
    </ButtonContainer>
  );
};
