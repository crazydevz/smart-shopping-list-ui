import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native'

import Container from '../components/Container';
import DeliveryListItem from '../components/DeliveryListItem';
import { loadDeliveryInProgress, cancelDeliveryInProgress, completeDeliveryInProgress } from '../actions/deliveryRequest';

const DeliveryInProgress = props => {
    let [list, setList] = useState(null);
    const [items, setItems] = useState([]);

    const handleLoadList = () => {
        (async () => {
            const list = await props.dispatch(loadDeliveryInProgress(props.user.authToken));
            if (!list) return console.log('Error while loading delivery in progress');

            setList(list);
            handleLoadedItems(list);
        })();
    };

    const handleLoadedItems = _list => {
        const loadedItems = _list.list_items;

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

    const handleCompleteDelivery = listKey => {
        (async () => {
            await props.dispatch(completeDeliveryInProgress(props.user.authToken, listKey));
            setList(null);
        })();
    };

    const handleCancelDeliveryInProgress = listKey => {
        (async () => {
            await props.dispatch(cancelDeliveryInProgress(props.user.authToken, listKey));
            setList(null);
        })();
    };

    useEffect(() => {
        !props.user.isAuthenticated && props.history.push('/Signin');
    });

    useEffect(() => {
        handleLoadList();
    }, []);

    return (
        <View style={{ width: '100%', flex: 1 }}>
            <Appbar.Header>
                <Appbar.Action icon='menu' onPress={() => props.history.push('/Lists')} />
                {(list !== null) && <Appbar.Content title={list.list_name} subtitle={`Sent by ${list.creator_username}`} />}
            </Appbar.Header>
            <Container>
                <View style={{ width: '100%', flex: 1 }}>
                    {(props.listItem.isLoading) ?
                        <ActivityIndicator />
                        :
                        <View style={{ flex: 1, width: '100%' }}>
                            {(list === null || items.length === 0) ?
                                <Container>
                                    <Text>
                                        No delivery in progress
                                    </Text>
                                </Container>
                                :
                                <View style={{ flex: 1, width: '100%' }}>
                                    <FlatList
                                        contentContainerStyle={{ alignItems: 'center' }}
                                        data={items}
                                        renderItem={itemData => (
                                            <DeliveryListItem
                                                itemKey={itemData.item.key}
                                                itemVal={itemData.item.value}
                                            />
                                        )}
                                    />
                                    <Button style={{ width: '100%' }} mode='outlined' onPress={() => { props.history.push('/SharerOnMap') }} >View Delivery Location</Button>
                                    <View style={styles.buttonContainer}>
                                        <Button style={styles.button} mode="contained" onPress={() => { handleCompleteDelivery(list._id) }}>
                                            finish delivery
                                                </Button>
                                        <Button style={styles.button} mode="outlined" onPress={() => { handleCancelDeliveryInProgress(list._id) }}>
                                            cancel
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

export default connect(mapStateToProps)(withRouter(DeliveryInProgress));