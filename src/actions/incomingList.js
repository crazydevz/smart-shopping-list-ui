import axios from 'axios';

import { PATH_API_SERVER } from '../constants/API-path';

const loadListsSuccess = loadedLists => {
    return {
        type: 'LOAD_UA_SUCCESS',
        payload: loadedLists
    };
};

async function _loadIncomingLists(authToken, callback) {
    try {
        const response = await axios({
            method: 'get',
            url: `${PATH_API_SERVER}/shoppingLists/requests`,
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

export const loadIncomingLists = (authToken) => {
    return async (dispatch, getState) => {
        await _loadIncomingLists(authToken, dispatch);
        stateAfter = getState();
        return stateAfter.incomingList.unacceptedLists;
    };
};

async function _acceptList(authToken, listId) {
    try {
        const response = await axios({
            method: 'patch',
            url: `${PATH_API_SERVER}/shoppingLists/acceptList/${listId}`,
            headers: { 'x-auth': authToken }
        });
        if (!response) return console.log('Request failed');

    } catch (e) {
        console.log(e);
    }
};

export const acceptList = (authToken, listId) => {
    return async () => {
        await _acceptList(authToken, listId);
    };
};

async function _rejectList(authToken, listId) {
    try {
        const response = await axios({
            method: 'patch',
            url: `${PATH_API_SERVER}/shoppingLists/rejectList/${listId}`,
            headers: { 'x-auth': authToken }
        });
        if (!response) return console.log('Request failed');

    } catch (e) {
        console.log(e);
    }
};

export const rejectList = (authToken, listId) => {
    return async () => {
        await _rejectList(authToken, listId);
    };
};