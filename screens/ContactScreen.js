import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import MainContent from "../components/MainContent";
import DetailsCard from "../components/DetailsCard";

const ContactScreen = ({ navigation }) => {

    const primerContacto = [
        { key: 'Cargo', value: 'Gerente de ventas' },
        { key: 'Teléfono', value: '+1234567890' },
        { key: 'Correo', value: 'john.doe@example.com' }
    ];

    const segundoContacto = [
        { key: 'Cargo', value: 'Gerente de Marketing' },
        { key: 'Teléfono', value: '+0987654321' },
        { key: 'Correo', value: 'jane.smith@example.com' }
    ];

    return (
        <MainContent>
            <DetailsCard
                title="Contactos de la Empresa"
                description="Puedes contactarno a traves de nuestro equipo de expertos."
                typeCard="success"
            />

            <DetailsCard
                title="John Doe"
                description={primerContacto}
                typeCard="primary"
            />

            <DetailsCard
                title="Jane Smith"
                description={segundoContacto}
                typeCard="warning"
            />
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
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: '#15b79f'
    },
    contact: {
        backgroundColor: "#F0F0F0",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        width: "100%",
        borderWidth: 1,
        borderColor: "#ddd",
    },
    contactName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    contactInfo: {
        fontSize: 16,
        marginBottom: 3,
    },
});

export default ContactScreen;
