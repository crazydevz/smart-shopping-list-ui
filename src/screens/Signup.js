import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import colors from '../config/colors';
import { userSignup } from '../actions/user';

const SignupPage = props => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailInput = email => {
        setEmail(email);
    };

    const handleUsernameInput = username => {
        setUsername(username);
    };

    const handlePasswordInput = password => {
        setPassword(password);
    };

    const handleSignup = () => {
        props.dispatch(userSignup({ email, username, password }));
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
                    Signup
                </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Email'
                    value={email}
                    onChangeText={handleEmailInput}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Username'
                    value={username}
                    onChangeText={handleUsernameInput}
                />
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    placeholder='Password'
                    value={password}
                    onChangeText={handlePasswordInput}
                />
                <View style={styles.button}>
                    <TouchableOpacity onPress={handleSignup}>
                        <Text style={{color: colors.secondary}}>Signup</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => props.history.push('/Signin')}>
                        <Text style={{color: colors.secondary}}>Signin Instead?</Text>
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
        width: 120,
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

export default connect(mapStateToProps)(SignupPage);