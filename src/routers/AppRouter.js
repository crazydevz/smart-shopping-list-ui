import React from 'react';
import { NativeRouter, Switch, Route } from 'react-router-native';

import SignupScreen from '../screens/Signup';
import SigninScreen from '../screens/Signin';
import ListsScreen from '../screens/Lists';
import ListItemsScreen from '../screens/ListItems';
import IncomingListsScreen from '../screens/IncomingLists';
import IncomingListItemsScreen from '../screens/IncomingListItems';
import OutgoingListsScreen from '../screens/OutgoingLists';
import OutgoingListItemsScreen from '../screens/OutgoingListItems';
import ReceivedListsScreen from '../screens/ReceivedLists';
import ReceivedListItemsScreen from '../screens/ReceivedListItems';
import SharedListsScreen from '../screens/SharedLists';
import SharedListItemsScreen from '../screens/SharedListItems';
import DeliveryScreen from '../screens/Delivery';
// import DeliveryRequestsScreen from '../screens/DeliveryRequests';
import DeliveryRequestContentsScreen from '../screens/DeliveryRequestContents';
import ShareeOnMapScreen from '../screens/ShareeOnMap';
import SharerOnMapScreen from '../screens/SharerOnMap';
import PriceComparatorScreen from '../screens/PriceComparator';
import PriceComparatorSearchedScreen from '../screens/PriceComparatorSearched';
import FeedbackScreen from '../screens/Feedback';
import ViewFeedbackScreen from '../screens/ViewFeedback';
import UserProfileScreen from '../screens/UserProfile';

const AppRouter = () => (
    <NativeRouter>
        <Switch>
            <Route path='/' component={SignupScreen} exact />
            <Route path='/Signin' component={SigninScreen} />
            <Route path='/Lists' component={ListsScreen} />
            <Route path='/ListItems' component={ListItemsScreen} />
            <Route path='/IncomingLists' component={IncomingListsScreen} />
            <Route path='/IncomingListItems' component={IncomingListItemsScreen} />
            <Route path='/OutgoingLists' component={OutgoingListsScreen} />
            <Route path='/OutgoingListItems' component={OutgoingListItemsScreen} />
            <Route path='/ReceivedLists' component={ReceivedListsScreen} />
            <Route path='/ReceivedListItems' component={ReceivedListItemsScreen} />
            <Route path='/SharedLists' component={SharedListsScreen} />
            <Route path='/SharedListItems' component={SharedListItemsScreen} />
            <Route path='/Delivery' component={DeliveryScreen} />
            {/* <Route path='/DeliveryRequests' component={DeliveryRequestsScreen} /> */}
            <Route path='/DeliveryRequestContents' component={DeliveryRequestContentsScreen} />
            <Route path='/ShareeOnMap' component={ShareeOnMapScreen} />
            <Route path='/SharerOnMap' component={SharerOnMapScreen} />
            <Route path='/PriceComparator' component={PriceComparatorScreen} />
            <Route path='/PriceComparatorSearched' component={PriceComparatorSearchedScreen} />
            <Route path='/Feedback' component={FeedbackScreen} />
            <Route path='/ViewFeedback' component={ViewFeedbackScreen} />
            <Route path='/UserProfile' component={UserProfileScreen} />
        </Switch>
    </NativeRouter>
);

export default AppRouter;