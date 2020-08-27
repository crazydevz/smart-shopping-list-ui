import React from 'react';
import { View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';

import SignupScreen from '../screens/Signup';
import SigninScreen from '../screens/Signin';
import ListsScreen from '../screens/Lists';
import ListItems from '../screens/ListItems';

const AppRouter = () => (
    <NativeRouter>
        <View style={{ flex: 1 }}>
            <Switch>
                <Route path='/' component={SignupScreen} exact />
                <Route path='/Signin' component={SigninScreen} />
                <Route path='/Lists' component={ListsScreen} />
                <Route path='/ListItems' component={ListItems} />
            </Switch>
        </View>
    </NativeRouter>
);

export default AppRouter;