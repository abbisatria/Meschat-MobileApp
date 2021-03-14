import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import FormNumber from '../../components/Form/FormNumber';
import FormPassword from '../../components/Form/FormPassword';
import LoadingIndicator from '../../components/LoadingIndicator';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {connect} from 'react-redux';
import {login} from '../../redux/actions/auth';
import {showMessage} from '../../helpers/showMessage';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, '*Password must have at least 5 characters')
    .max(50, '*Password must be less than 50 characters')
    .required('*Password is required'),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('*Phone number is required'),
});

class SignIn extends Component {
  state = {
    loading: false,
  };
  login = async (values) => {
    this.setState({loading: true});
    const {phoneNumber, password} = values;
    await this.props.login(phoneNumber, password);
    if (this.props.auth.token) {
      this.setState({loading: false});
      showMessage(this.props.auth.message, 'success');
      this.props.navigation.replace('MainApp');
    } else {
      this.setState({loading: false});
      showMessage(this.props.auth.errorMsg);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{
            phoneNumber: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => this.login(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            touched,
          }) => (
            <>
              <TouchableOpacity onPress={handleSubmit}>
                <Text style={styles.next}>Next</Text>
              </TouchableOpacity>
              <View style={styles.row}>
                <Text style={styles.title}>Sign In</Text>
                <Text style={styles.subTitle}>
                  Let's start your chat to {'\n'} build relationships
                </Text>
                <FormNumber
                  label="Phone Number"
                  placeholder="Your phone number"
                  onChange={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <Text style={styles.textError}>{errors.phoneNumber}</Text>
                ) : null}
                <View style={styles.gap} />
                <FormPassword
                  label="Password"
                  placeholder="Your password"
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <Text style={styles.textError}>{errors.password}</Text>
                ) : null}
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ForgotPassword')
                  }>
                  <Text style={styles.textForgot}>Forgot Password?</Text>
                </TouchableOpacity>
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

const mapDispatchToProps = {login};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

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
  textForgot: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
    textAlign: 'right',
    marginTop: 15,
  },
  textError: {
    fontSize: 12,
    color: 'red',
  },
});
