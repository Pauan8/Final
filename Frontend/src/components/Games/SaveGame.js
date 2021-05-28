import { Checkbox, FormGroup , FormLabel, FormControlLabel } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";

import user from '../../reducers/user'
import { Button } from '../Reusable/Button'

const Title = styled.h1`
  font-size: 18px;
  width: 250px;
  text-align: center;
`;

const ButtonContainer = styled.div`
 `


export const SaveGame = ({name, id, setFlip}) => {
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        favourites: false,
        wishlist: false,
        ownedgames: false
    })

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.checked})
    }

    const handleClick = (e) => {
        dispatch(user.actions.addGameToList(e.target.name, id))
        setFlip(false)
    }

    const renderCheckbox = (title) => {
        return <FormControlLabel
        control={<Checkbox 
            checked={values[title.toLowerCase().replace(' ','')]} 
            onChange={handleChange} 
            name={title.toLowerCase().replace(' ','')} />}
        label={title}
      />
    }
    return <><Title>{name}</Title>
    <FormLabel component="legend">Add to list/s?</FormLabel>
        <FormGroup>
         {renderCheckbox('Favourites')}
         {renderCheckbox('Wish List')}
         {renderCheckbox('Owned Games')}
        </FormGroup>
        <ButtonContainer>
            <Button text="Done" handleClick={handleClick} />
        </ButtonContainer>
    </>
}