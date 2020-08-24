import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { connect } from 'react-redux';

import { userSignin } from '../actions/user';
import colors from '../config/colors';

const Signin = props => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameOrEmailInput = (usernameOrEmail) => {
        setUsernameOrEmail(usernameOrEmail);
    };

    const handlePasswordInput = (password) => {
        setPassword(password);
    };

    const handleSignin = (usernameOrEmail, password) => {
        props.dispatch(userSignin({ emailOrUsername: usernameOrEmail, password }));
    };

    useEffect(() => {
        props.isAuthenticated && props.history.push('/Lists');
    });

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder='Username/Email'
                value={usernameOrEmail}
                onChangeText={handleUsernameOrEmailInput}
            />
            <TextInput
                style={styles.textInput}
                secureTextEntry
                placeholder='Password'
                value={password}
                onChangeText={handlePasswordInput}
            />
            <View style={styles.signinButton}>
                <Button
                    title='Signin'
                    color={colors.secondary}
                    onPress={() => handleSignin(usernameOrEmail, password)}
                />
            </View>
            <View style={styles.signinButton}>
                <Button
                    onPress={() => props.history.push('/')}
                    title='Signup instead?'
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
    signinButton: {
        marginTop: 25,
        width: 100
    },
});

const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated
    };
};

export default connect(mapStateToProps)(Signin);