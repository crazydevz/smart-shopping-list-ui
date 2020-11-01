import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import colors from '../config/colors';
import Loading from '../components/Loading';
import Container from '../components/Container';
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
        // props.history.push('./Loading');
    };

    useEffect(() => {
        props.isAuthenticated && props.history.push('/Lists');
    });

    return (
        props.isAuthenticating ?
            <Loading screenPath={'/Lists'} />
            :
            <Container>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>
                        Signup
                    </Text>
                    <View style={styles.textInputContainer}>
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
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSignup}>
                            <Text style={[styles.buttonText, styles.signupButtonText]}>Signup</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => props.history.push('/Signin')}>
                            <Text style={[styles.buttonText, styles.signinButtonText]}>Signin Instead?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        marginVertical: 20,
        width: '100%',
    },
    button: {
        marginVertical: 10,
        width: '45%',
    },
    buttonText: {
        fontSize: 18,
        padding: 10,
        textAlign: 'center',
    },
    contentContainer: {
        alignItems: 'center',
        height: '70%',
        justifyContent: 'center',
        width: '100%',
    },
    signupButtonText: {
        backgroundColor: colors.secondary,
        color: colors.primary,
    },
    signinButtonText: {
        backgroundColor: colors.primary,
        borderColor: colors.secondary,
        borderWidth: 1,
        color: colors.secondary,
    },
    textInputContainer: {
        alignItems: 'center',
        marginVertical: 20,
        paddingHorizontal: '5%',
        width: '100%',
    },
    textInput: {
        borderColor: 'gray',
        borderWidth: 1,
        fontSize: 14,
        marginVertical: 5,
        padding: 10,
        width: '100%',
    },
    title: {
        color: colors.secondary,
        fontSize: 30,
        marginVertical: 20,
        textTransform: "uppercase",
    },
});
    
const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated,
        isAuthenticating: state.user.isAuthenticating
    };
};

export default connect(mapStateToProps)(SignupPage);