import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { playerRange } from 'data/choicesArrays';
import { ageRange } from 'data/choicesArrays';
import { playtimeRange } from 'data/choicesArrays';
import { yearRange } from 'data/choicesArrays';
import { RadioButtons } from 'components/Reusable/RadioButtons'
import { Button } from 'components/Reusable'

const Wrapper = styled.div`
display: flex;`

export const FilterMenu = ({isNew, search}) => {
    const [value, setValue] = useState({
        players: "",
        age: "",
        playtime:"",
        year: ""
    })

    const handleChange = (props) => (e) => {
        setValue({...value, [props]: e.target.value})
    }

    const renderFilter = () => {
        if(search){
            return <>{search.includes("players")?<></>:
            <RadioButtons choices={playerRange} type="Players" value={value.players} handleChange={handleChange("players")} />}
            {search.includes("playtime")?<></>:
            <RadioButtons choices={playtimeRange} type="Play-time" value={value.playtime} handleChange={handleChange("playtime")} />}
            {search.includes("age")?<></>:
            <RadioButtons choices={ageRange} type="Minimum age" value={value.age} handleChange={handleChange("age")} />}
            {isNew || search.includes("year")? <></>:
            <RadioButtons choices={yearRange} type="Publish year" value={value.year} handleChange={handleChange("year")} />} 
            </>   
        } 
        return (<>
        <RadioButtons choices={playerRange} type="Players" value={value.players} handleChange={handleChange("players")} />
        <RadioButtons choices={playtimeRange} type="Play-time" value={value.playtime} handleChange={handleChange("playtime")} />
        <RadioButtons choices={ageRange} type="Minimum age" value={value.age} handleChange={handleChange("age")} />
        {isNew ? <></>:
        <RadioButtons choices={yearRange} type="Publish year" value={value.year} handleChange={handleChange("year")} />}
        </>)   
    }

    return (
    <Wrapper>
        {renderFilter()} 
        <Button handleClick={handleClick} text="Filter" />
    </Wrapper>
    )
}