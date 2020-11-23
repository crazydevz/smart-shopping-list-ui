import axios from 'axios';

import { PATH_API_SERVER } from '../constants/API-path';

async function updateItem (authToken, listId, itemId, item, callback) {
    try {
        const response = await axios({
            method: 'patch',
            url: `${PATH_API_SERVER}/shoppingLists/received/${listId}/${itemId}`,
            data: item,
            headers: {'x-auth': authToken}
        });
        if(!response) return console.log('Request failed');
    } catch (e) {
        console.log(e);
    }
};

export const updateReceivedListItem = (authToken, listId, itemId, item) => {
    return async (dispatch) => {
        await updateItem(authToken, listId, itemId, item, dispatch);
    };
};