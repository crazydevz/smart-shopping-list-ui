import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { connect } from 'react-redux';

import Container from '../components/Container';
import CustomDrawer from '../components/CustomDrawer';
import IncomingList from '../components/IncomingList';
import { acceptList, rejectList, loadIncomingLists } from '../actions/incomingList';

const IncomingLists = props => {
    const [lists, setLists] = useState([]);

    const handleLoadUnacceptedLists = () => {
        (async () => {
            const unacceptedLists = await props.dispatch(loadIncomingLists(props.user.authToken));
            if (!unacceptedLists) return console.log('Error while loading unaccepted lists!');

            for (let i = 0; i < unacceptedLists.length; i++) {
                setLists(currentLists => [
                    ...currentLists,
                    {
                        key: unacceptedLists[i]._id,
                        value: {
                            listName: unacceptedLists[i].list_name,
                            listItems: unacceptedLists[i].list_items,
                            creatorId: unacceptedLists[i]._creator,
                            creatorUsername: unacceptedLists[i].creator_username
                        }
                    }
                ]);
            }
        })();
    };

    const handleAcceptList = listKey => {
        (async () => {
            await props.dispatch(acceptList(props.user.authToken, listKey));
        })();
        props.history.push('/IncomingLists');
    };

    const handleRejectList = listKey => {
        (async () => {
            await props.dispatch(rejectList(props.user.authToken, listKey));
        })();
        props.history.push('/IncomingLists');
    };

    // const filterLists = () => {
    //     setLists(currentLists => {
    //         return currentLists.filter(list => list.key !== listKey);
    //     });
    // };

    useEffect(() => {
        handleLoadUnacceptedLists();
    }, []);

    return (
        <CustomDrawer>
            <Appbar.Header>
                <Appbar.Action icon='menu' onPress={() => props.history.push('/Lists')} />
                <Appbar.Content title='Incoming Requests' />
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
                                        No requests found
                                </Text>
                                </Container>
                                :
                                <FlatList
                                    contentContainerStyle={{ alignItems: 'center' }}
                                    data={lists}
                                    renderItem={itemData => (
                                        <IncomingList
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
        list: {
            isLoading: state.list.isLoading
        }
    };
};

export default connect(mapStateToProps)(IncomingLists);