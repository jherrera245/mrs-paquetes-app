import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { useSelector } from "react-redux";
import MisPaquetesScreen from "../screens/MisPaquetesScreen";

import ProfileScreen from "../screens/auth/ProfileScreen";
import TabNavigator from "./TabNavigator";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomDrawerContent from "./CustomDrawerContent";
import { Theme } from "../theme/Theme";
import AddressScreen from "../screens/address/AddressScreen";

const Drawer = createDrawerNavigator();

const drawerIcons = {
  MrsPaquetes: "home",
  Profile: "user-circle",
  MisPaquetes: "archive",
  Address: 'address-book',
  Seguimiento: "search",
};

const DrawerNavigator = () => {
  const user = useSelector((state) => state.login.user);
  const hasProfile = useSelector(state => state.profile.hasProfile);
  const role = user.role || "default";

  const getDrawerScreens = () => {

    if (hasProfile) {
      return (
        <>
          <Drawer.Screen
            name="Mrs Paquetes"
            component={TabNavigator}
            options={{
              drawerIcon: ({ color, size }) => (
                <Icon name={drawerIcons.MrsPaquetes} color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="Mis Paquetes"
            component={MisPaquetesScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Icon name={drawerIcons.MisPaquetes} color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="Perfil"
            component={ProfileScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Icon name={drawerIcons.Profile} color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="Mis Direcciones"
            component={AddressScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Icon name={drawerIcons.Address} color={color} size={size} />
              ),
            }}
          />
        </>
      );
    }

    return (
      <Drawer.Screen
        name="Mrs Paquetes"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name={drawerIcons.MrsPaquetes} color={color} size={size} />
          ),
        }}
      />
    );
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.dark.primaryDark,
        },
        headerTintColor: "#FFFFFF",
        drawerStyle: {
          backgroundColor: Theme.dark.primary,
        },
        drawerContentStyle: {
          backgroundColor: Theme.dark.primaryDark,
        },
        drawerActiveTintColor: Theme.light.primaryDark ,
        drawerInactiveTintColor: "#FFFFFF",
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      {getDrawerScreens()}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
