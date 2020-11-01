import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Modal } from 'react-native';
import { connect } from 'react-redux';

import colors from '../config/colors';

const ListItemUpdate = props => {
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

    const handleUpdateItem = () => {
        props.onUpdateItem({
            itemId: props.itemId,
            itemName: itemName,
            itemPrice: parseInt(itemPrice),
            itemQuantity: parseInt(itemQuantity)
        });
        clearInputFields();
    };

    const cancelUpdateItem = () => {
        props.onCancel();
        clearInputFields();
    };

    const clearInputFields = () => {
        setItemName('');
        setItemPrice('');
        setItemQuantity('');
    };

    useEffect(() => {
        setItemName(props.itemName);
        setItemPrice(props.itemPrice);
        setItemQuantity(props.itemQuantity);
    }, [props.visible]);

    return (
        <Modal style={styles.modal} visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Text style={styles.title}>
                    Update List Item
                </Text>
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
                            title="Update"
                            color={colors.secondary}
                            onPress={handleUpdateItem}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            color="red"
                            title="cancel"
                            onPress={cancelUpdateItem}
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

const mapStateToProps = state => {
    return {
        itemId: state.listItem.itemId,
        itemName: state.listItem.itemName,
        itemPrice: state.listItem.itemPrice + '',
        itemQuantity: state.listItem.itemQuantity + ''
    };
};

export default connect(mapStateToProps)(ListItemUpdate);