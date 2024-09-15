import React, { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const TextArea = ({ value, onChangeText, placeholder }) => {
    return (
        <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#6c757d"
            textAlignVertical="top"
        />
    );
};

const styles = StyleSheet.create({
    textArea: {
        height: 100,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        borderColor: '#ced4da',
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        color: '#212529',
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
        $dark: {
            backgroundColor: '#1E1E1E',
            color: '#EAEAEA',
            borderColor: '#333333',
            borderWidth: 1,
            elevation: 2,
            shadowColor: '#000000',
            shadowOpacity: 0.5,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 4 },
        }
    },
});

export default TextArea;
