import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, TextInput, Title } from 'react-native-paper';
import { connect } from 'react-redux';

const ShareListModal = props => {
    const [username, setUsername] = useState('');

    const handleUsernameInput = username => {
        setUsername(username);
    };

    const handleShareList = () => {
        props.onShareList(props.listId, username);
        setUsername('');
    };

    const cancelShareList = () => {
        props.onCancel();
        setUsername('');
    };

    return (
        <Portal>
            <Modal visible={props.visible} onDismiss={props.onCancel} contentContainerStyle={styles.containerStyle}>
                <View style={styles.contentContainer}>
                    <Title style={styles.title}>
                        share list with a user
                    </Title>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            mode='outlined'
                            label='Username'
                            placeholder='Enter username'
                            value={username}
                            onChangeText={handleUsernameInput}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} mode="contained" onPress={handleShareList}>
                            share
                        </Button>
                        <Button style={styles.button} mode="outlined" onPress={cancelShareList}>
                            cancel
                        </Button>
                    </View>
                </View>
            </Modal>
        </Portal>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginVertical: 10,
        marginHorizontal: 10,
        width: '45%',
    },
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: '5%',
    },
    contentContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        textTransform: "uppercase",
    },
    textInput: {
        marginVertical: 5,
        width: '100%',
    },
    textInputContainer: {
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: '5%',
        justifyContent: 'center',
        width: '100%',
    },
});

const mapStateToProps = state => {
    return {
        listId: state.list.listId
    };
};

export default connect(mapStateToProps)(ShareListModal);