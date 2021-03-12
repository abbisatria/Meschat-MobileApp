import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';

import ContactItem from '../../components/ContactItem';

import Add from '../../assets/icons/ic-add.svg';
import SenderOne from '../../assets/images/sender-one.jpg';
import SenderTwo from '../../assets/images/sender-two.jpg';
import SenderThree from '../../assets/images/sender-three.jpg';
import SenderFour from '../../assets/images/sender-four.jpg';
import SenderFive from '../../assets/images/sender-five.jpg';
import SenderSix from '../../assets/images/sender-six.jpg';
import SenderSeven from '../../assets/images/sender-seven.jpg';

export default class Contact extends Component {
  state = {
    chat: [
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
    ],
    sort: '',
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View />
          <Text style={styles.text}>Contact</Text>
          <TouchableOpacity>
            <Add />
          </TouchableOpacity>
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
        <View style={styles.rowSort}>
          <Picker
            selectedValue={this.state.sort}
            onValueChange={(sort) => this.setState({sort})}
            style={styles.picker}
            dropdownIconColor="white">
            <Picker.Item label="Sort" />
            <Picker.Item label="Last Chat" value="Last Chat" />
            <Picker.Item label="Name" value="name" />
          </Picker>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.chat}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Chatting')}>
              <ContactItem
                image={item.image}
                name={item.sender}
                phone={item.phone}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => String(item.id)}
        />
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
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
    color: '#8b8b8b',
    marginLeft: 6,
  },
  rowSort: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    color: 'white',
    width: 132,
  },
});
