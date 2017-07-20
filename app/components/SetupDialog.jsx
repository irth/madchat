import React from 'react';

import glamorous from 'glamorous';

import Dialog, {
  DialogContent,
  DialogTitle,
  DialogSubtitle,
  DialogActions,
  DialogAction,
} from './Dialog';

const Input = glamorous.input({
  display: 'block',
  boxSizing: 'border-box',
  width: '100%',
  padding: '.5em',
  background: 'white',
  border: 'none',
  borderBottom: 'solid 1px gray',
  marginTop: '.1em',
  paddingBottom: 'calc(1px + .5em)',
  transition: 'all .5s',
  ':focus': {
    outline: 'none',
    borderBottom: 'solid 2px teal',
    paddingBottom: '.5em',
  },
});

const Error = glamorous.div({
  color: 'red',
  textAlign: 'center',
  marginTop: '.7em',
  fontSize: '90%',
});

const Label = glamorous.label({
  display: 'block',
  marginTop: '1em',
  marginBottom: 0,
  paddingBottom: 0,
});

export default class SetupDialog extends React.Component {
  state = {
    displayName: this.props.displayName,
    username: '',
  };

  // TODO: implement save

  render() {
    return (
      this.props.username == null &&
      <Dialog>
        <DialogContent>
          <DialogTitle>Profile setup</DialogTitle>
          <DialogSubtitle>
            We need some information from you to finish setting up your profile.
          </DialogSubtitle>
          <div>
            <Label for="display_name">The name that others will see in their friends list:</Label>
            <Input
              id="display_name"
              placeholder="Display name"
              onChange={(e) => {
                this.setState({ displayName: e.target.value });
              }}
              defaultValue={this.props.displayName}
            />
            <Label for="username">
              Your very own username that will allow your friends to find you:
              {this.props.error != null &&
                this.props.error.code === 422 &&
                <Error>this username has been taken</Error>}
            </Label>
            <Input
              id="username"
              placeholder="Username"
              onChange={(e) => {
                this.setState({ username: e.target.value, error: null });
              }}
            />
          </div>
          {this.props.error != null &&
            this.props.error.code !== 422 &&
            <Error>Something went wrong. Please try again later.</Error>}
        </DialogContent>
        <DialogActions>
          <DialogAction color="#333" onClick={() => this.props.logOut()}>
            Log out
          </DialogAction>
          <DialogAction
            onClick={() =>
              this.props.updateUser({
                username: this.state.username,
                display_name: this.state.displayName,
              })}
          >
            Save
          </DialogAction>
        </DialogActions>
      </Dialog>
    );
  }
}
