import axios from 'axios';

import { PATH_API_SERVER } from '../constants/API-path';
import { deleteRemotelist } from './list';

const startCreatingItem = () => {
    return {
        type: 'CREATE_ITEM_START'
    };
};

const forwardData = (itemData) => {
    return {
        type: 'CREATE_ITEM_SUCCESS',
        payload: itemData
    };
};

async function createItem(authToken, listId, item, callback) {
    callback(startCreatingItem());
    const itemData = {
        item_name: item.itemName,
        price_per_item: item.itemPrice,
        quantity_requested: item.itemQuantity
    };
    try {
        const response = await axios({
            method: 'post',
            url: `${PATH_API_SERVER}/shoppingLists/${listId}`,
            data: itemData,
            headers: {'x-auth': authToken}
        });
        if(!response) return console.log('Request failed!');

        const responseData = response.data;

        listItems = responseData.updatedList.list_items;
        itemId = listItems[listItems.length - 1]._id;

        const itemD = {
            itemName: item.itemName,
            itemPrice: item.itemPrice,
            itemQuantity: item.itemQuantity,
            itemId
        };

        callback(forwardData(itemD));
    } catch (e) {
        console.log(e);
    }
};

export const createRemoteItem = (authToken, listId, item) => {
    return async (dispatch, getState) => {
        await createItem(authToken, listId, item, dispatch);
        stateAfter = getState();
        return stateAfter.listItem;
    };
};

async function deleteItem(authToken, listId, itemId, callback) {
    try {
        const response = await axios({
            method: 'delete',
            url: `${PATH_API_SERVER}/shoppingLists/${listId}/${itemId}`,
            headers: {'x-auth': authToken}
        });
        if(!response) return console.log('Request failed');
    } catch (e) {
        console.log(e);
    }
}

export const deleteRemoteItem = (authToken, listId, itemId) => {
    return async dispatch => {
        await deleteItem(authToken, listId, itemId, dispatch);
    };
};