import {
  Checkbox,
  FormGroup,
  FormLabel,
  FormControlLabel,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";

import { addRemoveGame } from "../../reducers/user";
import { Button } from "../Reusable/Button";

const Title = styled.h1`
  color: white;
  font-size: 18px;
  width: 250px;
  text-align: center;
`;

const ButtonContainer = styled.div``;

let typeArr = [];
export const SaveGame = ({ name, id, setFlip, like, setLike }) => {
  const dispatch = useDispatch();
  const lister = useSelector((store) => store.user.userInfo.lists);

  const [values, setValues] = useState({
    favourites: false,
    wishlist: false,
    ownedgames: false,
  });
  const [type, setType] = useState([]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
    if (event.target.checked && !typeArr.includes(event.target.name)) {
      typeArr.push(event.target.name);
    } else if (!event.target.checked && typeArr.includes(event.target.name)) {
      typeArr.filter((item) => item !== event.target.name);
    }
    setType(typeArr);
  };

  const handleClick = () => {
    type.forEach((item) => dispatch(addRemoveGame(item, id, 'add')));
    setFlip(false);
    if (typeArr.length > 0) {
      setLike("recent");
    } else if (typeArr.length === 0 && like != "includes") {
      setLike("none");
    }
    typeArr = [];
  };

  const handleChecked = (value, title) => {
    if(lister){
    return lister[value].filter((item) => item.id === id).length > 0
      ? true
      : values[title.toLowerCase().replace(" ", "")];
    } 
  };

  const renderCheckbox = (title) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={handleChecked(title.toLowerCase().replace(" ", ""), title)}
            onChange={handleChange}
            name={title.toLowerCase().replace(" ", "")}
          />
        }
        label={title}
      />
    );
  };
  return (
    <>
      <Title>{name}</Title>
      <FormLabel
        component="legend"
        InputLabelProps={{ style: { color: "#000" } }}
      >
        Add to list/s?
      </FormLabel>
      <FormGroup>
        {renderCheckbox("Favourites")}
        {renderCheckbox("Wish List")}
        {renderCheckbox("Owned Games")}
      </FormGroup>
      <ButtonContainer>
        <Button text="Done" handleClick={handleClick} />
      </ButtonContainer>
    </>
  );
};
