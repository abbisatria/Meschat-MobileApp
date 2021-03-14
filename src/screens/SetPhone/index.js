import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import FormNumber from '../../components/Form/FormNumber';
import {connect} from 'react-redux';
import {updateProfile} from '../../redux/actions/auth';
import {showMessage} from '../../helpers/showMessage';
import Arrow from '../../assets/icons/Arrow.svg';
import {Formik} from 'formik';
import * as Yup from 'yup';
import LoadingIndicator from '../../components/LoadingIndicator';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('*Phone number is required'),
});

class SetPhone extends Component {
  state = {
    loading: false,
  };
  updatePhoneNumber = async (values) => {
    this.setState({loading: true});
    const {token, user} = this.props.auth;
    await this.props.updateProfile(token, user.id, {
      phoneNumber: values.phoneNumber,
    });
    if (this.props.auth.errorMsg === '') {
      this.setState({loading: false});
      showMessage(this.props.auth.message, 'success');
      this.props.navigation.goBack();
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
          onSubmit={(values) => this.updatePhoneNumber(values)}>
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
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
                  <View style={styles.rowBack}>
                    <Arrow />
                    <Text style={styles.textBack}>Back</Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.text}>Set Phone Number</Text>
                <TouchableOpacity onPress={handleSubmit}>
                  <Text style={styles.text}>Done</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rowNote}>
                <FormNumber
                  placeholder="Your phone number"
                  label="Phone Number"
                  onChange={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <Text style={styles.textError}>{errors.phoneNumber}</Text>
                ) : null}
                <Text style={styles.note}>
                  You can choose a phone number on Meschat. {'\n'}
                  {'\n'}You can use 0-9. Minimum length of 9 numbers and maximum
                  length of 12 numbers.
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

export default connect(mapStateToProps, mapDispatchToProps)(SetPhone);

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
  textError: {
    fontSize: 12,
    color: 'red',
  },
});
