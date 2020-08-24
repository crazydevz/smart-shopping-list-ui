import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { userSignup } from '../actions/user';
import colors from '../config/colors';

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

    const handleSignup = (email, username, password) => {
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
                <View style={styles.signupButton}>
                    <Button
                        onPress={() => handleSignup(email, username, password)}
                        title='Signup'
                        color={colors.secondary}
                    />
                </View>
                <View style={styles.signupButton}>
                    <Button
                        onPress={() => props.history.push('/Signin')}
                        title='Signin instead?'
                        color={colors.secondary}
                    />
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
    signupButton: {
        marginTop: 25,
        width: 100
    },
});

const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated,
        isAuthenticating: state.user.isAuthenticating
    };
};

export default connect(mapStateToProps)(SignupPage);