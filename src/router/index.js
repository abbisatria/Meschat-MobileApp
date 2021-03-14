import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  GetStarted,
  SignIn,
  SignUp,
  Verification,
  ForgotPassword,
  Chat,
  Setting,
  Contact,
  Chatting,
  SetName,
  SetPhone,
  SetPassword,
  ResetPassword,
  Loading,
} from '../screens';
import BottomNavigator from '../components/BottomNavigator';
import {View} from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Contact" component={Contact} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#000000'}}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="MainApp" component={MainApp} />
        <Stack.Screen name="Chatting" component={Chatting} />
        <Stack.Screen name="SetName" component={SetName} />
        <Stack.Screen name="SetPhone" component={SetPhone} />
        <Stack.Screen name="SetPassword" component={SetPassword} />
      </Stack.Navigator>
    </View>
  );
};

export default Router;
