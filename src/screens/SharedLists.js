import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { connect } from 'react-redux';

import Container from '../components/Container';
import CustomDrawer from '../components/CustomDrawer';
import SharedList from '../components/SharedList';
import { loadSharedLists, unshareList } from '../actions/sharedList';

const SharedLists = props => {
    const [lists, setLists] = useState([]);

    const handleLoadSharedLists = () => {
        (async () => {
            const sharedLists = await props.dispatch(loadSharedLists(props.user.authToken));
            if (!sharedLists) return console.log('Error while loading unaccepted lists!');

            for (let i = 0; i < sharedLists.length; i++) {
                setLists(currentLists => [
                    ...currentLists,
                    {
                        key: sharedLists[i]._id,
                        value: {
                            listName: sharedLists[i].list_name,
                            listItems: sharedLists[i].list_items,
                            shareeId: sharedLists[i]._sharee,
                            shareeUsername: sharedLists[i].sharee_username
                        }
                    }
                ]);
            }
        })();
    };

    const handleUnshareList = listKey => {
        (async () => {
            await props.dispatch(unshareList(props.user.authToken, listKey));
        })();
        props.history.push('/SharedLists');
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
        handleLoadSharedLists();
    }, []);

    return (
        <CustomDrawer>
            <Appbar.Header>
                <Appbar.Action icon='menu' onPress={() => props.history.push('/Lists')} />
                <Appbar.Content title='Shared By Me' />
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
                                        <SharedList
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

export default connect(mapStateToProps)(SharedLists);