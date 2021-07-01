import React, { useState } from "react";
import { useDispatch} from "react-redux";

import { sendMessage } from "reducers/user";

export const Message = ({user}) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(sendMessage(user._id, message))
  };

  return (
    <>
      <input
        type="text"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={handleClick}>Send</button>
    </>
  );
};
