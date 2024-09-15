import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const renderErrors = (errors, index) => {
    if (Array.isArray(errors)) {
        return (
            <View key={index} style={styles.errorContainer}>
                {errors.map((error, subIndex) => (
                    <View key={subIndex}>
                        {renderErrors(error, subIndex)}
                    </View>
                ))}
            </View>
        );
    } else if (typeof errors === 'object' && errors !== null) {
        return (
            <View key={index} style={styles.errorContainer}>
                {Object.entries(errors).map(([key, value]) => (
                    <View key={key}>
                        {renderErrors(value, key)}
                    </View>
                ))}
            </View>
        );
    } else if (typeof errors === 'string') {
        return <Text key={index} style={styles.errorText}>{errors}</Text>;
    }
    return null;
};

const Errors = ({ errors, onClose }) => {
    return (
        <View style={styles.errorCard}>
            <Text style={styles.errorTitle}>Errores:</Text>
            {renderErrors(errors, 0)}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    errorCard: {
        backgroundColor: '#FFCACA',
        borderRadius: 8,
        padding: 15,
        marginTop: 20,
        alignSelf: 'stretch',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    errorTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    errorText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    closeButton: {
        backgroundColor: '#dc3545',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    errorContainer: {
        marginBottom: 10,
    },
});

export default Errors;
