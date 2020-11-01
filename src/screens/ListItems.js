import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import colors from '../config/colors';
import Container from '../components/Container';
import Header from '../components/Header';
import ListItemInput from '../components/ListItemInput';
import ListItem from '../components/ListItem';
import ListItemUpdate from '../components/ListItemUpdate';
import { userSignout } from '../actions/user';
import { createRemoteListItem, updateRemoteListItem, deleteRemoteListItem } from '../actions/listItem';

const ListItems = props => {
    const [items, setItems] = useState([]);
    const [isAddMode, setAddMode] = useState(false);
    const [isUpdateMode, setUpdateMode] = useState(false);

    const handleCreateItem = item => {
        (async () => {
            const createdItem = await props.dispatch(createRemoteListItem(props.user.authToken, props.location.state.listKey, item));
            setItems(currentItems => [
                ...currentItems,
                { key: createdItem.itemId, value: createdItem }
            ]);
        })();
        setAddMode(false);
    };

    const handleUpdateLocalItem = ({ itemId, itemName, itemPrice, itemQuantity }) => {
        const updatedItem = { itemId, itemName, itemPrice, itemQuantity };
        // console.log(updatedItem);
        // Delete old list item from list items list
        setItems(currentItems => {
            return currentItems.filter(item => item.key !== itemId);
        });
        // Add updated list item to list items list
        setItems(currentItems => [
            ...currentItems,
            { key: updatedItem.itemId, value: updatedItem }
        ]);
    };

    // handleUpdateItem
    const handleUpdateItem = ({ itemId, itemName, itemPrice, itemQuantity }) => {
        const item = {
            item_name: itemName,
            price_per_item: itemPrice,
            quantity_requested: itemQuantity
        };
        (async () => {
            await props.dispatch(updateRemoteListItem(props.user.authToken, props.location.state.listKey, itemId, item));
        })();
        handleUpdateLocalItem({ itemId, itemName, itemPrice, itemQuantity });
        setUpdateMode(false);
    };

    const handleDeleteItem = itemKey => {
        props.dispatch(deleteRemoteListItem(props.user.authToken, props.location.state.listKey, itemKey));
        setItems(currentItems => {
            return currentItems.filter(item => item.key !== itemKey);
        });
    };

    const cancelCreateItem = () => {
        setAddMode(false);
    };

    const cancelUpdateItem = () => {
        setUpdateMode(false);
    };

    const handleSignout = () => {
        props.dispatch(userSignout(props.user.authToken));
    };

    const handleLoadedItems = () => {
        const loadedItems = props.location.state.listItems;

        if (!loadedItems) return console.log('Error while loading remote items!');

        for(let i = 0; i < loadedItems.length; i++) {
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
        <Container>
            <ListItemInput
                visible={isAddMode}
                onCreateItem={handleCreateItem}
                onCancel={cancelCreateItem}
            />
            <ListItemUpdate
                visible={isUpdateMode}
                onUpdateItem={handleUpdateItem}
                onCancel={cancelUpdateItem}
            />
            <Header>
                <View style={{flexDirection: 'row', flex: 5}}>
                    <TouchableOpacity
                        style={styles.options}
                        onPress={() => props.history.push('/Lists')}
                    >
                        <Image
                            style={styles.optionsIcon}
                            source={require('../../assets/round_arrow_back_white_18dp.png')}
                        />
                    </TouchableOpacity>
                    <View style={styles.headerName}>
                        <Text style={styles.headerNameText}>
                            {props.location.state.listName}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.signout}
                    onPress={handleSignout}
                >
                    <Text style={styles.signoutText}>
                        Signout
                    </Text>
                </TouchableOpacity>
            </Header>
            <View style={{width: '100%', flex: 1}}>
                {(props.listItem.isLoading) ?
                    <ActivityIndicator />
                    :
                    <View style={{ flex: 1, width: '100%' }}>
                        {items.length == 0 &&
                        <View style={styles.welcomeText}>
                            <Text style={{ color: colors.secondary}}>
                                No items in this list
                            </Text>
                        </View>}
                        <FlatList
                            contentContainerStyle={{ alignItems: 'center'}}
                            data={items}
                            renderItem={itemData => (
                                <ListItem
                                    itemKey={itemData.item.key}
                                    itemVal={itemData.item.value}
                                    onDelete={handleDeleteItem}
                                    setUpdateMode={setUpdateMode}
                                />
                            )}
                        />
                    </View>
                }
            </View>
            <TouchableOpacity
                style={styles.createItemButton}
                onPress={() => setAddMode(true)} >
                <Text style={{color: colors.secondary, fontSize: 20}}>+</Text>
            </TouchableOpacity>
        </Container>
    );
};

const styles = StyleSheet.create({
    createItemButton: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderWidth: 2,
        borderRadius: 50,
        borderColor: colors.secondary,
        bottom: 25,
        color: colors.secondary,
        height: 50,
        justifyContent: 'center',
        position: 'absolute',
        right: 30,
        width: 50,
    },
    headerName: {
        flex: 4,
        justifyContent: 'center',
    },
    headerNameText: {
        color: colors.primary,
        fontSize: 25,
        textAlign: 'left',
        width: '100%',
    },
    options: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    optionsIcon: {
        height: 30,
        width: 30,
    },
    signout: {
        flex: 1,
        justifyContent: 'center',
    },
    signoutText: {
        color: colors.primary,
        fontSize: 14,
        textAlign: 'center',
        width: '100%',
    },
    textInput: {
        height: 40,
        width: '75%',
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'white',
    },
    welcomeText: {
        position: 'absolute',
        left: 100,
        top: 250,
    },
});

const mapStateToProps = state => {
    return {
        user: {
            authToken: state.user.authToken,
            isAuthenticated: state.user.isAuthenticated
        },
        listItem: {
            isLoading: state.listItem.isLoading
        }
    };
};

export default connect(mapStateToProps)(ListItems);