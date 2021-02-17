import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Appbar, FAB, Divider, Subheading, Text } from 'react-native-paper';
import { connect } from 'react-redux';

import Container from '../components/Container';
import ListItemInput from '../components/ListItemInput';
import ListItem from '../components/ListItem';
import RecommendedItem from '../components/RecommendedItem';
import ListItemUpdate from '../components/ListItemUpdate';
import OutgoingListItemsMore from '../components/OutgoingListItemsMore';
import { createRemoteListItem, deleteRemoteListItem, updateRemoteListItem } from '../actions/listItem';

// Data
// import recommendedItems from '../../utilities/recommendationData';

const ListItems = props => {
    const recommendedItemsData = [
        {
            id: 1,
            itemName: 'Bread'
        },
        {
            id: 2,
            itemName: 'Butter'
        },
        {
            id: 3,
            itemName: 'Vinegar'
        }
    ];

    const [items, setItems] = useState([]);
    const [recommendedItems, setRecommendedItems] = useState([]);

    const [isAddMode, setAddMode] = useState(false);
    const [isUpdateMode, setUpdateMode] = useState(false);

    const handleCreateItem = item => {
        (async () => {
            const createdItem = await props.dispatch(createRemoteListItem(props.user.authToken, props.location.state.listKey, item));
            setItems(currentItems => [
                ...currentItems,
                {
                    key: createdItem.itemId,
                    value: createdItem
                }
            ]);
        })();
        setAddMode(false);
    };

    const handleUpdateLocalItem = ({ itemId, itemName, itemPrice, itemQuantity, availableItemQuantity = 0 }) => {
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

    // handleUpdateItem
    const handleUpdateItem = ({ itemId, itemName, itemPrice, itemQuantity, availableItemQuantity = 0 }) => {
        const item = {
            item_name: itemName,
            price_per_item: itemPrice,
            quantity_requested: itemQuantity,
            quantity_available: availableItemQuantity
        };
        (async () => {
            await props.dispatch(updateRemoteListItem(props.user.authToken, props.location.state.listKey, itemId, item));
        })();
        handleUpdateLocalItem({ itemId, itemName, itemPrice, itemQuantity, availableItemQuantity });
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

    // Handle item recommendations
    const handleLoadedItemRecommendations = () => {
        const loadedItems = recommendedItemsData;

        if (!loadedItems) return console.log('Error while loading recommended items');

        for (let i = 0; i < loadedItems.length; i++) {
            setRecommendedItems(currentItems => [
                ...currentItems,
                {
                    key: loadedItems[i].id,
                    value: {
                        itemName: loadedItems[i].itemName
                    }
                }
            ]);
        }
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
        handleLoadedItemRecommendations();
    };

    const handleCancelShareList = () => {
        props.location.state.onUnshareList(props.location.state.listKey);
    };

    useEffect(() => {
        !props.user.isAuthenticated && props.history.push('/Signin');
    });

    useEffect(() => {
        handleLoadedItems();
    }, []);

    return (
        <View style={{ width: '100%', flex: 1 }}>
            {(props.location.state.listType === 'myList') ?
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => props.history.push('/Lists')} />
                    <Appbar.Content title={props.location.state.listName} />
                </Appbar.Header>
                :
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => props.history.push('/Outgoinglists')} />
                    <Appbar.Content title={props.location.state.listName} subtitle={`Sent to ${props.location.state.shareeUsername}`} />
                    <OutgoingListItemsMore onCancelShareList={handleCancelShareList} />
                </Appbar.Header>
            }
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
                                        contentContainerStyle={{ alignItems: 'center', height: '50%' }}
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
                                    {/* <Divider />
                                    <Subheading style={{paddingLeft: 10}}>Recommended Grocery Items</Subheading>
                                    <FlatList
                                        contentContainerStyle={{ alignItems: 'center', height: '50%' }}
                                        data={recommendedItems}
                                        renderItem={itemData => (
                                            <RecommendedItem
                                                itemKey={itemData.item.key}
                                                itemVal={itemData.item.value}
                                            />
                                        )}
                                    /> */}
                                </View>
                                // &&
                                // <View style={{ flex: 1, width: '100%' }}>
                                //     <FlatList
                                //         contentContainerStyle={{ alignItems: 'center' }}
                                //         data={recommendedItems}
                                //         renderItem={itemData => (
                                //             <RecommendedItem
                                //                 itemKey={itemData.item.key}
                                //                 itemVal={itemData.item.value}
                                //             />
                                //         )}
                                //     />
                                // </View>
                            }
                        </View>
                    }
                </View>
                <FAB
                    style={styles.createItemFab}
                    large
                    icon="plus"
                    onPress={() => setAddMode(true)}
                />
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

export default connect(mapStateToProps)(ListItems);