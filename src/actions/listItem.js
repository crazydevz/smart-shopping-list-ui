import axios from 'axios';

import { PATH_API_SERVER } from '../constants/API-path';

const createItemStart = () => {
    return {
        type: 'CREATE_ITEM_START'
    };
};

const createItemSuccess = itemData => {
    return {
        type: 'CREATE_ITEM_SUCCESS',
        payload: itemData
    };
};

export const updateItemStart = itemData => {
    return {
        type: 'UPDATE_ITEM_START',
        payload: itemData
    };
};

async function createItem(authToken, listId, item, callback) {
    callback(createItemStart());
    let itemData = {
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

        itemData = {};
        itemData = {
            itemName: item.itemName,
            itemPrice: item.itemPrice,
            itemQuantity: item.itemQuantity,
            itemId
        };

        callback(createItemSuccess(itemData));
    } catch (e) {
        console.log(e);
    }
};

export const createRemoteListItem = (authToken, listId, item) => {
    return async (dispatch, getState) => {
        await createItem(authToken, listId, item, dispatch);
        stateAfter = getState();
        return stateAfter.listItem;
    };
};

async function updateItem (authToken, listId, itemId, item, callback) {
    try {
        const response = await axios({
            method: 'patch',
            url: `${PATH_API_SERVER}/shoppingLists/${listId}/${itemId}`,
            data: item,
            headers: {'x-auth': authToken}
        });
        if(!response) return console.log('Request failed');
    } catch (e) {
        console.log(e);
    }
};

export const updateRemoteListItem = (authToken, listId, itemId, item) => {
    return async (dispatch) => {
        await updateItem(authToken, listId, itemId, item, dispatch);
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

export const deleteRemoteListItem = (authToken, listId, itemId) => {
    return async dispatch => {
        await deleteItem(authToken, listId, itemId, dispatch);
    };
};