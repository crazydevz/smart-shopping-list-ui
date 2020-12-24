import React, { useState } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import Container from '../components/Container';
import CustomDrawer from '../components/CustomDrawer';
import DeliveryRequestsScreen from '../screens/DeliveryRequests';

// const MusicRoute = () => <Container><Text>Delivery Requests</Text></Container>;

const AlbumsRoute = () => <Container><Text>Delivery In Progress</Text></Container>;

const HistoryRoute = () => <Container><Text>Delivery History</Text></Container>;

const Delivery = props => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'deliveryRequests', title: 'Requests', icon: 'music' },
        { key: 'deliveryInProgress', title: 'In Progress', icon: 'album' },
        { key: 'deliveryHistory', title: 'History', icon: 'history' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        deliveryRequests: DeliveryRequestsScreen,
        deliveryInProgress: AlbumsRoute,
        deliveryHistory: HistoryRoute,
    });

    return (
        <CustomDrawer>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        </CustomDrawer>
    );
};

export default Delivery;