import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { connect } from 'react-redux';

import Container from '../components/Container';
import CustomDrawer from '../components/CustomDrawer';
import DeliveryRequest from '../components/DeliveryRequest';
// import { acceptList, rejectList, loadIncomingLists } from '../actions/incomingList';
import { acceptDeliveryRequest, rejectDeliveryRequest, loadDeliveryRequests } from '../actions/deliveryRequest';

const DeliveryRequests = props => {
    const [lists, setLists] = useState([]);

    const handleLoadDeliveryRequests = () => {
        (async () => {
            const deliveryRequests = await props.dispatch(loadDeliveryRequests(props.user.authToken));
            if (!deliveryRequests) return console.log('Error while loading delivery requests');

            for (let i = 0; i < deliveryRequests.length; i++) {
                setLists(currentLists => [
                    ...currentLists,
                    {
                        key: deliveryRequests[i]._id,
                        value: {
                            listName: deliveryRequests[i].list_name,
                            listItems: deliveryRequests[i].list_items,
                            creatorId: deliveryRequests[i]._creator,
                            creatorUsername: deliveryRequests[i].creator_username
                        }
                    }
                ]);
            }
        })();
    };

    const handleAcceptList = (listKey, location) => {
        (async () => {
            await props.dispatch(acceptDeliveryRequest(props.user.authToken, listKey, location));
        })();
        props.history.push('/DeliveryRequests');
    };

    const handleRejectList = listKey => {
        (async () => {
            await props.dispatch(rejectDeliveryRequest(props.user.authToken, listKey));
        })();
        props.history.push('/DeliveryRequests');
    };

    // const filterLists = () => {
    //     setLists(currentLists => {
    //         return currentLists.filter(list => list.key !== listKey);
    //     });
    // };

    useEffect(() => {
        handleLoadDeliveryRequests();
    }, []);

    return (
        <CustomDrawer>
            <Appbar.Header>
                <Appbar.Action icon='menu' onPress={() => props.history.push('/Lists')} />
                <Appbar.Content title='Delivery Requests' />
            </Appbar.Header>
            <Container>
                <View style={{ width: '100%', flex: 1 }}>
                    {(props.deliveryRequest.isLoading) ?
                        <ActivityIndicator />
                        :
                        <View style={{ width: '100%', flex: 1 }}>
                            {(lists.length == 0) ?
                                <Container>
                                    <Text>
                                        No requests found
                                    </Text>
                                </Container>
                                :
                                <FlatList
                                    contentContainerStyle={{ alignItems: 'center' }}
                                    data={lists}
                                    renderItem={itemData => (
                                        <DeliveryRequest
                                            // hist={props.history}
                                            listKey={itemData.item.key}
                                            listVal={itemData.item.value}
                                            onAcceptList={handleAcceptList}
                                            onRejectList={handleRejectList}
                                        />
                                    )}
                                />}
                        </View>
                    }
                </View>
            </Container>
        </CustomDrawer>
    );
};

const mapStateToProps = state => {
    return {
        user: {
            authToken: state.user.authToken,
            isAuthenticated: state.user.isAuthenticated
        },
        deliveryRequest: {
            isLoading: state.deliveryRequest.isLoading
        }
    };
};

export default connect(mapStateToProps)(DeliveryRequests);