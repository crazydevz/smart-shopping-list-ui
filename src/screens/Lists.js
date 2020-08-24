import React, {useEffect} from 'react';
import { StyleSheet, View, Text, Button, ImagePropTypes } from 'react-native';
import { connect } from 'react-redux';

import { userSignout } from '../actions/user';

const Lists = (props) => {
    const handleSignout = () => {
        props.dispatch(userSignout(props.authToken));
    };

    useEffect(() => {
        !props.isAuthenticated && props.history.push('/');
    });

    return (
        <View style={styles.container}>
            <Text style={{ color: 'white' }}>Welcome to Smart Shopping List App</Text>
            <View style={styles.signoutButton}>
                <Button
                    title='Signout'
                    color='#4630eb'
                    onPress={handleSignout}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b293f',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signoutButton: {
        marginTop: 25,
        width: 100
    },
});

const mapStateToProps = state => {
    return {
        authToken: state.user.authToken,
        isAuthenticated: state.user.isAuthenticated
    };
};

export default connect(mapStateToProps)(Lists);