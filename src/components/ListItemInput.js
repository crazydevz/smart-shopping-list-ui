import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, TextInput, Title } from 'react-native-paper';

const ListItemInput = props => {
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

    const cancelCreateItem = () => {
        props.onCancel();
        clearInputFields();
    };

    const clearInputFields = () => {
        setItemName('');
        setItemPrice('');
        setItemQuantity('');
    };

    return (
        <Portal>
            <Modal visible={props.visible} onDismiss={props.onCancel} contentContainerStyle={styles.containerStyle}>
                <View style={styles.contentContainer}>
                    <Title style={styles.title}>
                        add list item
                    </Title>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            mode='outlined'
                            label='Item Name'
                            placeholder='Enter item name'
                            value={itemName}
                            onChangeText={handleItemNameInput}
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            mode='outlined'
                            label='Price Per Item'
                            placeholder='Enter item price'
                            value={itemPrice}
                            onChangeText={handleItemPriceInput}
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            mode='outlined'
                            label='Item Quanity'
                            placeholder='Enter item quantity'
                            value={itemQuantity}
                            onChangeText={handleItemQuantityInput}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} mode="contained" onPress={handleCreateItem}>
                            save
                        </Button>
                        <Button style={styles.button} mode="outlined" onPress={cancelCreateItem}>
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

export default ListItemInput;