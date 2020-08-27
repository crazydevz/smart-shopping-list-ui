import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Modal } from 'react-native';

const ListNameInput = props => {
    const [listName, setListName] = useState('');

    const handleListNameInput = listName => {
        setListName(listName);
    };

    const handleCreateList = () => {
        props.onCreateList(listName);
        setListName('');
    };

    const handleCancel = () => {
        props.onCancel();
        setListName('');
    };

    return (
        <Modal style={styles.modal} visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="List Name"
                    value={listName}
                    onChangeText={handleListNameInput}
                />
                <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                        <Button
                            title="Create List"
                            onPress={handleCreateList}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            color="red"
                            title="cancel"
                            onPress={handleCancel}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    },
    buttonsContainer: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        width: '40%'
    },
    modal: {
        height: '50%',
        backgroundColor: 'grey'
    },
});

export default ListNameInput;