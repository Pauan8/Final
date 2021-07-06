import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { removeGame } from '../../../reducers/user';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 30px;
  height: 30px;
  margin: 5px;

`;
const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #a65151;

  &:hover,
  &:active,
  &:focus {
  color: black;
  }
`;

export const RemoveGame = ({ type, id, clicked, setClicked }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeGame(type, id));
  };

  return (
    <Wrapper>
      {id ? (
        <ButtonContainer >
          <Button onClick={handleClick}>
            <DeleteForeverIcon />
          </Button>
        </ButtonContainer>
      ) : (
        <></>
      )}
    </Wrapper>
  );
};
