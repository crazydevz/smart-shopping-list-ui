import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../config/colors';

const Header = props => (
    <View style={styles.header}>
        {props.children}
    </View>
);

const styles = StyleSheet.create({
    header: {
        borderColor: 'green',
        borderWidth: 1,
        backgroundColor: colors.secondary,
        flexDirection: 'row',
        height: '10%',
        justifyContent: 'flex-start',
        padding: 10,
        width: '100%',
    },
});

export default Header;