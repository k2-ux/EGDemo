import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import NumbersInfo from '../screens/NumbersInfo';
import Deviceinfo from '../screens/Deviceinfo';
import FingerprintVerificationScreen from '../screens/FingerprintVerificationScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="fingerprint"
        component={FingerprintVerificationScreen}
        options={{headerShown:false}}
      /> 
       <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerTitleAlign: 'center'}}
      />
      
      <Stack.Screen name="Numbers" component={NumbersInfo} />
      <Stack.Screen name="Deviceinfo" component={Deviceinfo} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
