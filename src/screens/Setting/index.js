import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from 'react-native';

import SenderTwo from '../../assets/images/sender-two.jpg';
import IcProfile from '../../assets/icons/ic-profile.svg';
import IcPhone from '../../assets/icons/ic-phone.svg';
import IcPassword from '../../assets/icons/ic-password.svg';
import IcCamera from '../../assets/icons/ic-camera.svg';

export default class Setting extends Component {
  state = {
    modalVisible: false,
  };
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  render() {
    const {modalVisible} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.text}>Setting</Text>
        </View>
        <View style={styles.rowProfile}>
          <Image source={SenderTwo} style={styles.image} />
          <Text style={styles.name}>Abbi Satria</Text>
          <Text style={styles.phoneNumber}>+62 899 721 2282</Text>
        </View>
        <View style={styles.rowContent}>
          <TouchableOpacity onPress={() => this.setModalVisible(true)}>
            <View style={styles.rowSet}>
              <View style={styles.icon}>
                <IcCamera />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.text}>Set Photo Profile</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SetName')}>
            <View style={styles.rowSet}>
              <View style={styles.icon}>
                <IcProfile />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.text}>Set Username</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SetPhone')}>
            <View style={styles.rowSet}>
              <View style={styles.icon}>
                <IcPhone />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.text}>Set Phone Number</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SetPassword')}>
            <View style={styles.rowSet}>
              <View style={styles.icon}>
                <IcPassword />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.text}>Set Password</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.rowSignOut}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignIn')}>
            <Text style={styles.textSignOut}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.rowModal}>
              <Pressable style={styles.button}>
                <Text style={styles.textButton}>Camera</Text>
              </Pressable>
              <View style={styles.gap} />
              <Pressable style={styles.button}>
                <Text style={styles.textButton}>Gallery</Text>
              </Pressable>
              <View style={styles.gap} />
              <Pressable style={styles.buttonDelete}>
                <Text style={styles.textDelete}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    paddingVertical: 10,
    borderBottomColor: '#3d3d3f',
    borderBottomWidth: 2,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  rowProfile: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1c1c1c',
    borderBottomColor: '#3d3d3f',
    borderBottomWidth: 2,
    marginBottom: 50,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#ffffff',
    marginTop: 10,
  },
  phoneNumber: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#979799',
  },
  rowSignOut: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    paddingVertical: 15,
    marginTop: 50,
  },
  rowContent: {
    backgroundColor: '#1c1c1c',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  textSignOut: {
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
    color: '#eb575e',
  },
  rowSet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
  },
  rowText: {
    borderBottomColor: '#3d3d3f',
    borderBottomWidth: 1,
    flex: 1,
    paddingVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  rowModal: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  button: {
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  buttonDelete: {
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#eb575e',
  },
  textButton: {
    fontSize: 14,
    textAlign: 'center',
  },
  textDelete: {
    fontSize: 14,
    textAlign: 'center',
    color: '#eb575e',
  },
  gap: {
    height: 10,
  },
});
