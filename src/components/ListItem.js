import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import colors from '../config/colors';

const ListItem = props => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemLeft} >
                <TouchableOpacity>
    <Text style={{color: colors.primary}} >{props.itemVal.itemName}|  ${props.itemVal.itemPrice}|  {props.itemVal.itemQuantity}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.itemRight}>
                <TouchableOpacity onPress={() => props.onDelete(props.itemKey)} >
                    <Text style={{color: 'red'}} >Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: colors.secondary,
        flexDirection: 'row',
        flex: 1,
    },
    itemLeft: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.primary,
        borderWidth: 2,
    },
    itemRight: {
        padding: 10,
        backgroundColor: colors.primary,
    },
});

export default ListItem;