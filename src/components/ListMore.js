import React, { useState } from 'react';
import { View } from 'react-native';
import {Divider, IconButton, Menu } from 'react-native-paper';
import { Platform } from 'react-native';

const MORE_ICON = Platform.OS === 'android' ? 'dots-vertical' : 'dots-horizontal';

const ListMore = (props) => {
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleShareList = () => {
        closeMenu();
        props.onShareList();
    };

    const handleDeleteList = () => {
        closeMenu();
        props.onDeleteList();
    };

    // const handleShareListNearby = () => {
    //     closeMenu();
    //     props.onShareListNearby(props.listKey);
    // };

    return (
        <View>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<IconButton icon={MORE_ICON} size={20} onPress={openMenu} />}
            >
                <Menu.Item onPress={handleDeleteList} title="Delete" />
                <Divider />
                <Menu.Item onPress={handleShareList} title="Share" />
                {/* <Menu.Item onPress={handleShareListNearby} title="Request Delivery" /> */}
            </Menu>
        </View>
    );
};

export default ListMore;