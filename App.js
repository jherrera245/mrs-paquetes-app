import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainStackNavigator } from './navigation/StackNavigator';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { loginSuccess, logout } from './redux/slice/loginSlice';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AppContent = ( {navigation} ) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserSession = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@user_session');

        if (jsonValue != null) {
          const user = JSON.parse(jsonValue);

          if (user?.user?.token) {
            const isValid = await validateToken(user.user.token);

            if (isValid) {
              dispatch(loginSuccess(user));
              navigation.navigate('HomeScreen');
            } else {
              dispatch(logout());
            }
          } else {
            dispatch(logout());
          }
        }
      } catch (e) {
        console.error("Error loading user session: ", e);
      }
    };

    const validateToken = async (token) => {
      try {
        const response = await fetchData('validate-token', {}, {
          'Authorization': `Bearer ${token}`,
        });

        return response.isValid; 
      } catch (error) {
        console.error("Error validating token: ", error);
        return false;
      }
    };

    loadUserSession();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <MainStackNavigator />
      <Toast />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <AppContent />
    </Provider>
  );
}