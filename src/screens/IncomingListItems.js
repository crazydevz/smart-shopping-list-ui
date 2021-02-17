import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Appbar, Button, FAB, Text } from 'react-native-paper';
import { connect } from 'react-redux';

import Container from '../components/Container';
import ReadOnlyListItem from '../components/ReadOnlyListItem';

const IncomingListItems = props => {
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

    useEffect(() => {
        !props.user.isAuthenticated && props.history.push('/Signin');
    });

    useEffect(() => {
        handleLoadedItems();
    }, []);

    return (
        <View style={{ width: '100%', flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => props.history.push('/IncomingLists')} />
                <Appbar.Content title={props.location.state.listName} subtitle={`Sent by ${props.location.state.creatorUsername}`} />
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
                                    <View style={styles.buttonContainer}>
                                        <Button style={styles.button} mode="contained" onPress={() => props.location.state.onAcceptList(props.location.state.listKey)}>
                                            accept
                                        </Button>
                                        <Button style={styles.button} mode="outlined" onPress={() => props.location.state.onRejectList(props.location.state.listKey)}>
                                            reject
                                        </Button>
                                    </View>
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
    buttonContainer: {
        width: '100%',
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    button: {
        width: '45%',
    },
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

export default connect(mapStateToProps)(IncomingListItems);