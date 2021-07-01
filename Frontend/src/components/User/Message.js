import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import styled from 'styled-components/macro';

import { sendMessage } from "reducers/user";


const Wrapper = styled.div`
  width: 300px;
  height: 500px;
  background: #f2d3ac;
  border: solid #a65151 1px;
  border-radius: 5px;
  display: ${props => props.visible === 'message' ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;

  margin-top: 89px;
  color: #733c3c;

  @media (min-width: 768px) {
    border-right: none;
    border-radius: 5px 0 0 5px;
  }
`;

export const Message = ({currentFriend, visibleLayer, mode}) => {
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState(mode === 'chat' || 'messagelist');
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(sendMessage(currentFriend._id, message))
  };

  const renderUserChat = () => {
      if(currentFriend.messages){
      currentFriend.messages.map(message => {
          return <><p>{message.message}</p><p>{message.createdAt}</p></>})
      }
  }

  return (
    <Wrapper visible={visibleLayer}>
    {renderUserChat()}
      <input
        type="text"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={handleClick}>Send</button>
    </Wrapper>
  );
};
