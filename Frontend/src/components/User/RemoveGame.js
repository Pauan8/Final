import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";

import { addRemoveGame } from "../../reducers/user";
import { Button } from "../Reusable/Button";

export const RemoveGame = ({type, id}) => {
    const dispatch = useDispatch();
   return <Button handleClick={() => dispatch(addRemoveGame(type, id, 'remove'))}>Remove</Button>
}