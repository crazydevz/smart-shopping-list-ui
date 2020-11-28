import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, TextInput, Title } from 'react-native-paper';
import { connect } from 'react-redux';

const ListItemUpdate = props => {
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [availableItemQuantity, setAvailableItemQuantity] = useState('');

    const handleItemNameInput = itemName => {
        setItemName(itemName);
    };

    const handleItemPriceInput = itemPrice => {
        setItemPrice(itemPrice);
    };

    const handleItemQuantityInput = itemQuantity => {
        setItemQuantity(itemQuantity);
    };

    const handleAvailableItemQuantityInput = itemQuantity => {
        setAvailableItemQuantity(itemQuantity);
    };

    const handleUpdateItem = () => {
        props.onUpdateItem({
            itemId: props.itemId,
            itemName: itemName,
            itemPrice: parseInt(itemPrice),
            itemQuantity: parseInt(itemQuantity),
            availableItemQuantity: parseInt(availableItemQuantity)
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
        if(props.visible) {
            setItemName(props.itemName);
            setItemPrice(props.itemPrice);
            setItemQuantity(props.itemQuantity);
            setAvailableItemQuantity(props.availableItemQuantity);
        }
    }, [props.visible]);

    return (
        <Portal>
            <Modal visible={props.visible} onDismiss={props.onCancel} contentContainerStyle={styles.containerStyle}>
                <View style={styles.contentContainer}>
                    <Title style={styles.title}>
                        update list item
                    </Title>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            disabled={props.itemType === 'receivedItem'}
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
                            label='Available Item Quantity'
                            placeholder='Enter item quantity'
                            value={availableItemQuantity}
                            onChangeText={handleAvailableItemQuantityInput}
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            disabled={props.itemType === 'receivedItem'}
                            style={styles.textInput}
                            mode='outlined'
                            label='Item Quantity'
                            placeholder='Enter item quantity'
                            value={itemQuantity}
                            onChangeText={handleItemQuantityInput}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} mode="contained" onPress={handleUpdateItem}>
                            update
                        </Button>
                        <Button style={styles.button} mode="outlined" onPress={cancelUpdateItem}>
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
        itemId: state.listItem.itemId,
        itemName: state.listItem.itemName,
        itemPrice: state.listItem.itemPrice + '',
        itemQuantity: state.listItem.itemQuantity + '',
        availableItemQuantity: state.listItem.availableItemQuantity + ''
    };
};

export default connect(mapStateToProps)(ListItemUpdate);