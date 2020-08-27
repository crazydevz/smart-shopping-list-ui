import axios from 'axios';

import { PATH_API_SERVER } from '../constants/API-path';

const startCreatingList = () => {
    return {
        type: 'CREATE_LIST_START'
    };
};

const forwardData = listData => {
    return {
        type: 'CREATE_LIST_SUCCESS',
        payload: listData
    };
};

const loadLists = loadedLists => {
    return {
        type: 'LOADED_LISTS',
        payload: loadedLists
    };
};

async function createList(authToken, listName, callback) {
    callback(startCreatingList());
    try {
        const response = await axios({
            method: 'post',
            url: `${PATH_API_SERVER}/shoppingLists`,
            data: { list_name: listName },
            headers: { 'x-auth': authToken }
        });
        if(!response) return console.log('Request failed!');

        const responseData = response.data.savedList;

        const listData = {
            listId: responseData._id,
            listName: responseData.list_name,
            listItems: responseData.list_items,
            shareeId: responseData._sharee,
            shareeUsername: responseData.sharee_username,
        };
        callback(forwardData(listData));
    } catch (e) {
        console.log(e);
    }
}

export const createRemoteList = (authToken, listName) => {
    return async (dispatch, getState) => {
        await createList(authToken, listName, dispatch);
        stateAfter = getState();
        return stateAfter.list.listId;
    };
};

async function deleteList(authToken, listId, callback) {
    try {
        const response = await axios({
            method: 'delete',
            url: `${PATH_API_SERVER}/shoppingLists/${listId}`,
            headers: {'x-auth': authToken}
        });
        if (!response) return console.log('Request failed!');
    } catch (e) {
        console.log(e);
    }
}

export const deleteRemotelist = (authToken, listId) => {
    return async dispatch => {
        await deleteList(authToken, listId, dispatch);
    };
};

async function loadList(authToken, callback) {
    try {
        const response = await axios({
            method: 'get',
            url: `${PATH_API_SERVER}/shoppingLists`,
            headers: {'x-auth': authToken}
        });
        if(!response) return console.log('Request failed');

        const responseData = response.data;

        loadedLists = responseData.myLists;
        callback(loadLists(loadedLists));
    } catch (e) {
        console.log(e);
    }
}

export const loadRemoteLists = (authToken) => {
    return async (dispatch, getState) => {
        await loadList(authToken, dispatch);
        stateAfter = getState();
        // console.log(stateAfter.list.loadedLists);
        return stateAfter.list.loadedLists;
    };
};