import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { connect } from 'react-redux';

import Container from '../components/Container';
import CustomDrawer from '../components/CustomDrawer';
import ReceivedList from '../components/ReceivedList';
import { loadReceivedLists, unshareReceivedList } from '../actions/receivedList';

const ReceivedLists = props => {
    const [lists, setLists] = useState([]);

    const handleLoadReceivedLists = () => {
        (async () => {
            const receivedLists = await props.dispatch(loadReceivedLists(props.user.authToken));
            if (!receivedLists) return console.log('Error while loading unaccepted lists!');

            for (let i = 0; i < receivedLists.length; i++) {
                setLists(currentLists => [
                    ...currentLists,
                    {
                        key: receivedLists[i]._id,
                        value: {
                            listName: receivedLists[i].list_name,
                            listItems: receivedLists[i].list_items,
                            creatorId: receivedLists[i]._creator,
                            creatorUsername: receivedLists[i].creator_username
                        }
                    }
                ]);
            }
        })();
    };

    const handleUnshareList = listKey => {
        (async () => {
            await props.dispatch(unshareReceivedList(props.user.authToken, listKey));
        })();
        props.history.push('/ReceivedLists');
    };

    // const handleRejectList = listKey => {
    //     (async () => {
    //         await props.dispatch(rejectList(props.user.authToken, listKey));
    //     })();
    //     props.history.push('/IncomingLists');
    // };

    // const filterLists = () => {
    //     setLists(currentLists => {
    //         return currentLists.filter(list => list.key !== listKey);
    //     });
    // };

    useEffect(() => {
        handleLoadReceivedLists();
    }, []);

    return (
        <CustomDrawer>
            <Appbar.Header>
                <Appbar.Action icon='menu' onPress={() => props.history.push('/Lists')} />
                <Appbar.Content title='Shared With Me' />
            </Appbar.Header>
            <Container>
                <View style={{ width: '100%', flex: 1 }}>
                    {(props.list.isLoading) ?
                        <ActivityIndicator />
                        :
                        <View style={{ width: '100%', flex: 1 }}>
                            {(lists.length == 0) ?
                                <Container>
                                    <Text>
                                        No lists found
                                </Text>
                                </Container>
                                :
                                <FlatList
                                    contentContainerStyle={{ alignItems: 'center' }}
                                    data={lists}
                                    renderItem={itemData => (
                                        <ReceivedList
                                            // hist={props.history}
                                            listKey={itemData.item.key}
                                            listVal={itemData.item.value}
                                            onUnshareList={handleUnshareList}
                                            // onRejectList={handleRejectList}
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
        list: {
            isLoading: state.list.isLoading
        }
    };
};

export default connect(mapStateToProps)(ReceivedLists);