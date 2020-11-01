import axios from 'axios';

import { PATH_API_SERVER } from '../constants/API-path';

const createListStart = () => {
    return {
        type: 'CREATE_LIST_START'
    };
};

const createListSuccess = createdList => {
    return {
        type: 'CREATE_LIST_SUCCESS',
        payload: createdList
    };
};

const loadListsSuccess = loadedLists => {
    return {
        type: 'LOAD_LISTS_SUCCESS',
        payload: loadedLists
    };
};

async function createList(authToken, listName, callback) {
    callback(createListStart());
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
        callback(createListSuccess(listData));
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
        callback(loadListsSuccess(loadedLists));
    } catch (e) {
        console.log(e);
    }
}

export const loadRemoteLists = (authToken) => {
    return async (dispatch, getState) => {
        await loadList(authToken, dispatch);
        stateAfter = getState();
        return stateAfter.list.loadedLists;
    };
};