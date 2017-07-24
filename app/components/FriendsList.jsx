import React from 'react';
import glamorous from 'glamorous';

import User, { Status } from './User';
import UserInfoDialog from '../containers/UserInfoDialog';
import Dialog, { DialogContent, DialogTitle, DialogActions, DialogAction } from './Dialog';

const Container = glamorous.div({
  minWidth: '13em',
  background: '#333',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
});

const FriendsListUl = glamorous.ul({
  listStyleType: 'none',
  padding: 0,
  margin: 0,
});

const Friend = glamorous(User)(({ active }) => ({
  ':hover': active || {
    background: '#242424',
    cursor: 'pointer',
  },
  background: active && 'white',
  color: active && 'black',
}));

const Top = glamorous.div({
  background: 'black',
  marginBottom: '.4em',
});

const Filter = glamorous.input({
  width: '100%',
  boxSizing: 'border-box',
  padding: '.5em 1em',
  background: '#555',
  border: 'none',
  color: 'white',
  ':focus': {
    outline: 'none',
  },
  '::placeholder': {
    color: '#ccc',
  },
});

const StatusSelect = glamorous.ul({ listStyleType: 'none', padding: 0 });
const StatusLi = glamorous.li({
  padding: '1em',
  borderRadius: 3,
  ':hover': { background: '#eaeaea' },
});
const StatusPadded = glamorous(Status)({
  marginRight: '.5em',
});

const StatusList = ({ onSelect }) =>
  (<DialogContent>
    <DialogTitle>Choose your status</DialogTitle>
    <StatusSelect>
      <StatusLi onClick={() => onSelect('available')}>
        <StatusPadded status="available" /> Available
      </StatusLi>
      <StatusLi onClick={() => onSelect('busy')}>
        <StatusPadded status="busy" /> Busy
      </StatusLi>
      <StatusLi onClick={() => onSelect('away')}>
        <StatusPadded status="away" /> Away
      </StatusLi>
      <StatusLi onClick={() => onSelect('unavailable')}>
        <StatusPadded status="unavailable" /> Unavailable
      </StatusLi>
    </StatusSelect>
  </DialogContent>);

const AddFriendButton = glamorous.div({
  padding: '10px',
  background: '#222',
  textAlign: 'center',
  color: '#aaa',
  cursor: 'pointer',
  ':hover': {
    color: 'white',
  },
});

const AddFriendLabel = glamorous.span({
  paddingLeft: '.4em',
});

export default class FriendsList extends React.Component {
  state = {
    statusDialog: false,
    userInfoDialog: false,
    filter: '',
  };

  filterFriends() {
    return this.props.friends.filter(
      f =>
        f.display_name.toLocaleLowerCase().indexOf(this.state.filter.toLocaleLowerCase()) !== -1 ||
        f.username.toLocaleLowerCase().indexOf(this.state.filter.toLocaleLowerCase()) !== -1,
    );
  }

  render() {
    return (
      <Container>
        <Top>
          <User
            onClickName={() => this.setState({ userInfoDialog: true })}
            onClickStatus={() => this.setState({ statusDialog: true })}
            user={this.props.user}
          />
          {this.state.statusDialog &&
            <Dialog onOverlayClick={() => this.setState({ statusDialog: false })}>
              <StatusList
                onSelect={(status) => {
                  this.props.setStatus(status);
                  this.setState({ statusDialog: false });
                }}
              />
              <DialogActions>
                <DialogAction onClick={() => this.setState({ statusDialog: false })}>
                  Cancel
                </DialogAction>
              </DialogActions>
            </Dialog>}
          {(this.state.userInfoDialog || this.props.user.username == null) &&
            <UserInfoDialog onClose={() => this.setState({ userInfoDialog: false })} />}
          <Filter
            placeholder="search friends..."
            onChange={e => this.setState({ filter: e.target.value })}
          />
        </Top>
        <glamorous.Div flex={2}>
          {this.filterFriends().length > 0
            ? <FriendsListUl>
              {this.filterFriends().map(f =>
                  (<li key={f.id}>
                    <Friend
                      active={f.id === this.props.activeChat}
                      onClick={() => this.props.setActiveChat(f.id)}
                      user={f}
                    />
                  </li>),
                )}
            </FriendsListUl>
            : <glamorous.Div padding="1em">
              {this.props.friends.length === 0
                  ? 'You have no friends yet :('
                  : 'No friends found...'}
            </glamorous.Div>}
        </glamorous.Div>
        <AddFriendButton>
          <span role="img" aria-label="Add">
            &#10133;
          </span>
          <AddFriendLabel>add friend</AddFriendLabel>
        </AddFriendButton>
      </Container>
    );
  }
}
