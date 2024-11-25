import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TeamsScreen from './Screen/TeamsScreen';
import TeamDetailsScreen from './Screen/TeamDetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Selecciones" component={TeamsScreen} />
        <Stack.Screen name="Detalles de la seleccion" component={TeamDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
