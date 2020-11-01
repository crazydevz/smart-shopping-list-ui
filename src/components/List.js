import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { withRouter } from 'react-router-native';

import colors from '../config/colors';

const List = props => {
    return (
        <View style={styles.listContainer}>
            <TouchableOpacity
                style={styles.listInfo}
                onPress={() => props.history.push({ pathname: '/ListItems', state: { listKey: props.listKey, listName: props.listVal.listName, listItems: props.listVal.listItems } })}
            >
                <View style={styles.listName}>
                    <Text style={styles.listNameText} >{props.listVal.listName}</Text>
                </View>
                <View style={styles.itemQuantity}>
                    <Text style={styles.itemQuantityText}>
                        { props.listVal.listItems.length }
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.options} onPress={() => props.onDelete(props.listKey)}>
                <Image
                    source={require('../../assets/favicon.png')}
                    style={styles.optionsIcon}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        flexDirection: 'row',
        marginVertical: 5,
        padding: 10,
        width: '95%',
    },
    listInfo: {
        flex: 4,
        flexDirection: 'row',
    },
    listName: {
        flex: 3,
        justifyContent: 'center',
    },
    listNameText: {
        color: colors.secondary,
        fontSize: 14,
        textAlign: 'left',
        textAlignVertical: 'center',
    },
    itemQuantity: {
        flex: 1,
        justifyContent: 'center',
    },
    itemQuantityText: {
        color: colors.secondary,
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'center',
        width: '100%',
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

export default withRouter(List);