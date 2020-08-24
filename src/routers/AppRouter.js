import React from 'react';
import { View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';

import SignupScreen from '../screens/Signup';
import SigninScreen from '../screens/Signin';
import ListsScreen from '../screens/Lists';

const AppRouter = () => (
    <NativeRouter>
        <View style={{ flex: 1 }}>
            <Switch>
                <Route path='/' component={SignupScreen} exact />
                <Route path='/Signin' component={SigninScreen} />
                <Route path='/Lists' component={ListsScreen} />
            </Switch>
        </View>
    </NativeRouter>
);

export default AppRouter;