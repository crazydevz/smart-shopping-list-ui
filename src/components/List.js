import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import colors from '../config/colors';

const List = props => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemLeft} >
                <TouchableOpacity onPress={() => props.hist.push({ pathname: '/ListItems', state: { listKey: props.listKey, listItems: props.listVal.listItems } })}>
                    <Text style={{color: colors.primary}} >{props.listVal.listName}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.itemRight}>
                <TouchableOpacity onPress={() => props.onDelete(props.listKey)} >
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

export default List;