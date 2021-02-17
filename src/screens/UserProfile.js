import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, Caption, Subheading, Title } from 'react-native-paper';

import Container from '../components/Container';
import Rating from '../components/Rating';

const UserProfile = props => {
    const fullName = 'Talha Iqbal';
    const username = 'talha';
    const contactNo = '03326929650';

    return (
        <View style={{ width: '100%', flex: 1 }} >
            <Appbar.Header>
                <Appbar.BackAction onPress={() => props.history.push('/Lists')} />
                <Appbar.Content title='User Profile' />
            </Appbar.Header>
            <Container>
                <View style={{ width: '70%' }}>
                    <View style={styles.dataItem}>
                        <Title>{fullName}</Title>
                    </View>
                    <View style={styles.dataItem}>
                        <Subheading style={styles.dataItem}>{username}</Subheading>
                    </View>
                    <View style={styles.dataItem}>
                        <Caption style={styles.dataItem}>{contactNo}</Caption>
                    </View>
                    <View style={styles.dataItem}>
                        <Rating rating={5} />
                    </View>
                    <Button style={styles.button} mode='contained' onPress={() => props.history.push('/ViewFeedback')}>
                        view feedback
                    </Button>
                </View>
            </Container>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        paddingVertical: 5,
        marginVertical: 10,
    },
    dataItem: {
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default UserProfile;