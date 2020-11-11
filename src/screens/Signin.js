import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Title, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';

import colors from '../config/colors';
import Loading from '../components/Loading';
import Container from '../components/Container';
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
            <Loading title='signing in' />
            :
            <Container>
                <View style={styles.contentContainer}>
                    <Title style={styles.title}>
                        Signin
                    </Title>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            mode='outlined'
                            label='Username/Email'
                            placeholder='abc@gmail.com'
                            value={emailOrUsername}
                            onChangeText={handleEmailOrUsernameInput}
                        />
                        <TextInput
                            secureTextEntry
                            style={styles.textInput}
                            mode='outlined'
                            label='Password'
                            placeholder='********'
                            value={password}
                            onChangeText={handlePasswordInput}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} mode="contained" onPress={handleSignin}>
                            signin
                        </Button>
                        <Button style={styles.button} mode="outlined" onPress={() => props.history.push('/')}>
                            signup instead
                        </Button>
                    </View>
                </View>
            </Container>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        marginVertical: 20,
        justifyContent: 'center',
        width: '100%',
    },
    button: {
        marginVertical: 10,
        width: '45%',
    },
    contentContainer: {
        alignItems: 'center',
        height: '70%',
        justifyContent: 'center',
        width: '100%',
    },
    textInputContainer: {
        alignItems: 'center',
        marginVertical: 20,
        paddingHorizontal: '5%',
        justifyContent: 'center',
        width: '100%',
    },
    textInput: {
        marginVertical: 5,
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

export default connect(mapStateToProps)(Signin);