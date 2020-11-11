import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconButton, Surface, Text } from 'react-native-paper';
import { withRouter } from 'react-router-native';

const List = props => {
    return (
        <Surface style={styles.listContainer}>
            <TouchableOpacity
                style={styles.listInfo}
                onPress={() => props.history.push({ pathname: '/ListItems', state: { listKey: props.listKey, listName: props.listVal.listName, listItems: props.listVal.listItems } })}
            >
                <View style={styles.listName}>
                    <Text>{props.listVal.listName}</Text>
                </View>
                <View style={styles.itemQuantity}>
                    <Text>{props.listVal.listItems.length}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.options}>
                <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => props.onDelete(props.listKey)}
                />
            </View>
        </Surface>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 8,
        marginVertical: 5,
        height: 70,
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        elevation: 4,
    },
    listInfo: {
        height: '100%',
        flex: 4,
        flexDirection: 'row',
    },
    listName: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 3,
    },
    itemQuantity: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    options: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});

export default withRouter(List);