// screens/auth/LoginScreen.js
import React, { useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useDispatch } from "react-redux";
import { postData } from "../../api/client";
import Input from "../../components/Input";
import Button from "../../components/Button";
import MainContent from "../../components/MainContent";
import { loginFailure, loginSuccess } from "../../redux/slice/loginSlice";
import Errors from "../../components/Errors";
import Loader from "../../components/Loader";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Theme } from "../../theme/Theme";
import { useColorScheme } from "react-native";
import Toast from "react-native-toast-message";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const logoSource = colorScheme === 'dark' ? require('../../assets/logo-oscuro.png') : require('../../assets/logo-claro.png');

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await postData("login-cliente", {
        email: email,
        password: password,
      });

      if (response.token) {
        dispatch(loginSuccess({
          user: response.user,
          role: response.role,
          token: response.token,
        }));

        Toast.show({
          type: 'success',
          text1: 'Hola',
          text2: `Bienvenido, te hemos hechado de menos 👋`
        });

        navigation.navigate("Dashboard");
      } else if (response.error) {
        setErrors(response.error);
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseErrors = () => {
    setErrors(null);
  };

  const handleRecoverPassword = () => {
    navigation.navigate("RecoverPasswordScreen");
  };
  const handleUpdatePassword = () => {
    navigation.navigate("UpdatePasswordScreen");
  };

  const handleRegister = () => {
    navigation.navigate("RegisterScreen");
  };

  return (
    <MainContent>
      {loading && <Loader />}

      <View style={styles.container}>
        <Image
          source={logoSource}
          style={styles.logo}
        />
        <Text style={styles.title}>¡Bienvenido a Mrs. Paquetes! </Text>
        
        <Input
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          placeholder="Contraseña"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        <Text onPress={handleRecoverPassword} style={styles.contra}>
          <Icon name="lock" size={16} color="#8590a5" /> {"¿Olvidaste tu contraseña?"}
        </Text>
        <Text onPress={handleUpdatePassword} style={styles.contra}>
          <Icon name="lock" size={16} color="#8590a5" /> {"Tengo un codigo"}
        </Text>
        <Button
          title="Iniciar sesión"
          onPress={handleLogin}
          typeButton="primary"
        />
        <Text style={styles.cuenta}>¿No tienes cuenta? </Text>
        <Text onPress={handleRegister} style={styles.cuenta}>
          Registrate{" "}
        </Text>
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
  contra: {
    color: Theme.light.text,
    marginBottom: 15,
    textAlign: "center",
    $dark: {
      color: Theme.dark.text
    }
  },
  cuenta: {
    color: Theme.light.text,
    marginBottom: 15,
    textAlign: "center",
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

export default LoginScreen;
