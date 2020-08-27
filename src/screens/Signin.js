import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import colors from '../config/colors';
import { userSignin } from '../actions/user';

const Signin = props => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailOrUsernameInput = emailOrUsername => {
        setEmailOrUsername(emailOrUsername);
    };

    const handlePasswordInput = password => {
        setPassword(password);
    };

    const handleSignin = () => {
        props.dispatch(userSignin({ emailOrUsername, password }));
    };

    useEffect(() => {
        props.isAuthenticated && props.history.push('/Lists');
    });

    return (
        props.isAuthenticating ?
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
            :
            <View style={styles.container}>
                <Text style={styles.title}>
                    Signin
                </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Username/Email'
                    value={emailOrUsername}
                    onChangeText={handleEmailOrUsernameInput}
                />
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    placeholder='Password'
                    value={password}
                    onChangeText={handlePasswordInput}
                />
                <View style={styles.button}>
                    <TouchableOpacity onPress={handleSignin}>
                        <Text style={{ color: colors.secondary }}>Signin</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => props.history.push('/')}>
                        <Text style={{ color: colors.secondary }}>Signup Instead?</Text>
                    </TouchableOpacity>
                </View>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        height: 40,
        width: '75%',
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
    },
    title: {
        color: colors.secondary,
        fontSize: 50,
        marginBottom: 50,
    },
    button: {
        padding: 10,
        backgroundColor: colors.primary,
        borderColor: colors.secondary,
        borderWidth: 2,
        marginTop: 25,
        width: 125,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated,
        isAuthenticating: state.user.isAuthenticating
    };
};

export default connect(mapStateToProps)(Signin);