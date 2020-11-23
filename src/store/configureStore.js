import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import countReducer from '../reducers/count';
import userReducer from '../reducers/user';
import listReducer from '../reducers/list';
import listItemReducer from '../reducers/listItem';
import incomingListReducer from '../reducers/incomingList';
import outgoingListReducer from '../reducers/outgoingList';
import receivedListReducer from '../reducers/receivedList';
import sharedListReducer from '../reducers/sharedList';

export default () => {
    const store = createStore(
        combineReducers({
            count: countReducer,
            user: userReducer,
            list: listReducer,
            listItem: listItemReducer,
            incomingList: incomingListReducer,
            outgoingList: outgoingListReducer,
            receivedList: receivedListReducer,
            sharedList: sharedListReducer
        }),
        applyMiddleware(thunk)
    );
    return store;
}