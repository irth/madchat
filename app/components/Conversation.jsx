import React from 'react';
import glamorous from 'glamorous';

import Messages from '../containers/Messages';
import ChatInput from './ChatInput';

const Wrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  background: '#fefefe',
  height: '100%',
});

const NoConversation = () =>
  (<glamorous.Div
    width="100%"
    height="100%"
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
    textAlign="center"
  >
    <glamorous.Div fontSize="140%" margin="1em">
      Select a friend from the list and start chatting!
    </glamorous.Div>
    <glamorous.Div margin="1em">
      By the way, if you like our app, would you mind sharing it with your friends?
    </glamorous.Div>
  </glamorous.Div>);

const Title = glamorous.div({
  flexGrow: 0,
  flexShrink: 0,
  padding: '.5em',
  paddingBottom: '1em',
  margin: '.5em',
  marginBottom: 0,
  textAlign: 'center',
  borderBottom: '1px solid #ccc',
  fontWeight: 400,
});

export default class Conversation extends React.Component {
  state = { autoscroll: true };
  render() {
    const { friend, sendMessage, sendInput } = this.props;
    if (friend != null) {
      return (
        <Wrapper>
          <Title>
            {friend.display_name}
          </Title>
          <Messages
            id={friend.id}
            autoscroll={this.state.autoscroll}
            onSetAutoscroll={autoscroll => this.setState({ autoscroll })}
          />
          <ChatInput
            onSubmit={(msg) => {
              if (msg.trim().length > 0) {
                this.setState({ autoscroll: true }, () => sendMessage(msg));
              }
            }}
            onChange={value => sendInput(value)}
          />
        </Wrapper>
      );
    }
    return <NoConversation />;
  }
}
