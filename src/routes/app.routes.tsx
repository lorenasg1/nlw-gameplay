import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AppointmentCreate } from '../screens/AppointmentCreate';
import { AppointmentDetails } from '../screens/AppointmentDetails';
import { Home } from '../screens/Home';
import { SignIn } from '../screens/SignIn';
import { theme } from '../shared/styles/theme';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: theme.colors.secondary100,
        },
      }}
    >
      <Screen name="Home" component={Home}></Screen>
      <Screen name="AppointmentDetails" component={AppointmentDetails}></Screen>
      <Screen name="AppointmentCreate" component={AppointmentCreate}></Screen>
    </Navigator>
  );
}
