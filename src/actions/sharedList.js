import axios from 'axios';

import { PATH_API_SERVER } from '../constants/API-path';

const loadListsSuccess = loadedLists => {
    return {
        type: 'LOAD_LISTS_SUCCESS',
        payload: loadedLists
    };
};

async function _loadSharedLists(authToken, callback) {
    try {
        const response = await axios({
            method: 'get',
            url: `${PATH_API_SERVER}/shoppingLists/shared`,
            headers: { 'x-auth': authToken }
        });
        if (!response) return console.log('Request failed');

        const responseData = response.data;

        const sharedLists = responseData.sharedLists;
        callback(loadListsSuccess(sharedLists));
    } catch (e) {
        console.log(e);
    }
};

export const loadSharedLists = (authToken) => {
    return async (dispatch, getState) => {
        await _loadSharedLists(authToken, dispatch);
        stateAfter = getState();
        return stateAfter.sharedList.sharedLists;
    };
};

async function _unshareList(authToken, listId) {
    try {
        const response = await axios({
            method: 'patch',
            url: `${PATH_API_SERVER}/shoppingLists/unshareList/${listId}`,
            headers: { 'x-auth': authToken }
        });
        if (!response) return console.log('Request failed');

    } catch (e) {
        console.log(e);
    }
};

export const unshareList = (authToken, listId) => {
    return async () => {
        await _unshareList(authToken, listId);
    };
};