import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, useColorScheme } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CommonActions } from '@react-navigation/native';
import { fetchData } from '../api/client';
import { logout } from '../redux/slice/loginSlice';
import Loader from '../components/Loader';
import Errors from '../components/Errors';
import { Theme } from '../theme/Theme';

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login.user);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(null);

  const colorScheme = useColorScheme();
  const logoSource = colorScheme === 'dark' ? require('../assets/logo-oscuro.png') : require('../assets/logo-oscuro.png');

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetchData('auth/logout',  
          {'token' : user.token},
          {
              'Authorization': `Bearer ${user.token}`
          }
      );

      if (response.hasOwnProperty('success')) {
        
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        );
      } else if(response.hasOwnProperty('error')) {
        setErrors(response.error);
      }
    } catch (error) {
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseErrors = () => {
    setErrors(null);
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image source={logoSource} style={styles.logo} />
      </View>
      <DrawerItemList {...props} />
      {loading && <Loader />}
      {errors && <Errors errors={errors} onClose={handleCloseErrors} />}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="sign-out" size={20} color="#FFFFFF" />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#FF4C4C',
    borderRadius: 5,
  },
  logoutText: {
    marginLeft: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default CustomDrawerContent;
