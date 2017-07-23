import React from 'react';
import { css } from 'glamor';

const style = css({
  overflowY: 'scroll',
});

export default class ChatBox extends React.Component {
  static getFirstItem(props) {
    const children = React.Children.toArray(props.children);
    if (children.length > 0) {
      return children[0].key;
    }
    return null;
  }

  componentDidMount() {
    const el = this.el;
    this.scrollToBottom();
    this.syncDOM(el);
    el.onscroll = this.onScroll.bind(this);
    this.checkInfiniteLoad();

    this.syncFirstItem();
  }

  componentWillUpdate(newProps) {
    if (
      React.Children.toArray(newProps.children).length ===
      React.Children.toArray(this.props.children).length
    ) {
      this.direction = 'none';
      return;
    }
    const newFirstItem = ChatBox.getFirstItem(newProps);
    if (this.firstItem != null && this.firstItem !== newFirstItem) this.direction = 'up';
    else this.direction = 'down';
  }

  componentDidUpdate() {
    this.syncFirstItem();
    this.updateScrollTop();
    this.scrollToBottom();
    this.checkInfiniteLoad();
    this.syncDOM(this.el);
  }

  onScroll(e) {
    if (this.scrollTop !== e.target.scrollTop) {
      // DOM is ahead of us - event triggered by the user.
      this.onUserScroll(e.target);
    }
    this.checkInfiniteLoad();
  }

  onUserScroll(el) {
    const up = this.scrollTop > el.scrollTop;

    if (up) {
      this.props.onSetAutoscroll(false);
    } else if (this.isAtBottom(el)) {
      this.props.onSetAutoscroll(true);
    }

    this.syncDOM(el);
  }

  setScrollTop(value) {
    const maxScrollTop = this.el.scrollHeight - this.el.offsetHeight;
    const scrollTop = value < maxScrollTop ? value : maxScrollTop;
    this.scrollTop = scrollTop;
    this.el.scrollTop = scrollTop;
  }

  updateScrollTop() {
    const diff = this.el.scrollHeight - this.scrollHeight;
    if (this.direction === 'up' && diff > 0) {
      this.setScrollTop(this.scrollTop + diff);
    }
  }

  syncFirstItem() {
    const children = React.Children.toArray(this.props.children);
    if (children.length > 0) {
      this.firstItem = children[0].key;
    } else {
      this.firstItem = null;
    }
  }

  firstItem = null;
  direction = 'down';

  isAtBottom(el) {
    const autoscrollOffset = this.props.autoscrollOffset || 30;
    return el.scrollTop + el.offsetHeight + autoscrollOffset > el.scrollHeight;
  }

  scrollTop = null;
  scrollHeight = null;

  syncDOM(el) {
    this.scrollTop = el.scrollTop;
    this.scrollHeight = el.scrollHeight;
  }

  checkInfiniteLoad() {
    if (this.i < 0) return;
    const infiniteLoadOffset = this.props.infiniteLoadOffset || 30;
    if (
      this.el.scrollTop < infiniteLoadOffset &&
      !this.props.isFullyLoaded &&
      !this.props.isLoading
    ) {
      this.props.onInfiniteLoad();
    }
  }

  scrollToBottom() {
    if (this.props.autoscroll) {
      this.setScrollTop(this.el.scrollHeight - this.el.offsetHeight);
    }
  }

  render() {
    const WrapperTag = this.props.tag || 'div';
    return (
      <WrapperTag className={`${this.props.className} ${style}`} ref={el => (this.el = el)}>
        {this.props.children}
      </WrapperTag>
    );
  }
}
