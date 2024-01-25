/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SeatBookingScreen, MoiveDetailScreen } from './src/screens';
import TabNavigator from './src/navigators/TabNavigator';
const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        
      }} initialRouteName="Tab">
        <Stack.Screen name="Tab" component={TabNavigator} options={{
          animation : 'default',
        }} />
        <Stack.Screen name="MoiveDetails" component={MoiveDetailScreen} options={{
          animation:'slide_from_right',
        }}  />
        <Stack.Screen name="SeatBookings" component={SeatBookingScreen} options={{
          animation:'slide_from_bottom',
        }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
