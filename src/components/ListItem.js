import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import colors from '../config/colors';
import { updateItemStart } from '../actions/listItem';

const ListItem = props => {
    const updateItem = () => {
        const itemData = {
            itemName: props.itemVal.itemName,
            itemPrice: props.itemVal.itemPrice,
            itemQuantity: props.itemVal.itemQuantity,
            itemId: props.itemKey
        };
        props.dispatch(updateItemStart(itemData));
        props.setUpdateMode(true);
    };
    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                style={styles.itemDataContainer}
                onPress={updateItem}
            >
                <View style={styles.itemName}>
                    <Text style={[styles.itemDataText, styles.itemNameText]}>{props.itemVal.itemName}</Text>
                </View>
                <View style={styles.itemData}>
                    <Text style={styles.itemDataText}>${props.itemVal.itemPrice}</Text>
                </View>
                <View style={styles.itemData}>
                    <Text style={styles.itemDataText}>{props.itemVal.itemQuantity}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.options} onPress={() => props.onDelete(props.itemKey)}>
                <Image
                    source={require('../../assets/favicon.png')}
                    style={styles.optionsIcon}
                    onPress={() => props.onDelete(props.itemKey)}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        flexDirection: 'row',
        marginVertical: 5,
        padding: 10,
        width: '95%',
    },
    itemDataContainer: {
        flex: 4,
        flexDirection: 'row',
    },
    itemData: {
        flex: 1,
        justifyContent: 'center',
    },
    itemDataText: {
        color: colors.secondary,
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    itemName: {
        flex: 3,
        justifyContent: 'center',
    },
    itemNameText: {
        textAlign: 'left',
    },
    options: {
        alignItems: 'center',
        paddingVertical: 5,
        flex: 1,
    },
    optionsIcon: {
        width: 25,
        height: 25,
    },
});

export default connect()(ListItem);