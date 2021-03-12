import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import IcChatOn from '../../assets/icons/ic-chat-on.svg';
import IcChatOff from '../../assets/icons/ic-chat-off.svg';
import IcContactOn from '../../assets/icons/ic-contact-on.svg';
import IcContactOff from '../../assets/icons/ic-contact-off.svg';
import IcSettingOn from '../../assets/icons/ic-setting-on.svg';
import IcSettingOff from '../../assets/icons/ic-setting-off.svg';

const Icon = ({label, focus}) => {
  switch (label) {
    case 'Chat':
      return focus ? <IcChatOn /> : <IcChatOff />;
    case 'Contact':
      return focus ? <IcContactOn /> : <IcContactOff />;
    case 'Setting':
      return focus ? <IcSettingOn /> : <IcSettingOff />;
    default:
      return <IcChatOn />;
  }
};

export default function BottomNavigator({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPrevenDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={String(index)}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestId}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Icon label={label} focus={isFocused} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1c1c1c',
    paddingTop: 15,
    paddingBottom: 13,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    borderTopColor: '#3d3d3f',
    borderTopWidth: 2,
  },
});
