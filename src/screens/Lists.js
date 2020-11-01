import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import colors from '../config/colors';
import Container from '../components/Container';
import Header from '../components/Header';
import ListNameInput from '../components/ListNameInput';
import List from '../components/List';
import { userSignout } from '../actions/user';
import { createRemoteList, deleteRemotelist, loadRemoteLists } from '../actions/list';

const Lists = props => {
    const [lists, setLists] = useState([]);
    const [isAddMode, setAddMode] = useState(false);

    const handleCreateList = listName => {
        (async () => {
            const listId = await props.dispatch(createRemoteList(props.user.authToken, listName));
            setLists(currentListNames => [
                ...currentListNames,
                { key: listId, value: { listName, listItems: [] } }
            ]);
        })();
        setAddMode(false);
    };

    const handleDeleteList = listKey => {
        props.dispatch(deleteRemotelist(props.user.authToken, listKey));
        setLists(currentLists => {
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

            if (!loadedLists) return console.log('Error while loading remote lists!');

            for (let i = 0; i < loadedLists.length; i++) {
                setLists(currentLists => [
                    ...currentLists,
                    { key: loadedLists[i]._id, value: { listName: loadedLists[i].list_name, listItems: loadedLists[i].list_items } }
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
        <Container>
            <ListNameInput
                visible={isAddMode}
                onCreateList={handleCreateList}
                onCancel={cancelCreateList}
            />
            <Header>
                <View style={{flexDirection: 'row', flex: 5}}>
                    <TouchableOpacity
                        style={styles.options}
                    >
                        <Image
                            style={styles.optionsIcon}
                            source={require('../../assets/baseline_menu_white_18dp.png')}
                        />
                    </TouchableOpacity>
                    <View style={styles.headerName}>
                        <Text style={styles.headerNameText}>
                            My Lists
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.signout}
                    onPress={handleSignout}
                >
                    <Text style={styles.signoutText}>
                        Signout
                    </Text>
                </TouchableOpacity>
            </Header>
            <View style={{width: '100%', flex: 1}}>
                {(props.list.isLoading) ?
                    <ActivityIndicator />
                    :
                    <View style={{ flex: 1, width: '100%' }}>
                        {lists.length == 0 &&
                            <View style={styles.welcomeText}>
                                <Text style={{ color: colors.secondary }}>
                                    It looks empty here.
                                </Text>
                                <Text style={{ color: colors.secondary }}>
                                    Get started by creating a list
                                </Text>
                            </View>}
                        <FlatList
                            contentContainerStyle={{ alignItems: 'center'}}
                            data={lists}
                            renderItem={itemData => (
                                <List
                                    // hist={props.history}
                                    listKey={itemData.item.key}
                                    listVal={itemData.item.value}
                                    onDelete={handleDeleteList}
                                />
                            )}
                        />
                    </View>
                }
            </View>
            <TouchableOpacity
                style={styles.createListButton}
                onPress={() => setAddMode(true)} >
                <Text style={{ color: colors.secondary, fontSize: 20 }}>+</Text>
            </TouchableOpacity>
        </Container>
    );
};

const styles = StyleSheet.create({
    createListButton: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderWidth: 2,
        borderRadius: 50,
        borderColor: colors.secondary,
        bottom: 25,
        color: colors.secondary,
        height: 50,
        justifyContent: 'center',
        position: 'absolute',
        right: 30,
        width: 50,
    },
    headerName: {
        flex: 4,
        justifyContent: 'center',
    },
    headerNameText: {
        color: colors.primary,
        fontSize: 25,
        textAlign: 'left',
        width: '100%',
    },
    options: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    optionsIcon: {
        height: 30,
        width: 30,
    },
    signout: {
        flex: 1,
        justifyContent: 'center',
    },
    signoutText: {
        color: colors.primary,
        fontSize: 14,
        textAlign: 'center',
        width: '100%',
    },
    textInput: {
        height: 40,
        width: '75%',
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'white',
    },
    welcomeText: {
        position: 'absolute',
        left: 100,
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
            isLoading: state.list.isLoading
        }
    };
};

export default connect(mapStateToProps)(Lists);