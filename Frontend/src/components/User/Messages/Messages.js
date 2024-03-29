import React from 'react';
import styled from 'styled-components/macro';

import { ChatWindow } from './Chat';
import { MessageList } from './MessageList';

const Wrapper = styled.div`
  width: 300px;
  height: 500px;
  background: #f2d3ac;
  border: solid #a65151 1px;
  border-radius: 5px;
  display: ${(props) => (props.visible === 'message' ? 'flex' : 'none')};
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

export const Messages = ({
  visibleLayer,
  setVisibleLayer,
  messageMode,
  setMessageMode,
}) => {
  return (
    <Wrapper visible={visibleLayer}>
      {messageMode === 'chat' ? (
        <ChatWindow
          visibleLayer={visibleLayer}
          setVisibleLayer={setVisibleLayer}
          messageMode={messageMode}
          setMessageMode={setMessageMode}
        />
      ) : (
        <MessageList
          messageMode={messageMode}
          setMessageMode={setMessageMode}
          setVisibleLayer={setVisibleLayer}
        />
      )}
    </Wrapper>
  );
};
