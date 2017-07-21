import React from 'react';

import glamorous from 'glamorous';
import { css } from 'glamor';

// import ChatBox from './ChatBox';

const MessageDiv = glamorous.div(({ own, live }) => {
  let bg = '#ddd';
  if (own && !live) {
    bg = '#222';
  } else if (live) {
    bg = 'white';
  }
  return {
    borderRadius: 10,
    ...(own ? { borderBottomRightRadius: 0 } : { borderTopLeftRadius: 0 }),
    padding: '.5em',
    background: bg,
    border: live ? 'dashed 1px black' : `solid 1px ${bg}`,
    color: own ? 'white' : 'black',
    display: 'inline-block',
    margin: '0.2em .5em',
    maxWidth: '30em',
    textAlign: 'justify',
    wordBreak: 'break-word',
  };
});

const containerStyle = css({
  flex: 2,
  display: 'flex',
  flexDirection: 'column',
  padding: '.5em 0',
  margin: '0 .5em',
  borderBottom: 'solid 1px #ccc',
  overflowY: 'scroll',
});

const Message = ({ message, own }) =>
  (<glamorous.Div textAlign={own ? 'right' : 'left'}>
    <MessageDiv own={own}>
      {message}
    </MessageDiv>
  </glamorous.Div>);

export default ({ messages, unsentMessages, ownId, remoteInput }) =>
  (<div className={containerStyle}>
    {/* TODO: implement autoscroll */}
    {messages.map(m => <Message key={m.id} own={m.sender === ownId} message={m.message} />)}
    {unsentMessages.map(m => <Message key={m.id} own message={m.message} />)}
    {remoteInput.length > 0 &&
      <glamorous.Div key="remote" textAlign="left">
        <MessageDiv live>
          {remoteInput}
        </MessageDiv>
      </glamorous.Div>}
  </div>);
