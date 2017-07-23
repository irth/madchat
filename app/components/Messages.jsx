import React from 'react';

import glamorous from 'glamorous';
import { css } from 'glamor';

import ChatBox from './ChatBox';

const MessageDiv = glamorous.div(({ own, live, unsent }) => {
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
    opacity: unsent ? 0.5 : 1,
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
});

const Message = ({ message, own, unsent }) =>
  (<glamorous.Div textAlign={own ? 'right' : 'left'}>
    <MessageDiv own={own} unsent={unsent}>
      {message}
    </MessageDiv>
  </glamorous.Div>);

export default class Messages extends React.Component {
  state = {
    autoscroll: true,
  };

  infiniteLoad() {
    const { messages, fetchMessages } = this.props;
    const before = messages[0] ? messages[0].timestamp : undefined;
    fetchMessages(before);
  }

  render() {
    const {
      messages,
      unsentMessages,
      ownId,
      remoteInput,
      isFullyFetched,
      fetching,
      onSetAutoscroll,
      autoscroll,
    } = this.props;

    return (
      <ChatBox
        className={containerStyle}
        onInfiniteLoad={() => this.infiniteLoad()}
        isFullyLoaded={isFullyFetched}
        isLoading={fetching}
        autoscroll={autoscroll}
        onSetAutoscroll={onSetAutoscroll}
      >
        {/* TODO: implement autoscroll */}
        {messages.map(m => <Message key={m.id} own={m.sender === ownId} message={m.message} />)}
        {unsentMessages.map(m => <Message unsent key={m.id} own message={m.message} />)}
        {remoteInput.length > 0 &&
          <glamorous.Div key="remote" textAlign="left">
            <MessageDiv live>
              {remoteInput}
            </MessageDiv>
          </glamorous.Div>}
      </ChatBox>
    );
  }
}
