import { SettingsOverscanOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";

export const Message = () => {
  const [message, setMessage] = useState("");
  const handleClick = () => {
    return fetch(
      `https://secure-escarpment-13722.herokuapp.com/profile/${localStorage.getItem(
        "userID"
      )}/sendMessage?username=Bubbles`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          message: [message],
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((error) => console.log("catch error"));
  };

  return (
    <>
      <input
        type="text"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={() => handleClick}>Send</button>
    </>
  );
};
