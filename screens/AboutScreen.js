import React from "react";
import { Text, StyleSheet, ScrollView, Image, useColorScheme } from "react-native";
import MainContent from "../components/MainContent";
import { Theme } from "../theme/Theme";
import { View } from "react-native-animatable";

const AboutScreen = () => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  return (
    <MainContent>
      <View style={styles.container}>
        <Image source={require('../assets/paquetes.png')} style={styles.logo} />
        <Text style={styles.welcomeText}>¡Bienvenido a Mrs. Paquetes!</Text>
        <Text style={styles.description}>
          Somos líderes en el seguimiento de paquetería, ofreciendo soluciones innovadoras para que siempre sepas dónde están tus envíos.
        </Text>
        <Text style={styles.description}>
          Nuestra misión es brindarte la mejor experiencia en el seguimiento de tus paquetes, asegurándonos de que lleguen a tiempo y en perfecto estado.
        </Text>
        
        <Text style={styles.description}>
          Gracias por confiar en nosotros. Estamos aquí para ayudarte y asegurarnos de que tu experiencia sea excepcional.
        </Text>
      </View>
    </MainContent>
  );
};

const getStyles = (colorScheme) => {
  const lightStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      margin: 10,
      marginTop: 10,
      backgroundColor: '#FFFFFF',
      borderRadius: 15,
    },
    logo: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      color: '#555',
      textAlign: 'left',
      marginBottom: 15,
      margin: 10,
    },
  });

  const darkStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      margin: 10,
      marginTop: 10,
      backgroundColor: '#333',
      borderRadius: 15,
    },
    logo: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      color: '#ddd',
      textAlign: 'left',
      marginBottom: 15,
      margin: 10,
    },
  });

  return colorScheme === 'dark' ? darkStyles : lightStyles;
};


export default AboutScreen;