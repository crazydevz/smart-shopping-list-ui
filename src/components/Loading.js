import React from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, Title } from 'react-native-paper';

import Container from '../components/Container';

const Loading = (props) => {
    return (
        <Container>
            <ActivityIndicator
                animating={true}
                size='large'
            />
            <Title style={styles.loadingText}>{props.title}</Title>
        </Container>
    );
};

const styles = StyleSheet.create({
    loadingText: {
        marginTop: 20,
        textTransform: 'capitalize'
    },
});

export default Loading;