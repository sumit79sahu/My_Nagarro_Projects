import React from 'react';
import Home from './Screens/Home';
import List from './Screens/List';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Store from './Store/Store';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

const persistor=persistStore(Store);
const Stack = createNativeStackNavigator();
function App() {
  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 35},
          }}>
          <Stack.Screen
            name="Home"
            options={{title: 'Buget Entry'}}
            component={Home}
          />
          <Stack.Screen
            name="List"
            options={{title: 'Buget Entry Listing'}}
            component={List}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
