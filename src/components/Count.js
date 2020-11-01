import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

import { incrementCount } from '../actions/count';

const Count = props => (
    <View style={styles.container}>
        <Text>Count: {props.count}</Text>
        <Button
            onPress={() => {
                props.dispatch(incrementCount());
            }}
            title='Click me to inc counter'
            color='#841584'
        />
    </View>
);

const mapStateToProps = state => {
    return {
        count: state.count
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default connect(mapStateToProps)(Count);