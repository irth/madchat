import React from 'react';
import glamorous from 'glamorous';

export default class ChatInput extends React.Component {
  state = {
    input: '',
  };
  onSubmit = () => {
    const input = this.state.input;
    if (this.props.onSubmit != null) this.props.onSubmit(input);
    this.clearInput();
  };

  clearInput() {
    this.setState({ input: '' });
    this.el.focus();
  }

  render() {
    return (
      <glamorous.Div
        display="flex"
        flexDirection="row"
        alignItems="center"
        flexGrow={0}
        flexShrink={0}
      >
        <glamorous.Input
          css={{
            flex: 2,
            border: 'none',
            background: 'white',
            padding: '1.1em 1.6em',
            paddingRight: 0,
            ':focus': { outline: 'none' },
          }}
          autoFocus
          value={this.state.input}
          innerRef={el => (this.el = el)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) this.onSubmit();
          }}
          onChange={(e) => {
            this.setState({ input: e.target.value });
            if (this.props.onChange != null) this.props.onChange(e.target.value);
          }}
        />
        <glamorous.Div
          role="button"
          css={{
            padding: '.5em 1em',
            margin: '.3em',
            textTransform: 'uppercase',
            fontWeight: 400,
            color: 'teal',
            ':hover': {
              backgroundColor: '#eee',
            },
          }}
          onClick={this.onSubmit}
        >
          Send
        </glamorous.Div>
      </glamorous.Div>
    );
  }
}
