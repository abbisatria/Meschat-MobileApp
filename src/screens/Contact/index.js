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
import {connect} from 'react-redux';
import {getContact} from '../../redux/actions/contact';
import {historyChat, sender} from '../../redux/actions/chat';

import ContactItem from '../../components/ContactItem';
import LoadingIndicator from '../../components/LoadingIndicator';

import {showMessage} from '../../helpers/showMessage';

import Add from '../../assets/icons/ic-add.svg';

class Contact extends Component {
  state = {
    sort: '',
    order: 'ASC',
    loading: false,
    page: 1,
    contact: [],
  };
  chatting = async (idSender, username, picture) => {
    const {token} = this.props.auth;
    await this.props.historyChat(token, idSender);
    await this.props.sender(idSender);
    this.props.navigation.navigate('Chatting', {idSender, username, picture});
  };
  async componentDidMount() {
    await this.props.getContact(this.props.auth.token);
    this.setState({contact: this.props.contact.results});
  }
  search = async (value) => {
    this.setState({loading: true});
    await this.props.getContact(this.props.auth.token, value);
    if (this.props.contact.results > 0) {
      this.setState({
        message: '',
        loading: false,
        contact: this.props.contact.results,
        page: 1,
        sort: '',
        order: 'ASC',
      });
    } else {
      this.setState({
        message: `${value} Not Found`,
        loading: false,
        contact: this.props.contact.results,
        page: 1,
        sort: '',
        order: 'ASC',
      });
    }
  };
  sort = async (value) => {
    this.setState({sort: value, loading: true});
    const {order} = this.state;
    await this.props.getContact(
      this.props.auth.token,
      null,
      null,
      null,
      value,
      order,
    );
    this.setState({
      loading: false,
      contact: this.props.contact.results,
      page: 1,
    });
  };
  sortBy = async () => {
    const {sort, order} = this.state;
    if (sort !== '') {
      if (order === 'ASC') {
        this.setState({loading: true});
        await this.props.getContact(
          this.props.auth.token,
          null,
          null,
          null,
          sort,
          'DESC',
        );
        this.setState({
          loading: false,
          contact: this.props.contact.results,
          order: 'DESC',
          page: 1,
        });
      } else {
        this.setState({loading: true});
        await this.props.getContact(
          this.props.auth.token,
          null,
          null,
          null,
          sort,
          'ASC',
        );
        this.setState({
          loading: false,
          contact: this.props.contact.results,
          order: 'ASC',
          page: 1,
        });
      }
    } else {
      showMessage('Please select the sort first');
    }
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
              placeholder="Search Contact"
              placeholderTextColor="#8b8b8b"
              onChangeText={(value) => this.search(value)}
            />
          </View>
        </View>
        <View style={styles.rowSort}>
          <Picker
            selectedValue={this.state.sort}
            onValueChange={(itemValue) => this.sort(itemValue)}
            style={styles.picker}
            dropdownIconColor="white">
            <Picker.Item label="Sort" />
            <Picker.Item label="Name" value="username" />
          </Picker>
          <TouchableOpacity onPress={this.sortBy}>
            {this.state.order === 'ASC' ? (
              <Icon size={15} name="arrow-up" color="#ffffff" />
            ) : (
              <Icon size={15} name="arrow-down" color="#ffffff" />
            )}
          </TouchableOpacity>
        </View>
        {this.state.contact ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.contact}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  this.chatting(item.id, item.username, item.picture);
                }}>
                <ContactItem data={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => String(item.id)}
          />
        ) : (
          <Text style={styles.text}>{this.state.message}</Text>
        )}
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

const mapDispatchToProps = {getContact, historyChat, sender};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);

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
