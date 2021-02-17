import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { connect } from 'react-redux';

import Container from '../components/Container';
import ReceivedListItem from '../components/ReceivedListItem';
import ListItemUpdate from '../components/ListItemUpdate';
import ReceivedListItemsMore from '../components/ReceivedListItemsMore';
import { updateReceivedListItem } from '../actions/receivedListItem';

const ReceivedListItems = props => {
    const [items, setItems] = useState([]);
    const [isUpdateMode, setUpdateMode] = useState(false);

    const handleUpdateLocalItem = ({ itemId, itemName, itemPrice, itemQuantity, availableItemQuantity }) => {
        const updatedItem = { itemId, itemName, itemPrice, itemQuantity, availableItemQuantity };
        // Delete old list item from list items list
        setItems(currentItems => {
            return currentItems.filter(item => item.key !== itemId);
        });
        // Add updated list item to list items list
        setItems(currentItems => [
            ...currentItems,
            {
                key: updatedItem.itemId,
                value: updatedItem
            }
        ]);
    };

    const handleUpdateItem = ({ itemId, itemName, itemPrice, itemQuantity, availableItemQuantity }) => {
        const item = {
            price_per_item: itemPrice,
            quantity_available: availableItemQuantity
        };
        (async () => {
            await props.dispatch(updateReceivedListItem(props.user.authToken, props.location.state.listKey, itemId, item));
        })();
        handleUpdateLocalItem({ itemId, itemName, itemPrice, itemQuantity, availableItemQuantity });
        setUpdateMode(false);
    };

    const cancelUpdateItem = () => {
        setUpdateMode(false);
    };

    const handleLoadedItems = () => {
        const loadedItems = props.location.state.listItems;

        if (!loadedItems) return console.log('Error while loading remote items!');

        for (let i = 0; i < loadedItems.length; i++) {
            setItems(currentItems => [
                ...currentItems,
                {
                    key: loadedItems[i]._id,
                    value: {
                        itemName: loadedItems[i].item_name,
                        itemPrice: loadedItems[i].price_per_item,
                        itemQuantity: loadedItems[i].quantity_requested,
                        availableItemQuantity: loadedItems[i].quantity_available
                    }
                }
            ]);
        }
    };

    const handleUnshareList = () => {
        props.location.state.onUnshareList(props.location.state.listKey)
    };

    useEffect(() => {
        !props.user.isAuthenticated && props.history.push('/Signin');
    });

    useEffect(() => {
        handleLoadedItems();
    }, []);

    return (
        <View style={{ width: '100%', flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => props.history.push('/ReceivedLists')} />
                <Appbar.Content title={props.location.state.listName} subtitle={`Shared by ${props.location.state.creatorUsername}`} />
                <ReceivedListItemsMore onUnshareList={handleUnshareList} />
            </Appbar.Header>
            <Container>
                <ListItemUpdate
                    itemType='receivedItem'
                    visible={isUpdateMode}
                    onUpdateItem={handleUpdateItem}
                    onCancel={cancelUpdateItem}
                />
                <View style={{ width: '100%', flex: 1 }}>
                    {(props.listItem.isLoading) ?
                        <ActivityIndicator />
                        :
                        <View style={{ flex: 1, width: '100%' }}>
                            {(items.length == 0) ?
                                <Container>
                                    <Text>
                                        No items in this list
                                    </Text>
                                </Container>
                                :
                                <View style={{ flex: 1, width: '100%' }}>
                                    <FlatList
                                        contentContainerStyle={{ alignItems: 'center' }}
                                        data={items}
                                        renderItem={itemData => (
                                            <ReceivedListItem
                                                itemKey={itemData.item.key}
                                                itemVal={itemData.item.value}
                                                setUpdateMode={setUpdateMode}
                                            />
                                        )}
                                    />
                                </View>
                            }
                        </View>
                    }
                </View>
            </Container>
        </View>
    );
};

const styles = StyleSheet.create({
    createItemFab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
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

export default connect(mapStateToProps)(ReceivedListItems);