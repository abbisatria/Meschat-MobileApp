import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {forgotPassword} from '../../redux/actions/auth';
import FormNumber from '../../components/Form/FormNumber';
import Arrow from '../../assets/icons/Arrow.svg';
import LoadingIndicator from '../../components/LoadingIndicator';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {showMessage} from '../../helpers/showMessage';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('*Phone number is required'),
});

class ForgotPassword extends Component {
  state = {
    loading: false,
  };
  forgotPasswordSend = async (values) => {
    this.setState({loading: true});
    await this.props.forgotPassword(values.phoneNumber);
    if (this.props.auth.tokenResetPassword) {
      this.setState({loading: false});
      showMessage(this.props.auth.message, 'success');
      this.props.navigation.navigate('ResetPassword');
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
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => this.forgotPasswordSend(values)}>
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
              <View style={styles.rowHeader}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
                  <View style={styles.rowHeader}>
                    <Arrow />
                    <Text style={styles.back}>Back</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit}>
                  <Text style={styles.next}>Next</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.subTitle}>
                  Enter your phone number so we can send you a verification code
                  for resetting your password.
                </Text>
                <FormNumber
                  placeholder="Your phone number"
                  onChange={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <Text style={styles.textError}>{errors.phoneNumber}</Text>
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

const mapDispatchToProps = {forgotPassword};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

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
