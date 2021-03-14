import React, {Component} from 'react';
import io from '../../helpers/socket';
import {connect} from 'react-redux';
import {historyChat, listHistoryChat} from '../../redux/actions/chat';

class Root extends Component {
  getChatView = async (token, sender) => {
    await this.props.historyChat(token, sender);
  };
  getListHistoryChat = async (token) => {
    await this.props.listHistoryChat(token);
  };
  componentDidMount() {
    io.onAny(() => {
      const {id} = this.props.auth.user;
      const {token} = this.props.auth;
      const {sender} = this.props.chat;
      if (id) {
        io.once(id, (msg) => {
          this.getChatView(token, sender);
          this.getListHistoryChat(token);
        });
      }
    });
  }
  render() {
    return <>{this.props.children}</>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
});

const mapDispatchToProps = {historyChat, listHistoryChat};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
