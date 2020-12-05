import React, { useState } from 'react';
import { View } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import { Platform } from 'react-native';

const MORE_ICON = Platform.OS === 'android' ? 'dots-vertical' : 'dots-horizontal';

const SharedListItemsMore = (props) => {
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleUnshareList = () => {
        closeMenu();
        props.onUnshareList();
    };

    return (
        <View>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<IconButton icon={MORE_ICON} color='white' size={20} onPress={openMenu} />}
            >
                <Menu.Item onPress={handleUnshareList} title="Unshare" />
            </Menu>
        </View>
    );
};

export default SharedListItemsMore;