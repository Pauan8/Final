import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from 'styled-components/macro';

import { Button } from "components/Reusable/Button";
import { sendMessage } from "reducers/user";
import { TextareaAutosize } from "@material-ui/core";

const TextInput = styled(TextareaAutosize)`
`

export const WriteMessage = ({user}) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("")

    const handleClick = () => {
        dispatch(sendMessage(user, message))
        setMessage("");
    }
    
    return (
    <>
        <TextInput value={message} onChange={(event) => setMessage(event.target.value)} />
        <Button text="Send" size="small" handleClick={handleClick} />
    </>
    )
}