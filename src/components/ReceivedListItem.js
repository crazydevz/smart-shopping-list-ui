import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { connect } from 'react-redux';

import { updateItemStart } from '../actions/listItem';

const ListItem = props => {
    const updateItem = () => {
        const itemData = {
            itemId: props.itemKey,
            itemName: props.itemVal.itemName,
            itemPrice: props.itemVal.itemPrice,
            itemQuantity: props.itemVal.itemQuantity,
            availableItemQuantity: props.itemVal.availableItemQuantity
        };
        props.dispatch(updateItemStart(itemData));
        props.setUpdateMode(true);
    };
    return (
        <Surface style={styles.itemContainer}>
            <TouchableOpacity
                style={styles.itemInfo}
                onPress={updateItem}
            >
                <View style={styles.itemName}>
                    <Text style={styles.itemNameText}>{props.itemVal.itemName}</Text>
                </View>
                <View style={styles.itemData}>
                    <Text>Rs {props.itemVal.itemPrice}</Text>
                </View>
                <View style={styles.itemData}>
                    <Text>{props.itemVal.availableItemQuantity}/{props.itemVal.itemQuantity}</Text>
                </View>
            </TouchableOpacity>
        </Surface>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        padding: 8,
        marginVertical: 5,
        height: 70,
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        elevation: 4,
    },
    itemInfo: {
        height: '100%',
        flex: 3,
        flexDirection: 'row',
    },
    itemData: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    itemName: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 2,
    },
});

export default connect()(ListItem);