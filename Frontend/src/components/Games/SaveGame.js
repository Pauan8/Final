import { Checkbox, FormGroup , FormLabel, FormControlLabel } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";

import { addGameToList } from '../../reducers/user'
import { Button } from '../Reusable/Button'

const Title = styled.h1`
color: white;
  font-size: 18px;
  width: 250px;
  text-align: center;
`;

const ButtonContainer = styled.div`
 `

let typeArr = []
export const SaveGame = ({name, id, setFlip}) => {
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        favourites: false,
        wishlist: false,
        ownedgames: false
    })
    const [type, setType] = useState([])
 

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.checked})
        if(event.target.checked && !typeArr.includes(event.target.name)){
            typeArr.push(event.target.name)
        } else if(!event.target.checked && typeArr.includes(event.target.name)) {
            typeArr.filter(item => item!==event.target.name)
        }
        setType(typeArr)
    }

    const handleClick = () => {
        type.forEach(item => dispatch(addGameToList(item, id)))
        setFlip(false)
        typeArr = []
    }

    const renderCheckbox = (title) => {
        return <FormControlLabel
        control={
        <Checkbox 
            checked={values[title.toLowerCase().replace(' ','')]} 
            onChange={handleChange} 
            name={title.toLowerCase().replace(' ','')} />}
        label={title}
      />
    }
    return <><Title>{name}</Title>
    <FormLabel component="legend" InputLabelProps={{style: {color: '#000'}}}>Add to list/s?</FormLabel>
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