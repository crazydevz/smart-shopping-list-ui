import axios from 'axios';

import { PATH_API_SERVER } from '../constants/API-path';

const loadListsSuccess = loadedLists => {
    return {
        type: 'LOAD_UA_SUCCESS',
        payload: loadedLists
    };
};

async function _loadOutgoingLists(authToken, callback) {
    try {
        const response = await axios({
            method: 'get',
            url: `${PATH_API_SERVER}/shoppingLists/requests/outgoing`,
            headers: { 'x-auth': authToken }
        });
        if (!response) return console.log('Request failed');

        const responseData = response.data;

        const unacceptedLists = responseData.unacceptedLists;
        callback(loadListsSuccess(unacceptedLists));
    } catch (e) {
        console.log(e);
    }
};

export const loadOutgoingLists = (authToken) => {
    return async (dispatch, getState) => {
        await _loadOutgoingLists(authToken, dispatch);
        stateAfter = getState();
        return stateAfter.outgoingList.unacceptedLists;
    };
};

async function _unshareOutgoingList(authToken, listId) {
    try {
        const response = await axios({
            method: 'patch',
            url: `${PATH_API_SERVER}/shoppingLists/requests/outgoing/cancelRequest/${listId}`,
            headers: { 'x-auth': authToken }
        });
        if (!response) return console.log('Request failed');

    } catch (e) {
        console.log(e);
    }
};

export const unshareOutgoingList = (authToken, listId) => {
    return async () => {
        await _unshareOutgoingList(authToken, listId);
    };
};