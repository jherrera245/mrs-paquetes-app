import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

const DetailsCard = ({ title, description, iconName, typeCard, statusText, onPress }) => {
    const cardColors = {
        default: 'transparent',
        primary: '#04aad6',
        success: '#15b79f',
        danger: '#f04437',
        warning: '#fb9c0c',
        info: '#635bff',
    };

    const borderColor = cardColors[typeCard] || cardColors.default;

    return (
        <TouchableOpacity 
            style={styles.cardButton} 
            onPress={onPress}
            activeOpacity={0.9}
        >
            <Animatable.View animation="fadeIn" style={[styles.card, { borderLeftColor: borderColor }]}>
                <Icon name={iconName} size={24} color="#000" style={styles.icon} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {Array.isArray(description) ? (
                        description.map((item, index) => (
                            <Text key={index} style={styles.description}>
                                <Text style={styles.descriptionKey}>{item.key}: </Text>
                                {item.value}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.description}>{description}</Text>
                    )}
                </View>
                {statusText && (
                    <View style={[styles.statusTextContainer, { backgroundColor: borderColor }]}>
                        <Text style={styles.statusText}>{statusText}</Text>
                    </View>
                )}
            </Animatable.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardButton: {
        width: '100%',
    },
    card: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 8,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        borderLeftWidth: 6,
        borderLeftColor: 'transparent',
        position: 'relative',
    },
    statusTextContainer: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    icon: {
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
        marginBottom: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
    },
    descriptionKey: {
        fontWeight: 'bold',
    },
});

export default DetailsCard;
