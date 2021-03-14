import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {REACT_APP_API_URL as API_URL} from '@env';
import PhotoProfile from '../../assets/images/profile.jpg';

export default class ContactItem extends Component {
  render() {
    return (
      <View style={styles.column}>
        <View style={styles.chat}>
          {this.props.data.picture && this.props.data.picture !== 'null' ? (
            <Image
              source={{
                uri: `${API_URL}upload/profile/${this.props.data.picture}`,
              }}
              style={styles.image}
            />
          ) : (
            <Image source={PhotoProfile} style={styles.image} />
          )}
          <View style={styles.rowChat}>
            <View style={styles.rowSender}>
              <Text style={styles.textSender}>{this.props.data.username}</Text>
            </View>
            <Text style={styles.textChat}>
              +62 {this.props.data.phoneNumber}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  column: {
    paddingLeft: 10,
  },
  chat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  textChat: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#979799',
  },
});
