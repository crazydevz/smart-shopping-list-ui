import axios from 'axios';

import { PATH_API_SERVER } from '../constants/API-path';

const loadDeliveryRequestsSuccess = loadedRequests => {
    return {
        type: 'LOAD_DELIVERY_SUCCESS',
        payload: loadedRequests
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
            method: 'get',
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