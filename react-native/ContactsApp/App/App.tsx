import React from 'react';
import AddContact from './screens/AddContact';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UpdateContact from './screens/UpdateContact';
import TopNavigation from './navigation/TopNavigation';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 32, fontWeight: '700', color: '#1d1d1d'},
        }}>
        <Stack.Screen
          name="ContactList"
          component={TopNavigation}
          options={{headerShown: false}}/>
        <Stack.Screen
          name="AddContact"
          component={AddContact}
          options={{title: 'Add New Contact'}}
        />
        <Stack.Screen
          name="UpdateContact"
          component={UpdateContact}
          options={{title: 'Update Contact'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
