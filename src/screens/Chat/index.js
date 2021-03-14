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
import {listHistoryChat, historyChat, sender} from '../../redux/actions/chat';
import {getContact} from '../../redux/actions/contact';
import {REACT_APP_API_URL as API_URL} from '@env';
import moment from 'moment';

import ContactItem from '../../components/ContactItem';

import Message from '../../assets/icons/ic-create-msg.svg';
import SenderOne from '../../assets/images/sender-one.jpg';
import SenderTwo from '../../assets/images/sender-two.jpg';
import SenderThree from '../../assets/images/sender-three.jpg';
import SenderFour from '../../assets/images/sender-four.jpg';
import SenderFive from '../../assets/images/sender-five.jpg';
import SenderSix from '../../assets/images/sender-six.jpg';
import SenderSeven from '../../assets/images/sender-seven.jpg';
import PhotoProfile from '../../assets/images/profile.jpg';

class Chat extends Component {
  state = {
    chat: [
      {
        id: 1,
        image: SenderOne,
        sender: 'Tasya Salsaliantika',
        time: '21:00',
        message: 'Good night dear, sweet dreams',
      },
      {
        id: 2,
        image: SenderTwo,
        sender: 'Ule',
        time: '20:00',
        message: 'Coffee bro',
      },
      {
        id: 3,
        image: SenderThree,
        sender: 'Fahmi',
        time: '19:00',
        message: 'At home or not brother?',
      },
      {
        id: 4,
        image: SenderFour,
        sender: 'Dio',
        time: '18:00',
        message: 'Tomorrow sunmori bro!!',
      },
      {
        id: 5,
        image: SenderFive,
        sender: 'Reza',
        time: '17:00',
        message: 'Can you fix the laptop or not bro?',
      },
      {
        id: 6,
        image: SenderSix,
        sender: 'Dwi',
        time: '16:00',
        message: 'Bro, can you help me with college assignments or not?',
      },
      {
        id: 7,
        image: SenderSeven,
        sender: 'Lathif',
        time: '15:00',
        message: 'Bro tomorrow futsall!!',
      },
    ],
    contact: [
      {
        id: 1,
        image: SenderOne,
        sender: 'Tasya Salsaliantika',
        phone: '+62 899 7212 282',
      },
      {
        id: 2,
        image: SenderTwo,
        sender: 'Ule',
        phone: '+62 899 7212 282',
      },
      {
        id: 3,
        image: SenderThree,
        sender: 'Fahmi',
        phone: '+62 899 7212 282',
      },
      {
        id: 4,
        image: SenderFour,
        sender: 'Dio',
        phone: '+62 899 7212 282',
      },
      {
        id: 5,
        image: SenderFive,
        sender: 'Reza',
        phone: '+62 899 7212 282',
      },
      {
        id: 6,
        image: SenderSix,
        sender: 'Dwi',
        phone: '+62 899 7212 282',
      },
      {
        id: 7,
        image: SenderSeven,
        sender: 'Lathif',
        phone: '+62 899 7212 282',
      },
      {
        id: 8,
        image: SenderSix,
        sender: 'Dwi',
        phone: '+62 899 7212 282',
      },
      {
        id: 9,
        image: SenderSeven,
        sender: 'Lathif',
        phone: '+62 899 7212 282',
      },
      {
        id: 10,
        image: SenderSeven,
        sender: 'Lathif',
        phone: '+62 899 7212 282',
      },
    ],
    modalVisible: false,
  };
  setModalVisible = async (visible) => {
    await this.props.getContact(this.props.auth.token);
    this.setState({modalVisible: visible});
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
            />
          </View>
        </View>
        {this.props.chat.listHistoryChat.length > 0 && this.props.auth.token ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.props.chat.listHistoryChat}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  this.chatting(
                    item.idSender,
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
                      <Text style={styles.textChat}>{item.message}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => String(item.id)}
          />
        ) : null}
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
                />
              </View>
            </View>
            {this.props.contact.results ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.contact.results}
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
            ) : null}
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
  contact: state.contact,
});

const mapDispatchToProps = {listHistoryChat, historyChat, sender, getContact};

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
  textChat: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#979799',
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
