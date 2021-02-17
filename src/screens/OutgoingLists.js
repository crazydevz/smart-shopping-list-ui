import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { connect } from 'react-redux';

import Container from '../components/Container';
import CustomDrawer from '../components/CustomDrawer';
import OutgoingList from '../components/OutgoingList';
import { loadOutgoingLists, unshareOutgoingList } from '../actions/outgoingList';

const OutgoingLists = props => {
    const [lists, setLists] = useState([]);

    const handleLoadUnacceptedLists = () => {
        (async () => {
            const unacceptedLists = await props.dispatch(loadOutgoingLists(props.user.authToken));
            if (!unacceptedLists) return console.log('Error while loading unaccepted lists!');

            for (let i = 0; i < unacceptedLists.length; i++) {
                setLists(currentLists => [
                    ...currentLists,
                    {
                        key: unacceptedLists[i]._id,
                        value: {
                            listName: unacceptedLists[i].list_name,
                            listItems: unacceptedLists[i].list_items,
                            shareeId: unacceptedLists[i]._sharee,
                            shareeUsername: unacceptedLists[i].sharee_username
                        }
                    }
                ]);
            }
        })();
    };

    const handleUnshareList = listKey => {
        (async () => {
            await props.dispatch(unshareOutgoingList(props.user.authToken, listKey));
        })();
        props.history.push('/OutgoingLists');
    };

    useEffect(() => {
        handleLoadUnacceptedLists();
    }, []);

    return (
        <CustomDrawer>
            <Appbar.Header>
                <Appbar.Action icon='menu' onPress={() => props.history.push('/Lists')} />
                <Appbar.Content title='Outgoing Requests' />
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
                                        <OutgoingList
                                            listKey={itemData.item.key}
                                            listVal={itemData.item.value}
                                            onUnshareList={handleUnshareList}
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

export default connect(mapStateToProps)(OutgoingLists);