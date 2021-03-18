import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import ChatItem from '../../components/ChatItem';
import {connect} from 'react-redux';
import {
  sendChat,
  historyChat,
  listHistoryChat,
  pagingHistoryChat,
} from '../../redux/actions/chat';
import {REACT_APP_API_URL as API_URL} from '@env';
import moment from 'moment';

import Arrow from '../../assets/icons/Arrow.svg';
import Send from '../../assets/icons/ic-send.svg';
import SendActive from '../../assets/icons/ic-send-active.svg';
import PhotoProfile from '../../assets/images/profile.jpg';

class Chatting extends Component {
  state = {
    sendMessage: '',
  };
  chat = async () => {
    const {token} = this.props.auth;
    await this.props.sendChat(
      token,
      this.props.route.params.idSender,
      this.state.sendMessage,
    );
    this.setState({sendMessage: ''});
    await this.props.historyChat(token, this.props.route.params.idSender);
    await this.props.listHistoryChat(token);
  };
  next = async () => {
    if (
      this.props.chat.pageInfoHistoryChat.currentPage <
      this.props.chat.pageInfoHistoryChat.totalPage
    ) {
      await this.props.pagingHistoryChat(
        this.props.auth.token,
        this.props.route.params.idSender,
        this.props.chat.pageInfoHistoryChat.currentPage + 1,
      );
    }
  };
  render() {
    const date = new Date();
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={styles.rowBack}>
              <Arrow />
              <Text style={styles.textBack}>Back</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.text}>{this.props.route.params.username}</Text>
          {this.props.route.params.picture &&
          this.props.route.params.picture !== 'null' ? (
            <Image
              source={{
                uri: `${API_URL}upload/profile/${this.props.route.params.picture}`,
              }}
              style={styles.image}
            />
          ) : (
            <Image source={PhotoProfile} style={styles.image} />
          )}
        </View>
        <View style={styles.contentChat}>
          {this.props.chat.historyChat.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.props.chat.historyChat}
              inverted={true}
              renderItem={({item}) => (
                <ChatItem
                  isMe={item.idSender === Number(this.props.auth.user.id)}
                  message={item.message}
                  dateTime={
                    moment(item.createdAt).format('D') < date.getDate()
                      ? moment(item.createdAt).format('DD MMMM YYYY, hh:mm a')
                      : moment(item.createdAt).format('hh:mm a')
                  }
                />
              )}
              keyExtractor={(item) => String(item.id)}
              onEndReached={this.next}
              onEndReachedThreshold={0.5}
            />
          ) : null}
        </View>
        <View style={styles.rowInput}>
          <View style={styles.input}>
            <TextInput
              placeholder="Message"
              placeholderTextColor="#828284"
              style={styles.textInput}
              onChangeText={(sendMessage) => this.setState({sendMessage})}
              defaultValue={this.state.sendMessage}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.chat()}
            disabled={this.state.sendMessage === ''}>
            {this.state.sendMessage !== '' ? <SendActive /> : <Send />}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
});

const mapDispatchToProps = {
  sendChat,
  historyChat,
  listHistoryChat,
  pagingHistoryChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatting);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  rowBack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
  },
  textBack: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
    marginLeft: 5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  contentChat: {
    flex: 1,
    paddingVertical: 15,
  },
  rowInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1c1c1c',
  },
  input: {
    backgroundColor: '#000000',
    paddingHorizontal: 10,
    borderRadius: 16,
    flex: 1,
    marginRight: 10,
  },
  textInput: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: '#000000',
    padding: 8,
    borderRadius: 16,
  },
});
