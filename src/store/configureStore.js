import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import countReducer from '../reducers/count';
import userReducer from '../reducers/user';

export default () => {
    const store = createStore(
        combineReducers({
            count: countReducer,
            user: userReducer
        }),
        applyMiddleware(thunk)
    );
    return store;
}