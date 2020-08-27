import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Modal } from 'react-native';

const ListNameInput = props => {
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');

    const handleItemNameInput = itemName => {
        setItemName(itemName);
    };

    const handleItemPriceInput = itemPrice => {
        setItemPrice(itemPrice);
    };

    const handleItemQuantityInput = itemQuantity => {
        setItemQuantity(itemQuantity);
    };

    const handleCreateItem = () => {
        props.onCreateItem({
            itemName,
            itemPrice,
            itemQuantity
        });
        clearInputFields();
    };

    const handleCancel = () => {
        props.onCancel();
        clearInputFields();
    };

    const clearInputFields = () => {
        setItemName('');
        setItemPrice('');
        setItemQuantity('');
    };

    return (
        <Modal style={styles.modal} visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Item Name"
                    value={itemName}
                    onChangeText={handleItemNameInput}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Price Per Item"
                    value={itemPrice}
                    onChangeText={handleItemPriceInput}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Item Quantity"
                    value={itemQuantity}
                    onChangeText={handleItemQuantityInput}
                />
                <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                        <Button
                            title="Add Item"
                            onPress={handleCreateItem}
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