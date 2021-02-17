import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { connect } from 'react-redux';

import Container from '../components/Container';
import ReadOnlyListItem from '../components/ReadOnlyListItem';
import SharedListItemsMore from '../components/SharedListItemsMore';

const SharedListItems = props => {
    const [items, setItems] = useState([]);

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
                <Appbar.BackAction onPress={() => props.history.push('/SharedLists')} />
                <Appbar.Content title={props.location.state.listName} subtitle={`Shared with ${props.location.state.shareeUsername}`} />
                <SharedListItemsMore onUnshareList={handleUnshareList} />
            </Appbar.Header>
            <Container>
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
                                            <ReadOnlyListItem
                                                itemKey={itemData.item.key}
                                                itemVal={itemData.item.value}
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

export default connect(mapStateToProps)(SharedListItems);