import { MainStack } from '@mb/stacks';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};
