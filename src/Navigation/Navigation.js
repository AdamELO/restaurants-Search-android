import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from "../Components/Search";
import RestaurantsInfo from "../Components/RestaurantsInfo";
import Reviews from "../Components/Reviews";


const Stack = createStackNavigator();


export default function Navigation() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Search} options={{ title: 'Restaurant/Food Search', headerTitleStyle: { alignSelf: 'center' } }} />
        <Stack.Screen
          name="Detail"
          component={RestaurantsInfo}
          options={{
            title: 'Restaurant Infos',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            }
          }} />
        <Stack.Screen name="Reviews" component={Reviews} options={{ title: 'Reviews' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
