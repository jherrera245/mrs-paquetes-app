import { useState } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { postData } from '../../api/client';
import { Theme } from '../../theme/Theme';
import MainContent from '../../components/MainContent';
import { Image } from 'react-native-animatable';
import Input from '../../components/Input';
import Button from "../../components/Button";
import Toast from 'react-native-toast-message';
import Loader from '../../components/Loader';
import Errors from '../../components/Errors';
import { useDispatch } from 'react-redux';
import { recoverSuccess } from '../../redux/slice/recoverSlice';

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const colorScheme = useColorScheme();
  const logoSource = colorScheme === 'dark' ? require('../../assets/logo-oscuro.png') : require('../../assets/logo-claro.png');

  const handlePasswordReset = async () => {
    setLoading(true);
    try {
      await postData('password/forget-password', { email });
      Toast.show({
        type: 'success',
        text1: 'Éxito',
        text2: `Se ha enviado un codigo a tu correo electrónico para restablecer tu contraseña 😎`
      });

      dispatch(
        recoverSuccess({
          email: email,
        })
      );

      navigation.navigate('UpdatePasswordScreen');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `No se pudo enviar el enlace para restablecer la contraseña. 😥`
      });
      console.error(error);
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

        <Button
          title="Restablecer Contraseña"
          onPress={handlePasswordReset}
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

export default ResetPasswordScreen;
