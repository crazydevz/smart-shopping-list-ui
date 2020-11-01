import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button, Modal } from 'react-native';

import colors from '../config/colors';

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
        <Modal style={styles.modal} visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Text style={styles.title}>
                    Create New List
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="List Name"
                    value={listName}
                    onChangeText={handleListNameInput}
                />
                <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                        <Button
                            color={colors.secondary}
                            title="Create List"
                            onPress={handleCreateList}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            color='red'
                            title="cancel"
                            onPress={cancelCreateList}
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
    title: {
        color: colors.secondary,
        fontSize: 20,
        marginVertical: 20,
        textTransform: "uppercase",
    },
});

export default ListNameInput;