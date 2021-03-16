import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {
  listHistoryChat,
  historyChat,
  sender,
  pagingListHistoryChat,
} from '../../redux/actions/chat';
import {getContact} from '../../redux/actions/contact';
import {REACT_APP_API_URL as API_URL} from '@env';
import moment from 'moment';

import ContactItem from '../../components/ContactItem';
import LoadingIndicator from '../../components/LoadingIndicator';

import Message from '../../assets/icons/ic-create-msg.svg';
import PhotoProfile from '../../assets/images/profile.jpg';
import IcRead from '../../assets/icons/ic-read.svg';

class Chat extends Component {
  state = {
    modalVisible: false,
    message: '',
    loading: false,
    listRefresh: false,
    contact: [],
    pageContact: 1,
    searchMessage: '',
  };
  setModalVisible = async (visible) => {
    await this.props.getContact(this.props.auth.token);
    this.setState({modalVisible: visible, contact: this.props.contact.results});
  };
  async componentDidMount() {
    await this.props.listHistoryChat(this.props.auth.token);
  }
  chatting = async (idSender, username, picture) => {
    const {token} = this.props.auth;
    await this.props.historyChat(token, idSender);
    await this.props.sender(idSender);
    this.props.navigation.navigate('Chatting', {idSender, username, picture});
  };
  next = async () => {
    if (
      this.props.chat.pageInfoListHistoryChat.currentPage <
      this.props.chat.pageInfoListHistoryChat.totalPage
    ) {
      const {searchMessage} = this.state;
      await this.props.pagingListHistoryChat(
        this.props.auth.token,
        searchMessage,
        this.props.chat.pageInfoListHistoryChat.currentPage + 1,
        null,
      );
    }
  };
  search = async (value) => {
    this.setState({loading: true, searchMessage: value});
    await this.props.listHistoryChat(this.props.auth.token, value);
    if (this.props.chat.listHistoryChat.length > 0) {
      this.setState({
        message: '',
        loading: false,
      });
    } else {
      this.setState({
        message: `${value} Not Found`,
        loading: false,
      });
    }
  };
  refresh = async () => {
    this.setState({loading: true});
    await this.props.listHistoryChat(this.props.auth.token);
    if (this.props.chat.listHistoryChat.length > 0) {
      this.setState({
        loading: false,
        message: '',
        page: 1,
      });
    } else {
      this.setState({
        message: 'Chat Not Found',
        loading: false,
        page: 1,
      });
    }
  };
  searchContact = async (value) => {
    this.setState({loading: true});
    await this.props.getContact(this.props.auth.token, value);
    if (this.props.contact.results.length > 0) {
      this.setState({
        message: '',
        loading: false,
        contact: this.props.contact.results,
        pageContact: 1,
      });
    } else {
      this.setState({
        message: `${value} Not Found`,
        loading: false,
        contact: this.props.contact.results,
        pageContact: 1,
      });
    }
  };
  render() {
    const {modalVisible} = this.state;
    const {auth} = this.props;
    const date = new Date();
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity>
            <Text style={styles.text}>Edit</Text>
          </TouchableOpacity>
          <Text style={styles.text}>Chats</Text>
          <TouchableOpacity onPress={() => this.setModalVisible(true)}>
            <Message />
          </TouchableOpacity>
        </View>
        <View style={styles.backgroundInput}>
          <View style={styles.input}>
            <Icon name="search" size={18} color="#8b8b8b" />
            <TextInput
              style={styles.textInput}
              placeholder="Search for messages"
              placeholderTextColor="#8b8b8b"
              onChangeText={(value) => this.search(value)}
            />
          </View>
        </View>
        {this.props.auth.token && this.props.chat.listHistoryChat.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.props.chat.listHistoryChat}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  this.chatting(
                    auth.user.phoneNumber === item.senderPhoneNumber
                      ? item.idReceiver
                      : item.idSender,
                    auth.user.phoneNumber === item.senderPhoneNumber
                      ? item.receiverUsername
                      : item.senderUsername,
                    auth.user.phoneNumber === item.senderPhoneNumber
                      ? item.receiverPicture
                      : item.senderPicture,
                  )
                }>
                <View style={styles.column}>
                  <View style={styles.chat}>
                    {auth.user.phoneNumber === item.senderPhoneNumber ? (
                      item.receiverPicture &&
                      item.receiverPicture !== 'null' ? (
                        <Image
                          source={{
                            uri: `${API_URL}upload/profile/${item.receiverPicture}`,
                          }}
                          style={styles.image}
                        />
                      ) : (
                        <Image source={PhotoProfile} style={styles.image} />
                      )
                    ) : item.senderPicture && item.senderPicture !== 'null' ? (
                      <Image
                        source={{
                          uri: `${API_URL}upload/profile/${item.senderPicture}`,
                        }}
                        style={styles.image}
                      />
                    ) : (
                      <Image source={PhotoProfile} style={styles.image} />
                    )}
                    <View style={styles.rowChat}>
                      <View style={styles.rowSender}>
                        <Text style={styles.textSender}>
                          {auth.user.phoneNumber === item.senderPhoneNumber
                            ? item.receiverUsername
                            : item.senderUsername}
                        </Text>
                        <Text style={styles.timeSender}>
                          {moment(item.createdAt).format('D') < date.getDate()
                            ? moment(item.createdAt).format(
                                'DD MMMM YYYY, hh:mm a',
                              )
                            : moment(item.createdAt).format('hh:mm a')}
                        </Text>
                      </View>
                      <View style={styles.rowMessage}>
                        {auth.user.phoneNumber === item.senderPhoneNumber ? (
                          <IcRead />
                        ) : null}
                        <Text style={styles.textChat}>
                          {item.message.length > 30
                            ? `${item.message.substring(0, 30)}.....`
                            : item.message}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => String(item.id)}
            refreshing={this.state.listRefresh}
            onRefresh={this.refresh}
            onEndReached={this.next}
            onEndReachedThreshold={0.5}
          />
        ) : (
          <Text style={styles.textMessage}>{this.state.message}</Text>
        )}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: false});
          }}>
          <View style={styles.container}>
            <View style={styles.rowModal}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({modalVisible: false});
                }}>
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
              <Text style={[styles.text, styles.gap]}>New Message</Text>
            </View>
            <View style={styles.backgroundInput}>
              <View style={styles.input}>
                <Icon name="search" size={18} color="#8b8b8b" />
                <TextInput
                  style={styles.textInput}
                  placeholder="Search"
                  placeholderTextColor="#8b8b8b"
                  onChangeText={(value) => this.searchContact(value)}
                />
              </View>
            </View>
            {this.state.contact.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.contact}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      this.setModalVisible(!modalVisible);
                      this.chatting(item.id, item.username, item.picture);
                    }}>
                    <ContactItem data={item} />
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => String(item.id)}
              />
            ) : (
              <Text style={styles.textMessage}>{this.state.message}</Text>
            )}
          </View>
        </Modal>
        {this.state.loading && <LoadingIndicator />}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
  contact: state.contact,
});

const mapDispatchToProps = {
  listHistoryChat,
  historyChat,
  sender,
  getContact,
  pagingListHistoryChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

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
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
  },
  textMessage: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
  },
  backgroundInput: {
    backgroundColor: '#1c1c1c',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: '#3d3d3f',
    borderBottomWidth: 2,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f0f0f',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  textInput: {
    fontSize: 16,
    color: '#8b8b8b',
    marginLeft: 6,
  },
  column: {
    paddingLeft: 10,
  },
  chat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  rowChat: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#3d3d3f',
    marginLeft: 10,
    paddingRight: 10,
  },
  rowSender: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textSender: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#ffffff',
  },
  timeSender: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8b8b8b',
  },
  rowMessage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textChat: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#979799',
    marginLeft: 2,
  },
  rowModal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  gap: {
    marginLeft: 50,
  },
});
