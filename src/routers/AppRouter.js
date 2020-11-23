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
// import TestScreen from '../screens/TestScreen';

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
        </Switch>
    </NativeRouter>
);

export default AppRouter;