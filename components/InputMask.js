import React from 'react';
import { TextInput as RNTextInput, StyleSheet, View, Platform } from 'react-native';
import { TextInputMask as MaskedTextInput } from 'react-native-masked-text';

const InputMask = ({
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    autoCapitalize = 'none',
    secureTextEntry = false,
    mask,
    ...props
}) => {
    return (
        <MaskedTextInput
            type={'custom'}
            options={{ mask }}
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            placeholderTextColor="#757575"
            underlineColorAndroid="transparent"
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 56,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        paddingHorizontal: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
        ...(Platform.OS === 'android' ? {} : {
            borderColor: '#E0E0E0',
            borderWidth: 1,
        }),
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

export default InputMask;
