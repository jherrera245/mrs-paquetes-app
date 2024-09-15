import React, { useEffect, useState } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { postData } from '../../api/client';
import MainContent from '../../components/MainContent';
import { Theme } from '../../theme/Theme';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Image } from 'react-native-animatable';
import Loader from '../../components/Loader';
import Errors from '../../components/Errors';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { recoverReset } from '../../redux/slice/recoverSlice';

const UpdatePasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(state => state.recover.user);

  useEffect(() => {
    setEmail(user?.email);
  }, [user]);

  const colorScheme = useColorScheme();
  const logoSource = colorScheme === 'dark' ? require('../../assets/logo-oscuro.png') : require('../../assets/logo-claro.png');

  const isPasswordSecure = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const handleUpdatePassword = async () => {
    if (!isPasswordSecure(password)) {
      setErrors("La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula, un número y un carácter especial.");
      return;
    }

    if (password !== confirmPassword) {
      setErrors("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      await postData('password/reset', {
        email,
        otp,
        password,
      });

      Toast.show({
        type: 'success',
        text1: 'Éxito',
        text2: `Contraseña restablecida con éxito. 😎`
      });

      dispatch(recoverReset());
      navigation.navigate('Login'); // Navegar a la pantalla de inicio de sesión
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `No se pudo restablecer la contraseña. Intenta nuevamente. 😥`
      });
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseErrors = () => {
    setErrors(null);
  };

  return (
    <MainContent>
      {loading && <Loader />}
      <View style={styles.container}>

        <Image
          source={logoSource}
          style={styles.logo}
        />

        <Input
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          placeholder="Código"
          onChangeText={(text) => setOtp(text)}
          value={otp}
          keyboardType="numeric"
          autoCapitalize="none"
        />

        <Input
          placeholder="Nueva contraseña"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />

        <Input
          placeholder="Confirmar Contraseña"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry
        />

        <Button
          title="Restablecer Contraseña"
          onPress={handleUpdatePassword}
          typeButton="primary"
        />

        {errors && <Errors errors={errors} onClose={handleCloseErrors} />}
      </View>
    </MainContent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: Theme.light.surface,
    borderRadius: 15,
    $dark: {
      backgroundColor: Theme.dark.primary
    }
  },
  title: {
    color: Theme.light.text,
    marginBottom: 20,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    $dark: {
      color: Theme.dark.text
    }
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
});

export default UpdatePasswordScreen;
