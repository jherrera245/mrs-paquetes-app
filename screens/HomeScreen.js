import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../api/client";
import MainContent from "../components/MainContent";
import DetailsCard from "../components/DetailsCard";
import { Theme } from "../theme/Theme";
import { checkProfile } from "../redux/slice/profileSlice";
import Button from "../components/Button";
import Toast from "react-native-toast-message";
import { orderDetailsSuccess } from "../redux/slice/orderDetailsSlice";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const user = useSelector(state => state.login.user);
  const hasProfile = useSelector(state => state.profile.hasProfile);
  const token = user.token;

  useEffect(() => {
    const getProfileStatus = async () => {
      try {
        const response = await fetchData("verificar-perfil", {}, { Authorization: `Bearer ${token}` });

        dispatch(checkProfile({
          status: response
        }))

        console.log(hasProfile)

      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `Formato al verficar el perfil.!!`
        });
      }
    };
    getProfileStatus();
  }, [token]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetchData("ordenes-cliente/ver-ordenes", {}, { Authorization: `Bearer ${token}` });
        setOrders(response);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `Error al cargar las órdenes.`
        });
      }
    };
    getOrders();
  }, [token]);

  const handleProfile = () => {
    navigation.navigate("CreateProfileScreen");
  };

  const handleOrder = (order) => {
    dispatch(orderDetailsSuccess(order));
    navigation.navigate("OrderDetailsScreen");
  };

  return (
    <MainContent>
      <View style={styles.container}>

        {hasProfile ? (

          <>
            <DetailsCard
              title="Bienvenido"
              description="Hola, aqui puedes ver y gestionar tus ordenes."
              typeCard="success"
            />

            {orders.length > 0 ? (
              orders.map((order, index) => (
                <DetailsCard
                  key={index}
                  title={`Orden ${order.numero_seguimiento}`}
                  description={`Concepto: ${order.concepto}\nTotal a pagar: $${order.total_pagar}`}
                  typeCard="primary"
                  statusText={`Paquetes: ${order.detalles.length}`}
                  onPress={() =>  handleOrder(order.detalles)}
                />
              ))
            ) : (
              <DetailsCard
                  title="Información"
                  description="No hay órdenes disponibles"
                  typeCard="warning"
              />
            )}
          </>

        ) : (
          <>
            <View style={styles.continerNotProfile}>
              <Text style={styles.title}>Para seguir usando a Mr. Paquetes! crea tu perfil </Text>
              <Button
                title="Crear Perfil"
                onPress={handleProfile}
                typeButton="primary"
              />
            </View>
          </>
        )}

      </View>
    </MainContent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  continerNotProfile: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    marginTop: 50,
    marginBottom: 40,
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
});

export default HomeScreen;
