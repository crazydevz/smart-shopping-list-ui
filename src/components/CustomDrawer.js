import React from 'react';
import { DrawerLayoutAndroid } from 'react-native';

import DrawerView from '../components/DrawerView';

const CustomDrawer = props => {
    // const drawerLayoutRef = React.useRef(null);

    // const openDrawer = () => {
    //     if(drawerLayoutRef){
    //         drawerLayoutRef.current.openDrawer();
    //     }
    // }
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