import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {signUp} from '../../redux/actions/auth';
import Arrow from '../../assets/icons/Arrow.svg';
import {showMessage} from '../../helpers/showMessage';
import LoadingIndicator from '../../components/LoadingIndicator';
import PushNotification from 'react-native-push-notification';

class Verification extends Component {
  state = {
    code: this.props.route.params.code,
    codeVerification: '',
    loading: false,
  };
  signUpVerification = async () => {
    this.setState({loading: true});
    const {phoneNumber, password} = this.props.route.params;
    const {code, codeVerification} = this.state;
    if (code === codeVerification) {
      await this.props.signUp(phoneNumber, password);
      if (this.props.auth.token) {
        this.setState({loading: false});
        showMessage(
          `${this.props.auth.message}, Please complete the profile`,
          'success',
        );
        this.props.navigation.replace('MainApp');
      } else {
        this.setState({loading: false});
        showMessage(this.props.auth.errorMsg);
      }
    } else {
      this.setState({loading: false});
      showMessage('Incorrect verification code');
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rowHeader}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={styles.rowHeader}>
              <Arrow />
              <Text style={styles.back}>Back</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.signUpVerification()}>
            <Text style={styles.next}>Next</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>
            +62 {this.props.route.params.phoneNumber}
          </Text>
          <Text style={styles.subTitle}>
            We have sent you a Message with the code
          </Text>
          <View style={styles.rowCode}>
            <TextInput
              style={styles.input}
              placeholder="Code"
              placeholderTextColor="#474747"
              keyboardType="number-pad"
              onChangeText={(codeVerification) =>
                this.setState({codeVerification})
              }
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              setTimeout(() => {
                PushNotification.localNotification({
                  channelId: 'general',
                  title: 'Code Verification',
                  message: `Code: ${this.state.code}`,
                });
              }, 2000)
            }>
            <Text style={styles.subTitle}>Haven't received the code?</Text>
          </TouchableOpacity>
        </View>
        {this.state.loading && <LoadingIndicator />}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {signUp};

export default connect(mapStateToProps, mapDispatchToProps)(Verification);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  back: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#ffffff',
    marginLeft: 10,
  },
  next: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#ffffff',
  },
  row: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 50,
  },
  gap: {
    height: 15,
  },
  rowCode: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#474747',
    borderBottomWidth: 1,
    marginBottom: 50,
  },
  input: {
    fontSize: 20,
    color: '#ffffff',
  },
});
