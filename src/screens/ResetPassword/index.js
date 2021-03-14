import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {resetPassword} from '../../redux/actions/auth';
import FormPassword from '../../components/Form/FormPassword';
import {showMessage} from '../../helpers/showMessage';
import LoadingIndicator from '../../components/LoadingIndicator';
import {Formik} from 'formik';

class ResetPassword extends Component {
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
  resetPasswordSend = async (values) => {
    this.setState({loading: true});
    const {password, confirmPassword} = values;
    if (password === confirmPassword) {
      await this.props.resetPassword(
        this.props.auth.tokenResetPassword,
        password,
      );
      if (this.props.auth.errorMsg === '') {
        this.setState({loading: false});
        showMessage(this.props.auth.message, 'success');
        this.props.navigation.replace('SignIn');
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
          onSubmit={(values) => this.resetPasswordSend(values)}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <>
              <TouchableOpacity onPress={handleSubmit}>
                <Text style={styles.next}>Next</Text>
              </TouchableOpacity>
              <View style={styles.row}>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.subTitle}>
                  Create and confirm your new password so you can login to
                  Meschat
                </Text>
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

const mapDispatchToProps = {resetPassword};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  next: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#ffffff',
    textAlign: 'right',
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
    marginTop: 23,
    marginBottom: 72,
  },
  gap: {
    height: 15,
  },
  textError: {
    fontSize: 12,
    color: 'red',
  },
});
