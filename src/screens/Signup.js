import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInputComponent, View } from 'react-native';
import { Button, Title, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';

import Loading from '../components/Loading';
import Container from '../components/Container';
import { userSignup } from '../actions/user';

const Signup = props => {
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
            <Loading title='signing up' />
            :
            <Container>
                <View style={styles.contentContainer}>
                    <Title style={styles.title}>
                        signup
                    </Title>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            left={<TextInput.Icon name='email' />}
                            style={styles.textInput}
                            mode='outlined'
                            label='Email'
                            placeholder='abc@gmail.com'
                            value={email}
                            onChangeText={handleEmailInput}
                        />
                        <TextInput
                            left={<TextInput.Icon name='account' />}
                            style={styles.textInput}
                            mode='outlined'
                            label='Username'
                            placeholder='someusername'
                            value={username}
                            onChangeText={handleUsernameInput}
                        />
                        <TextInput
                            left={<TextInput.Icon name='lock' />}
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
                        <Button style={styles.button} mode="contained" onPress={handleSignup}>
                            signup
                        </Button>
                        <Button style={styles.button} mode="outlined" onPress={() => props.history.push('/Signin')}>
                            signin instead
                        </Button>
                    </View>
                </View>
            </Container>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        width: '45%',
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '100%',
        paddingVertical: 5,
        marginVertical: 10,
    },
    contentContainer: {
        width: '100%',
        height: '70%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        textTransform: "uppercase",
        marginVertical: 20,
    },
    textInputContainer: {
        width: '100%',
        marginVertical: 20,
        paddingHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        width: '100%',
        marginVertical: 5,
    },
});

const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated,
        isAuthenticating: state.user.isAuthenticating
    };
};

export default connect(mapStateToProps)(Signup);