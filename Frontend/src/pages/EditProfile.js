import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useDispatch } from 'react-redux'

import picArray from '../data/picArray.json'
import { editProfile}from '../reducers/user'
import { DropDown } from '../components/Reusable/DropDown'
import { Button } from '../components/Reusable/Button'

const EditProfile = () => {
    const dispatch = useDispatch()
    const [avatar, setAvatar] = useState("")
    const handleChange = (e) => {
        setAvatar(e.target.value)
    }

    const handleClick = () => {
        dispatch(editProfile({avatar: avatar}))
    }

    return  (<>
        <DropDown arr={picArray} handleChange={handleChange} value={avatar} title="avatar"/> 
        <Button handleClick={handleClick} text="Save"/></>)
  
}

export default EditProfile;