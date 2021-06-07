import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux'

import boardGames from '../../reducers/boardGames'
import {playersArr, playtimeArr, minAgeArr, yearsArr} from '../../data/choicesArrays'

const Button = styled.button`
margin-top: 20px;`

let updateArr = []
export const SearchButton = ({value}) => {
    const dispatch = useDispatch();

    const handleFilters = (type, arr, i) =>{
        if(type === "categories" ||  type === "mechanics" && value[type]!== ''){
            updateArr.push({[type]: [value[type]]})
        }
        if(arr.length > 0 && value[type]!== '' && arr[i-1].name.length > 1)
        {
            updateArr.push({[type]: {[arr[i-1].name[0]]: [arr[i-1].value[0]], [arr[i-1].name[1]]: [arr[i-1].value[1]]}})
        } else if ( arr.length > 0  && value[type]!== '') {
            updateArr.push({[type]: {[arr[i-1].name[0]]: [arr[i-1].value[0]]}})
        } 
     
    }

    const handleClick = () => {
        handleFilters("players", playersArr, value.players)
        handleFilters("playtime", playtimeArr, value.playtime)
        handleFilters("minage", minAgeArr, value.minage)
        handleFilters("year", yearsArr, value.year)
        handleFilters("mechanics", [], value.mechanics)
        handleFilters("categories", [], value.categories)
        console.log(updateArr)
        dispatch(boardGames.actions.setFilter(updateArr))
        updateArr = []
    }

   

    return <Button onClick={handleClick}>Filter</Button>
}