import React, { useState } from 'react';
import { View } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import { Platform } from 'react-native';

const MORE_ICON = Platform.OS === 'android' ? 'dots-vertical' : 'dots-horizontal';

const OutgoingListItemsMore = (props) => {
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleCancelShareList = () => {
        closeMenu();
        props.onCancelShareList();
    };

    return (
        <View>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<IconButton icon={MORE_ICON} color='white' size={20} onPress={openMenu} />}
            >
                <Menu.Item onPress={handleCancelShareList} title="Cancel Request" />
            </Menu>
        </View>
    );
};

export default OutgoingListItemsMore;