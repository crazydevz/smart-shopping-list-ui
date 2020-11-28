import React, { useState } from 'react';
import { View } from 'react-native';
import {Divider, IconButton, Menu } from 'react-native-paper';
import { Platform } from 'react-native';

import Container from '../components/Container';

const MORE_ICON = Platform.OS === 'android' ? 'dots-vertical' : 'dots-horizontal';

const TestPage = (props) => {
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Container>
            <View
                style={{
                    paddingTop: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<IconButton icon={MORE_ICON} color='red' size={20} onPress={openMenu} />}>
                    <Menu.Item onPress={() => { }} title="Item 1" />
                    <Menu.Item onPress={() => { }} title="Item 2" />
                    <Divider />
                    <Menu.Item onPress={() => { }} title="Item 3" />
                </Menu>
            </View>
        </Container>
    );
};

export default TestPage;