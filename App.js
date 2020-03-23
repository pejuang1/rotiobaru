/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
// import { createBottomTabNavigator, createAppContainer, } from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Homenav from './src/component/home'
// import Halamanutama from './src/component/halamanutama'
import Tes from './src/component/tes'


const App =() => {
  return (
    // <Tab.Navigator>
    //   <Tab.Screen name="Home" component={Halamanutama} />
    //   <Tab.Screen name="Home2" component={Home} />
    // </Tab.Navigator>
    // <Home/>
  // <Halamanutama/>
  <Tes/>
  );
};


export default App;
