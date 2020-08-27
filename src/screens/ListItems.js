import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import colors from '../config/colors';
import ListItemInput from '../components/ListItemInput';
import ListItem from '../components/ListItem';
import { userSignout } from '../actions/user';
import { createRemoteItem, deleteRemoteItem } from '../actions/listItem';

const ListItems = props => {
    const [items, setItems] = useState([]);
    const [isAddMode, setAddMode] = useState(false);

    const handleCreateItem = item => {
        (async () => {
            const itemData = await props.dispatch(createRemoteItem(props.user.authToken, props.location.state.listKey, item));
            setItems(currentItems => [
                ...currentItems,
                { key: itemData.itemId, value: itemData }
            ]);
        })();
        setAddMode(false);
    };

    const handleDeleteItem = itemKey => {
        props.dispatch(deleteRemoteItem(props.user.authToken, props.location.state.listKey, itemKey));
        setItems(currentItems => {
            return currentItems.filter(item => item.key !== itemKey);
        });
    };

    const cancelCreateItem = () => {
        setAddMode(false);
    };

    const handleSignout = () => {
        props.dispatch(userSignout(props.user.authToken));
    };

    const handleLoadedItems = () => {
        const loadedItems = props.location.state.listItems;
        if (!loadedItems) return console.log('Error while loading remote items!');
        // console.log('Loaded Items: ' + loadedItems[0]._id);  // TESTING
        let i = 0;
        for(; i<loadedItems.length; i++) {
            setItems(currentItems => [
                ...currentItems,
                { key: loadedItems[i]._id, value: {itemName: loadedItems[i].item_name, itemPrice: loadedItems[i].price_per_item, itemQuantity: loadedItems[i].quantity_requested } }
            ]);
        }
    };

    useEffect(() => {
        !props.user.isAuthenticated && props.history.push('/Signin');
    });

    useEffect(() => {
        handleLoadedItems();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.signoutButton}>
                <TouchableOpacity onPress={handleSignout} >
                    <Text style={{color: colors.secondary}}>Signout</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.backButton}>
                <TouchableOpacity onPress={() => props.history.push('/Lists')} >
                    <Text style={{color: colors.secondary}}>Back</Text>
                </TouchableOpacity>
            </View>
            <ListItemInput
                visible={isAddMode}
                onCreateItem={handleCreateItem}
                onCancel={cancelCreateItem}
            />
            <View style={{width: '100%', height: '100%', marginTop: 30, justifyContent: 'flex-start'}}>
                {(props.list.isCreatingList) ?
                    <ActivityIndicator />
                    :
                    <View style={{borderColor: 'pink', borderWitdh: 2}}>
                        {items.length == 0 &&
                        <View style={styles.welcomeText}>
                            <Text style={{ color: colors.secondary}}>
                                No item in this list
                            </Text>
                        </View>}
                        <FlatList
                            data={items}
                            renderItem={itemData => (
                                <ListItem
                                    itemKey={itemData.item.key}
                                    itemVal={itemData.item.value}
                                    onDelete={handleDeleteItem}
                                />
                            )}
                        />
                    </View>
                }
            </View>
            <View style={styles.createItemButton}>
                <TouchableOpacity onPress={() => setAddMode(true)} >
                    <Text style={{color: colors.secondary}}>Add Item</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50
    },
    createItemButton: {
        padding: 10,
        backgroundColor: colors.primary,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: colors.secondary,
        position: 'absolute',
        bottom: 20,
    },
    signoutButton: {
        padding: 5,
        position: 'absolute',
        top: 30,
        right: 20,
    },
    backButton: {
        padding: 5,
        position: 'absolute',
        top: 30,
        left: 20,
    },
    textInput: {
        height: 40,
        width: '75%',
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
    },
    welcomeText: {
        position: 'absolute',
        left: 40,
        top: 250,
    },
});

const mapStateToProps = state => {
    return {
        user: {
            authToken: state.user.authToken,
            isAuthenticated: state.user.isAuthenticated
        },
        list: {
            isCreatingList: state.list.isCreatingList
        }
    };
};

export default connect(mapStateToProps)(ListItems);