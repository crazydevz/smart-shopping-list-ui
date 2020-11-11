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
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
});

export default Container;