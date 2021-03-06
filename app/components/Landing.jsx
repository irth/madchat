import React from 'react';

import GoogleLogin from 'react-google-login';

import glamorous from 'glamorous';

const CenteredDiv = glamorous.div({
  maxWidth: 960,
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'center',
  marginBottom: '3em',
});

const Title = glamorous.h1({
  fontSize: '400%',
  fontWeight: 300,
  marginBottom: 0,
});

const Subtitle = glamorous.div({
  fontSize: '150%',
});

const TweetContainer = glamorous.blockquote({
  display: 'flex',
  justifyContent: 'center',
});

const Desc = glamorous.div({ fontSize: '120%', margin: '1em' });

const MadChat = () => <glamorous.Span fontWeight="400">MadChat</glamorous.Span>;

const ConnectionStateDisplay = ({ loggingIn, error }) => {
  let color;
  if (error != null) color = 'red';
  else if (loggingIn) color = 'teal';
  else return null;

  let message;
  if (error != null) message = error;
  else if (loggingIn) message = 'Logging in...';

  return (
    <glamorous.Div color={color} marginBottom=".5em">
      {message}
    </glamorous.Div>
  );
};

export default ({ loggingIn, error, auth, authFail }) =>
  (<CenteredDiv>
    <Title>
      Mad<wbr />Chat
    </Title>
    <Subtitle>a chat app with a bit of madness</Subtitle>
    <TweetContainer>
      <blockquote className="twitter-tweet" data-lang="en">
        <p lang="en" dir="ltr">
          omg imagine a chat app where you can see what&#39;s being typed and deleted
        </p>&mdash; dodie (@doddleoddle){' '}
        <a href="https://twitter.com/doddleoddle/status/881854554425446400">July 3, 2017</a>
      </blockquote>
    </TweetContainer>
    <Desc>
      Well, that&rsquo;s what <MadChat /> is.
    </Desc>
    <ConnectionStateDisplay loggingIn={loggingIn} error={error} />
    <GoogleLogin
      clientId="41009918331-5jiap87h9iaaag4qi597siluelvq3706.apps.googleusercontent.com"
      buttonText="Login via Google"
      onSuccess={r => auth(r.tokenId)}
      onError={() => authFail('Google authentication error.')}
    />
  </CenteredDiv>);
