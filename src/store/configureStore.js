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
import deliveryRequestReducer from '../reducers/deliveryRequest';
import priceComparatorSearchedReducer from '../reducers/priceComparatorSearched';
import feedbackReducer from '../reducers/feedback';
import viewFeedbackReducer from '../reducers/viewFeedback';
import priceComparisonReducer from '../reducers/priceComparison';

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
            sharedList: sharedListReducer,
            deliveryRequest: deliveryRequestReducer,
            priceComparatorSearched: priceComparatorSearchedReducer,
            feedback: feedbackReducer,
            viewFeedback: viewFeedbackReducer,
            priceComparison: priceComparisonReducer
        }),
        applyMiddleware(thunk)
    );
    return store;
}