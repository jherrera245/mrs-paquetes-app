import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Theme } from '../theme/Theme';

const MainContent = ({ children }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    {children}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Theme.light.primary,
        $dark: {
            backgroundColor: Theme.dark.primaryDark,
        }
    },
    scrollView: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: Theme.light.primary,
        padding: 10,
        $dark: {
            backgroundColor: Theme.dark.primaryDark,
        }
    },
});

export default MainContent;