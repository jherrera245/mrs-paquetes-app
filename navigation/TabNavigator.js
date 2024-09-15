import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import ContactScreen from "../screens/ContactScreen";
import { Theme } from "../theme/Theme";

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      activeColor={Theme.light.primaryDark }
      inactiveColor="#FFFFFF"
      barStyle={{ 
        backgroundColor: Theme.dark.primaryDark 
      }}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Dashboard"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <Icon name="view-dashboard" color={color} size={20} />
          )
        }} 
      />

      <Tab.Screen 
        name="Contact" 
        component={ContactScreen}
        options={{
          tabBarLabel: 'Contact',
          tabBarIcon: ({ color }) => (
            <Icon name="contacts" color={color} size={20} />
          )
        }} 
      />

      <Tab.Screen 
        name="About" 
        component={AboutScreen}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: ({ color }) => (
            <Icon name="information-outline" color={color} size={20} />
          )
        }} 
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
