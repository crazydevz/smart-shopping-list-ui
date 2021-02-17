import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconButton, Surface, Text } from 'react-native-paper';
import { withRouter } from 'react-router-native';
import { connect } from 'react-redux';

import { shareListStart } from '../actions/list';
import ListMore from '../components/ListMore';

const List = props => {
    const handleShareList = () => {
        props.dispatch(shareListStart(props.listKey));
        props.setShareMode(true);
    };

    const handleShareListNearby = listKey => {
        props.history.push({
            pathname: '/ShareeOnMap',
            state: {
                listId: listKey
            }
        });
    };

    const handleDeleteList = () => {
        props.onDelete(props.listKey);
    };

    return (
        <Surface style={styles.listContainer}>
            <TouchableOpacity
                style={styles.listInfo}
                onPress={() => props.history.push({
                    pathname: '/ListItems',
                    state: {
                        listType: 'myList',
                        listKey: props.listKey,
                        listName: props.listVal.listName,
                        listItems: props.listVal.listItems
                    }
                })}
            >
                <View style={styles.listName}>
                    <Text>{props.listVal.listName}</Text>
                </View>
                <View style={styles.itemQuantity}>
                    <Text>{props.listVal.listItems.length}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.options}>
                <ListMore
                    listKey={props.listKey}
                    onDeleteList={handleDeleteList}
                    onShareList={handleShareList}
                    onShareListNearby={handleShareListNearby}
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

export default connect()(withRouter(List));