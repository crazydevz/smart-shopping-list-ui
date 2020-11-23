import axios from 'axios';

import { PATH_API_SERVER } from '../constants/API-path';

const loadListsSuccess = loadedLists => {
    return {
        type: 'LOAD_LISTS_SUCCESS',
        payload: loadedLists
    };
};

async function _loadReceivedLists(authToken, callback) {
    try {
        const response = await axios({
            method: 'get',
            url: `${PATH_API_SERVER}/shoppingLists/received`,
            headers: { 'x-auth': authToken }
        });
        if (!response) return console.log('Request failed');

        const responseData = response.data;

        const receivedLists = responseData.receivedLists;
        callback(loadListsSuccess(receivedLists));
    } catch (e) {
        console.log(e);
    }
};

export const loadReceivedLists = (authToken) => {
    return async (dispatch, getState) => {
        await _loadReceivedLists(authToken, dispatch);
        stateAfter = getState();
        return stateAfter.receivedList.receivedLists;
    };
};

async function _unshareReceivedList(authToken, listId) {
    try {
        const response = await axios({
            method: 'patch',
            url: `${PATH_API_SERVER}/shoppingLists/received/unshareList/${listId}`,
            headers: { 'x-auth': authToken }
        });
        if (!response) return console.log('Request failed');

    } catch (e) {
        console.log(e);
    }
};

export const unshareReceivedList = (authToken, listId) => {
    return async () => {
        await _unshareReceivedList(authToken, listId);
    };
};