import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Appbar, FAB, Text } from 'react-native-paper';
import { connect } from 'react-redux';

// import DrawerView from '../components/DrawerView';
import CustomDrawer from '../components/CustomDrawer';
import Container from '../components/Container';
import ListNameInput from '../components/ListNameInput';
import ShareListModal from '../components/ShareListModal';
import List from '../components/List';
import ListsMore from '../components/ListsMore';
import { userSignout } from '../actions/user';
import { createRemoteList, deleteRemotelist, loadRemoteLists, shareList } from '../actions/list';

const Lists = props => {
    const [lists, setLists] = useState([]);
    const [isAddMode, setAddMode] = useState(false);
    const [isShareMode, setShareMode] = useState(false);

    const handleCreateList = listName => {
        (async () => {
            const listId = await props.dispatch(createRemoteList(props.user.authToken, listName));
            setLists(currentListNames => [
                ...currentListNames,
                {
                    key: listId,
                    value: {
                        listName,
                        listItems: []
                    }
                }
            ]);
        })();
        setAddMode(false);
    };

    const filterLists = listKey => {
        setLists(currentLists => {
            return currentLists.filter(list => list.key !== listKey);
        });
    };

    const handleDeleteList = listKey => {
        props.dispatch(deleteRemotelist(props.user.authToken, listKey));
        filterLists(listKey);
    };

    const cancelCreateList = () => {
        setAddMode(false);
    };

    const handleShareList = (listKey, shareeUsername) => {
        props.dispatch(shareList(props.user.authToken, listKey, shareeUsername));
        filterLists(listKey);
        setShareMode(false);
    };

    const cancelShareList = () => {
        setShareMode(false);
    };

    const handleSignout = () => {
        props.dispatch(userSignout(props.user.authToken));
    };

    const handleLoadRemoteLists = () => {
        (async () => {
            const loadedLists = await props.dispatch(loadRemoteLists(props.user.authToken));

            if (!loadedLists) return console.log('Error while loading remote lists!');

            for (let i = 0; i < loadedLists.length; i++) {
                setLists(currentLists => [
                    ...currentLists,
                    {
                        key: loadedLists[i]._id,
                        value: {
                            listName: loadedLists[i].list_name,
                            listItems: loadedLists[i].list_items
                        }
                    }
                ]);
            }
        })();
    };

    useEffect(() => {
        !props.user.isAuthenticated && props.history.push('/Signin');
    });

    useEffect(() => {
        handleLoadRemoteLists();
    }, []);

    return (
        // <View style={{ width: '100%', flex: 1 }}>
        <CustomDrawer>
            <ListNameInput
                visible={isAddMode}
                onCreateList={handleCreateList}
                onCancel={cancelCreateList}
            />
            <ShareListModal
                visible={isShareMode}
                onShareList={handleShareList}
                onCancel={cancelShareList}
            />
            <Appbar.Header>
                <Appbar.Action icon='menu' />
                <Appbar.Content title='My Lists' />
                <ListsMore onSignout={handleSignout} />
            </Appbar.Header>
            <Container>
                <View style={{ width: '100%', flex: 1 }}>
                    {(props.list.isLoading) ?
                        <ActivityIndicator />
                        :
                        <View style={{ width: '100%', flex: 1 }}>
                            {(lists.length === 0) ?
                                <Container>
                                    <Text>
                                        It looks empty here.
                                    </Text>
                                    <Text>
                                        Get started by creating a list
                                    </Text>
                                </Container>
                                :
                                <FlatList
                                    contentContainerStyle={{ alignItems: 'center' }}
                                    data={lists}
                                    renderItem={itemData => (
                                        <List
                                            // hist={props.history}
                                            listKey={itemData.item.key}
                                            listVal={itemData.item.value}
                                            onDelete={handleDeleteList}
                                            setShareMode={setShareMode}
                                        />
                                    )}
                                />}
                        </View>
                    }
                </View>
                <FAB
                    style={styles.createListFab}
                    large
                    icon="plus"
                    onPress={() => setAddMode(true)}
                />
            </Container>
        </CustomDrawer>
        // </View>
    );
};

const styles = StyleSheet.create({
    createListFab: {
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
        list: {
            isLoading: state.list.isLoading
        }
    };
};

export default connect(mapStateToProps)(Lists);