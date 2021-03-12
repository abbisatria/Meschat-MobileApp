import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import ChatItem from '../../components/ChatItem';

import SenderOne from '../../assets/images/sender-one.jpg';
import Arrow from '../../assets/icons/Arrow.svg';
import Send from '../../assets/icons/ic-send.svg';

export default class Chatting extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={styles.rowBack}>
              <Arrow />
              <Text style={styles.textBack}>Back</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.text}>Tasya Salsaliantika</Text>
          <Image source={SenderOne} style={styles.image} />
        </View>
        <View style={styles.contentChat}>
          <ChatItem isMe message="How are u?" dateTime="14:00 PM" />
          <ChatItem message="Im Good, and you?" dateTime="14:10 PM" />
          <ChatItem
            isMe
            message="Where do you come from?"
            dateTime="14:20 PM"
          />
          <ChatItem message="Im from Indonesia, and you?" dateTime="14:30 PM" />
          <ChatItem isMe message="I live in Indonesia" dateTime="14:40 PM" />
        </View>
        <View style={styles.rowInput}>
          <View style={styles.input}>
            <TextInput
              placeholder="Message"
              placeholderTextColor="#828284"
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Send />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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
