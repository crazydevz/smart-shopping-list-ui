import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import colors from '../config/colors';
import ListNameInput from '../components/ListNameInput';
import List from '../components/List';
import { userSignout } from '../actions/user';
import { createRemoteList, deleteRemotelist, loadRemoteLists } from '../actions/list';

const Lists = props => {
    const [listNames, setListNames] = useState([]);
    const [isAddMode, setAddMode] = useState(false);

    const handleCreateList = listName => {
        (async () => {
            const listId = await props.dispatch(createRemoteList(props.user.authToken, listName));
            setListNames(currentListNames => [
                ...currentListNames,
                { key: listId, value: {listName, listItems: [] } }
                // { key: listId, value: listName }
            ]);
        })();
        setAddMode(false);
    };

    const handleDeleteList = listKey => {
        props.dispatch(deleteRemotelist(props.user.authToken, listKey));
        setListNames(currentLists => {
            return currentLists.filter(list => list.key !== listKey);
        });
    };

    const cancelCreateList = () => {
        setAddMode(false);
    };

    const handleSignout = () => {
        props.dispatch(userSignout(props.user.authToken));
    };

    const handleLoadRemoteLists = () => {
        (async () => {
            const loadedLists = await props.dispatch(loadRemoteLists(props.user.authToken));
            // console.log(loadedLists);
            if (!loadedLists) return console.log('Error while loading remote lists!');
            let i = 0;
            for(; i<loadedLists.length; i++) {
                setListNames(currentLists => [
                    ...currentLists,
                    { key: loadedLists[i]._id, value: {listName: loadedLists[i].list_name, listItems: loadedLists[i].list_items } }
                ]);
            }
        })();
        // console.log('TESTING: ' + loadedLists[0].list_items[0]._id);
    };

    useEffect(() => {
        !props.user.isAuthenticated && props.history.push('/Signin');
    });

    useEffect(() => {
        // props.dispatch(loadRemoteLists(props.user.authToken));
        handleLoadRemoteLists();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.signoutButton}>
                <TouchableOpacity onPress={handleSignout} >
                    <Text style={{color: colors.secondary}}>Signout</Text>
                </TouchableOpacity>
            </View>
            <ListNameInput
                visible={isAddMode}
                onCreateList={handleCreateList}
                onCancel={cancelCreateList}
            />
            <View style={{width: '100%', height: '100%', marginTop: 30, justifyContent: 'flex-start'}}>
                {(props.list.isCreating) ?
                    <ActivityIndicator />
                    :
                    <View style={{borderColor: 'pink', borderWitdh: 2}}>
                        {listNames.length == 0 &&
                        <View style={styles.welcomeText}>
                            <Text style={{ color: colors.secondary}}>
                                It looks empty here.
                            </Text>
                            <Text style={{color: colors.secondary}}>
                                Get started by creating a list
                            </Text>
                        </View>}
                        <FlatList
                            data={listNames}
                            renderItem={itemData => (
                                <List
                                    hist={props.history}
                                    listKey={itemData.item.key}
                                    listVal={itemData.item.value}
                                    onDelete={handleDeleteList}
                                />
                            )}
                        />
                    </View>
                }
            </View>
            <View style={styles.createListButton}>
                <TouchableOpacity onPress={() => setAddMode(true)} >
                    <Text style={{color: colors.secondary}}>Create Shopping List</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50
    },
    createListButton: {
        padding: 10,
        backgroundColor: colors.primary,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: colors.secondary,
        position: 'absolute',
        bottom: 20,
    },
    signoutButton: {
        padding: 5,
        position: 'absolute',
        top: 30,
        right: 20,
    },
    textInput: {
        height: 40,
        width: '75%',
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
    },
    welcomeText: {
        position: 'absolute',
        left: 40,
        top: 250,
    },
});

const mapStateToProps = state => {
    return {
        user: {
            authToken: state.user.authToken,
            isAuthenticated: state.user.isAuthenticated
        },
        list: {
            isCreating: state.list.isCreating
        }
    };
};

export default connect(mapStateToProps)(Lists);