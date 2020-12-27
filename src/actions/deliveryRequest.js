import axios from 'axios';

import { PATH_API_SERVER } from '../constants/API-path';

const loadDeliveryRequestsSuccess = loadedRequests => {
    return {
        type: 'LOAD_DELIVERY_SUCCESS',
        payload: loadedRequests
    };
};

const loadDeliveryInProgressSuccess = deliveryInProgress => {
    return {
        type: 'LOAD_DELIVERY_IN_PROGRESS',
        payload: deliveryInProgress
    };
};

async function _loadDeliveryRequests(authToken, callback) {
    try {
        const response = await axios({
            method: 'get',
            url: `${PATH_API_SERVER}/deliveries/requests`,
            headers: { 'x-auth': authToken }
        });
        if (!response) return console.log('Request failed');

        const responseData = response.data;

        const deliveryRequests = responseData.deliveryRequests;
        callback(loadDeliveryRequestsSuccess(deliveryRequests));
    } catch (e) {
        console.log(e);
    }
};

export const loadDeliveryRequests = (authToken) => {
    return async (dispatch, getState) => {
        await _loadDeliveryRequests(authToken, dispatch);
        stateAfter = getState();
        return stateAfter.deliveryRequest.deliveryRequests;
    };
};

async function _acceptDeliveryRequest(authToken, listId, location) {
    try {
        const { src_lat, src_long } = location;
        const response = await axios({
            method: 'patch',
            url: `${PATH_API_SERVER}/deliveries/requests/accept/${listId}`,
            data: { 
                src_lat,
                src_long
            },
            headers: { 'x-auth': authToken }
        });
        if (!response) return console.log('Request failed');

    } catch (e) {
        console.log(e);
    }
};

export const acceptDeliveryRequest = (authToken, listId, location) => {
    return async () => {
        await _acceptDeliveryRequest(authToken, listId, location);
    };
};

async function _rejectDeliveryRequest(authToken, listId) {
    try {
        const response = await axios({
            method: 'delete',
            url: `${PATH_API_SERVER}/deliveries/requests/reject/${listId}`,
            headers: { 'x-auth': authToken }
        });
        if (!response) return console.log('Request failed');

    } catch (e) {
        console.log(e);
    }
};

export const rejectDeliveryRequest = (authToken, listId) => {
    return async () => {
        await _rejectDeliveryRequest(authToken, listId);
    };
};

async function _loadDeliveryInProgress(authToken, callback) {
    try {
        const response = await axios({
            method: 'get',
            url: `${PATH_API_SERVER}/deliveries/inProgress`,
            headers: { 'x-auth': authToken }
        });
        if (!response) return console.log('Request failed');

        const responseData = response.data;

        const deliveryInProgress = responseData.deliveryInProgress;
        callback(loadDeliveryInProgressSuccess(deliveryInProgress));

    } catch (e) {
        callback(loadDeliveryInProgressSuccess(null));
        console.log(e);
    }
};

export const loadDeliveryInProgress = (authToken) => {
    return async (dispatch, getState) => {
        await _loadDeliveryInProgress(authToken, dispatch);
        stateAfter = getState();
        return stateAfter.deliveryRequest.deliveryInProgress;
    };
};

async function _cancelDeliveryInProgress(authToken, listId) {
    try {
        const response = await axios({
            method: 'delete',
            url: `${PATH_API_SERVER}/deliveries/inProgress/cancel/${listId}`,
            headers: { 'x-auth': authToken }
        });
        if (!response) return console.log('Request failed');

    } catch (e) {
        console.log(e);
    }
};

export const cancelDeliveryInProgress = (authToken, listId) => {
    return async () => {
        await _cancelDeliveryInProgress(authToken, listId);
    };
};

async function _completeDeliveryInProgress(authToken, listId) {
    try {
        const response = await axios({
            method: 'patch',
            url: `${PATH_API_SERVER}/deliveries/indicateCompletion/${listId}`,
            headers: { 'x-auth': authToken }
        });
        if (!response) return console.log('Request failed');

    } catch (e) {
        console.log(e);
    }
};

export const completeDeliveryInProgress = (authToken, listId) => {
    return async () => {
        await _completeDeliveryInProgress(authToken, listId);
    };
};

async function _requestListDelivery(authToken, listId, shareeId, { destLat, destLong }) {
    try {
        const response = await axios({
            method: 'post',
            url: `${PATH_API_SERVER}/deliveries`,
            data: {
                _list: listId,
                _sharee: shareeId,
                dest_lat: destLat,
                dest_long: destLong
            },
            headers: { 'x-auth': authToken }
        });
        if (!response) return console.log('Request failed');

    } catch (e) {
        console.log(e);
    }
};

export const requestListDelivery = (authToken, listId, shareeId, location) => {
    return async () => {
        await _requestListDelivery(authToken, listId, shareeId, location);
    };
};