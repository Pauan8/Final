import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from 'styled-components/macro';

import { TransparentBtn } from "components/Reusable/TransparentBtn";
import { sendMessage } from "reducers/user";

const Wrapper = styled.div`
    display: flex;
    background: white;
    height: 55px;
    width: 300px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;`

const TextInput = styled.textarea`
    display: flex;
    flex: 1 1 auto;
    height: 49px;
    border: none;
    border-right: solid black 0.5px;
`

export const WriteMessage = ({user}) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("")

    const handleClick = () => {
        dispatch(sendMessage(user, message))
        setMessage("");
    }
    
    return (
    <Wrapper>
        <TextInput value={message} onChange={(event) => setMessage(event.target.value)} />
        <TransparentBtn text="Send" color="black" fontSize="12px" handleClick={handleClick} />
    </Wrapper>
    )
}