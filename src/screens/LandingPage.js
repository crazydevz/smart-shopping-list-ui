import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Paragraph, Title } from 'react-native-paper';

import Container from '../components/Container';


const LandingPage = props => {
    return (
        <Container>
            <View style={styles.contentContainer}>
                <View style={styles.appBanner}>
                    <Image
                        style={styles.appLogo}
                        source={require('../../assets/winter-womans-shopping-cart-illustration-by-Vexels.png')}
                    />
                </View>
                <View style={styles.appMoto}>
                    <Title>Smart Shopping List</Title>
                    <Paragraph>
                        Shopping has never been easier!
                    </Paragraph>
                </View>
                <View style={styles.buttonContainer}>
                    <Button style={styles.button} mode="contained" onPress={() => props.history.push('/Signin')}>
                        signin
                    </Button>
                    <Button style={styles.button} mode="outlined" onPress={() => props.history.push('/Signup')}>
                        signup instead
                    </Button>
                </View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    appBanner: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
        margin: 20,
    },
    appMoto: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    appLogo: {
        width: '100%',
        height: 200,
    },
    buttonContainer: {
        width: '100%',
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    button: {
        width: '100%',
        paddingVertical: 5,
        marginVertical: 10,
    },
    contentContainer: {
        width: '90%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LandingPage;