import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import colors from '../config/colors';

const Container = props => (
    <View style={styles.container}>
        {props.children}
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderColor: 'gray',
        borderWidth: 1,
        borderBottomWidth: 1,
        flex: 1,
        justifyContent: 'center',
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        width: '100%',
    },
});

export default Container;