import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/router';
import {Provider} from 'react-redux';
import persistedStore from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import {Root} from './src/screens';
import PushNotification from 'react-native-push-notification';

PushNotification.createChannel(
  {
    channelId: 'general',
    channelName: 'General Notification',
    channelDescription: 'A channel to categorise your notifications',
    playSound: false,
    soundName: 'default',
    importance: 4,
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`),
);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const {store, persistor} = persistedStore();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} />
      <NavigationContainer>
        <Root>
          <Router />
        </Root>
        <FlashMessage position="top" duration={3000} />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
