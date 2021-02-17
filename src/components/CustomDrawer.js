import React from 'react';
import { DrawerLayoutAndroid } from 'react-native';

import DrawerView from '../components/DrawerView';

const CustomDrawer = props => {
    return (
        <DrawerLayoutAndroid
            drawerWidth={300}
            drawerPosition={'left'}
            renderNavigationView={() => <DrawerView />}
        >
            {props.children}
        </DrawerLayoutAndroid>
    );
};

export default CustomDrawer;