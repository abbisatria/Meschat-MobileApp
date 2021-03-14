import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import FormPassword from '../../components/Form/FormPassword';
import {connect} from 'react-redux';
import {updateProfile} from '../../redux/actions/auth';
import {Formik} from 'formik';

import {showMessage} from '../../helpers/showMessage';
import LoadingIndicator from '../../components/LoadingIndicator';

import Arrow from '../../assets/icons/Arrow.svg';

class SetPassword extends Component {
  state = {
    loading: false,
  };
  passwordValidation(values) {
    const errors = {};
    const {password, confirmPassword} = values;

    if (!password) {
      errors.msg = 'New Password Required';
    } else if (!confirmPassword) {
      errors.msg = 'Repeat your new password';
    } else if (password.length < 8 || confirmPassword.length < 8) {
      errors.msg = 'Password have at least 8 characters';
    } else if (password !== confirmPassword) {
      errors.msg = 'New password & repeat password not same';
    }
    return errors;
  }
  updatePassword = async (values) => {
    const {token, user} = this.props.auth;
    const {password, confirmPassword} = values;
    this.setState({loading: true});
    if (password === confirmPassword) {
      await this.props.updateProfile(token, user.id, {
        password: password,
      });
      if (this.props.auth.errorMsg === '') {
        this.setState({loading: false});
        showMessage(this.props.auth.message, 'success');
        this.props.navigation.goBack();
      } else {
        this.setState({loading: false});
        showMessage(this.props.auth.errorMsg);
      }
    } else {
      this.setState({loading: false});
      showMessage('New password & repeat password not same');
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{
            password: '',
            confirmPassword: '',
          }}
          validate={(values) => this.passwordValidation(values)}
          onSubmit={(values) => this.updatePassword(values)}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <>
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
                  <View style={styles.rowBack}>
                    <Arrow />
                    <Text style={styles.textBack}>Back</Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.text}>Set Password</Text>
                <TouchableOpacity onPress={handleSubmit}>
                  <Text style={styles.text}>Done</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rowNote}>
                <FormPassword
                  label="New Password"
                  placeholder="Your new password"
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                <View style={styles.gap} />
                <FormPassword
                  label="Confirm Password"
                  placeholder="Your confirm password"
                  onChange={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                />
                {errors.msg ? (
                  <Text style={styles.textError}>{errors.msg}</Text>
                ) : null}
                <Text style={styles.note}>
                  You can choose a password on Meschat. {'\n'}
                  {'\n'}You can use a-z, 0-9 and underscores. Minimum length is
                  5 characters.
                </Text>
              </View>
            </>
          )}
        </Formik>
        {this.state.loading && <LoadingIndicator />}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {updateProfile};

export default connect(mapStateToProps, mapDispatchToProps)(SetPassword);

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
  note: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#818085',
    marginTop: 15,
  },
  rowNote: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  gap: {
    height: 10,
  },
  textError: {
    fontSize: 12,
    color: 'red',
  },
});
