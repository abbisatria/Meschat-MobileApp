import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FormPassword extends Component {
  state = {
    isPasswordShown: false,
  };
  togglePasswordVisiblity = () => {
    const {isPasswordShown} = this.state;
    this.setState({isPasswordShown: !isPasswordShown});
  };
  render() {
    const {isPasswordShown} = this.state;
    return (
      <View>
        <Text style={styles.label}>{this.props.label}</Text>
        <View style={styles.input}>
          <TextInput
            style={styles.textInput}
            placeholder={this.props.placeholder}
            placeholderTextColor="#474747"
            secureTextEntry={isPasswordShown ? false : true}
            onChangeText={this.props.onChange}
            defaultValue={this.props.value}
            onBlur={this.props.onBlur}
          />
          <TouchableOpacity onPress={this.togglePasswordVisiblity}>
            <Icon
              name={isPasswordShown ? 'eye-slash' : 'eye'}
              size={20}
              color="#A0A3BD"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
    marginBottom: 5,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 15,
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
  },
});
