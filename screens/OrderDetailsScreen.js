import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MainContent from "../components/MainContent";
import DetailsCard from "../components/DetailsCard";
import { Theme } from "../theme/Theme";

const OrderDetailsScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [detalles, setDetalles] = useState([]);
    const details = useSelector(state => state.orderDetails.orderDetails);

    useEffect(() => {
        if (details && Array.isArray(details)) {
            console.log('Detalles de Redux:', details); // Verifica los datos de Redux
            setDetalles(details);
        }
    }, [details]);

    console.log('Detalles en el estado local:', detalles); // Verifica los datos en el estado local

    return (
        <MainContent>
            <View style={styles.container}>
                {detalles.length > 0 ? (
                    detalles.map((detalle, index) => (
                        <DetailsCard
                            key={index}
                            title={`Descripción: ${detalle.descripcion}`}
                            description={`Total a pagar: $${detalle.precio}`}
                            typeCard="primary"
                            statusText={`${detalle.tamano_paquete}`} 
                        />
                    ))
                ) : (
                    <DetailsCard
                        title="Información"
                        description="No hay detalles de órdenes disponibles"
                        typeCard="warning"
                    />
                )}
            </View>
        </MainContent>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        textAlign: "center",
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
    welcomeMessage: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Theme.light.text,
        marginBottom: 20,
        textAlign: 'center',
        $dark: {
            color: Theme.dark.text
        }
    },
});

export default OrderDetailsScreen;
