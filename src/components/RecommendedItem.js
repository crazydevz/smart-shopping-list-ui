import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconButton, Surface, Text } from 'react-native-paper';

const ListItem = props => {
    return (
        <Surface style={styles.itemContainer}>
            <View
                style={styles.itemInfo}
            >
                <View style={styles.itemName}>
                    <Text style={styles.itemNameText}>{props.itemVal.itemName}</Text>
                </View>
            </View>
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
    itemName: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 2,
    },
});

export default ListItem;