import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, TextInput, Title } from 'react-native-paper';

const ListNameInput = props => {
    const [listName, setListName] = useState('');

    const handleListNameInput = listName => {
        setListName(listName);
    };

    const handleCreateList = () => {
        props.onCreateList(listName);
        setListName('');
    };

    const cancelCreateList = () => {
        props.onCancel();
        setListName('');
    };

    return (
        <Portal>
            <Modal visible={props.visible} onDismiss={props.onCancel} contentContainerStyle={styles.containerStyle}>
                <View style={styles.contentContainer}>
                    <Title style={styles.title}>
                        create new list
                    </Title>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            mode='outlined'
                            label='List Name'
                            placeholder='Enter list name'
                            value={listName}
                            onChangeText={handleListNameInput}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} mode="contained" onPress={handleCreateList}>
                            save
                        </Button>
                        <Button style={styles.button} mode="outlined" onPress={cancelCreateList}>
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

export default ListNameInput;