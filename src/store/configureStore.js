import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import countReducer from '../reducers/count';
import userReducer from '../reducers/user';
import listReducer from '../reducers/list';
import listItemReducer from '../reducers/listItem';

export default () => {
    const store = createStore(
        combineReducers({
            count: countReducer,
            user: userReducer,
            list: listReducer,
            listItem: listItemReducer
        }),
        applyMiddleware(thunk)
    );
    return store;
}