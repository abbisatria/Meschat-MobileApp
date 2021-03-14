import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import FormText from '../../components/Form/FormText';
import {connect} from 'react-redux';
import {updateProfile} from '../../redux/actions/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {showMessage} from '../../helpers/showMessage';
import LoadingIndicator from '../../components/LoadingIndicator';

import Arrow from '../../assets/icons/Arrow.svg';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, '*Username must have at least 5 characters')
    .max(50, '*Username must be less than 50 characters')
    .required('*Username is required'),
});

class SetName extends Component {
  state = {
    loading: false,
  };
  updateUsername = async (values) => {
    this.setState({loading: true});
    const {token, user} = this.props.auth;
    await this.props.updateProfile(token, user.id, {
      username: values.username,
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
            username: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => this.updateUsername(values)}>
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
                <Text style={styles.text}>Set Username</Text>
                <TouchableOpacity onPress={handleSubmit}>
                  <Text style={styles.text}>Done</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rowNote}>
                <FormText
                  placeholder="Your username"
                  label="Username"
                  onChange={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
                {errors.username && touched.username ? (
                  <Text style={styles.textError}>{errors.username}</Text>
                ) : null}
                <Text style={styles.note}>
                  You can choose a username on Meschat. {'\n'}
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

export default connect(mapStateToProps, mapDispatchToProps)(SetName);

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
