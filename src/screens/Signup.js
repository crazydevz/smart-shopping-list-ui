import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Title, TextInput, useTheme } from 'react-native-paper';
import { connect } from 'react-redux';

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

    const { colors } = useTheme();

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
                            style={styles.textInput}
                            mode='outlined'
                            label='Email'
                            placeholder='abc@gmail.com'
                            value={email}
                            onChangeText={handleEmailInput}
                        />
                        <TextInput
                            style={styles.textInput}
                            mode='outlined'
                            label='Username'
                            placeholder='Type a username'
                            value={username}
                            onChangeText={handleUsernameInput}
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