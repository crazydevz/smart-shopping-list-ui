import axios from 'axios';

import { PATH_API_SERVER } from '../constants/API-path';

const forwardData = (userData) => ({
    type: 'AUTHENTICATION_SUCCESS',
    payload: userData
});

const forwardError = error => ({
    type: 'AUTHENTICATION_FAILURE',
    payload: error
});

const startAuthentication = () => ({
    type: 'AUTHENTICATION_START'
});

async function signup(userCredentials, callback) {
    try {
        callback(startAuthentication());

        const response = await axios({
            method: 'post',
            url: `${PATH_API_SERVER}/users`,
            data: userCredentials
        });
        if (!response) return console.log('Request failed!');

        const responseData = response.data;

        userData = {
            id: responseData._id,
            email: responseData.email,
            username: responseData.username,
            authToken: response.headers['x-auth']
        };

        callback(forwardData(userData));
    } catch (e) {
        callback(forwardError(e));
    }
}

export const userSignup = userCredentials => {
    return async dispatch => {
        await signup(userCredentials, dispatch);
    };
};

async function signin(userCredentials, callback) {
    try {
        callback(startAuthentication());
        const response = await axios({
            method: 'post',
            url: `${PATH_API_SERVER}/users/login`,
            data: userCredentials
        });
        if (!response) return console.log('Request failed!');

        const responseData = response.data;

        userData = {
            id: responseData._id,
            email: responseData.email,
            username: responseData.username,
            authToken: response.headers['x-auth']
        };

        callback(forwardData(userData));
    } catch (e) {
        callback(forwardError(e));
    }
};

export const userSignin = userCredentials => {
    return async dispatch => {
        await signin(userCredentials, dispatch);
    };
};

const indicateSignout = () => ({
    type: 'SIGNOUT'
});

async function signout (authToken, callback) {
    try {
        const response = await axios({
            method: 'delete',
            url: `${PATH_API_SERVER}/users/me/token`,
            headers: {'x-auth': authToken}
        });
        if(!response) return console.log('Request failed!');

        callback(indicateSignout());
    } catch (e) {
        console.log(e);
    }
};

export const userSignout = (authToken) => {
    return async dispatch => {
        await signout(authToken, dispatch);
    };
};