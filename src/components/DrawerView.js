import React, { useState } from 'react';
import { View } from 'react-native';
import { Drawer } from 'react-native-paper';
import { withRouter } from 'react-router-native';

const DrawerView = props => {
    const [isActive, setIsActive] = useState('');

    const handleGoToMyLists = () => {
        setIsActive('myLists');
        props.history.push('/Lists');
    };

    const handleGoToIncomingLists = () => {
        setIsActive('incomingLists');
        props.history.push('/IncomingLists');
    };

    const handleGoToOutgoingLists = () => {
        setIsActive('outgoingLists');
        props.history.push('/OutgoingLists');
    };

    const handleGoToReceivedLists = () => {
        setIsActive('receivedLists');
        props.history.push('/ReceivedLists');
    };

    const handleGoToSharedLists = () => {
        setIsActive('sharedLists');
        props.history.push('/SharedLists');
    };

    // const handleGoToShareeOnMap = () => {
    //     setIsActive('shareeOnMap');
    //     props.history.push('/ShareeOnMap');
    // };

    // const handleGoToSharerOnMap = () => {
    //     setIsActive('sharerOnMap');
    //     props.history.push('/SharerOnMap');
    // };
    
    // const handleGoToDeliveryRequests = () => {
    //     setIsActive('deliveryRequests');
    //     props.history.push('/DeliveryRequests');
    // };

    const handleGoToDelivery = () => {
        setIsActive('delivery');
        props.history.push('/Delivery');
    };

    const handleGoToPriceComparator = () => {
        setIsActive('priceComparator');
        props.history.push('/PriceComparator');
    };

    return (
        <View style={{ flex: 1, width: '100%', marginTop: 80 }}>
            <Drawer.Item
                label="My Lists"
                active={isActive === 'myLists'}
                onPress={handleGoToMyLists}
            />
            <Drawer.Section title="List Share Requests">
                <Drawer.Item
                    label="Incoming Requests"
                    active={isActive === 'incomingLists'}
                    onPress={handleGoToIncomingLists}
                />
                <Drawer.Item
                    label="Outgoing Requests"
                    active={isActive === 'outgoingLists'}
                    onPress={handleGoToOutgoingLists}
                />
            </Drawer.Section>
            <Drawer.Section title='Shared Lists'>
                <Drawer.Item
                    label="Shared With Me"
                    active={isActive === 'receivedLists'}
                    onPress={handleGoToReceivedLists}
                />
                <Drawer.Item
                    label="Shared By Me"
                    active={isActive === 'sharedLists'}
                    onPress={handleGoToSharedLists}
                />
            </Drawer.Section>
            <Drawer.Section title='List Delivery'>
                {/* <Drawer.Item
                    label="Sharees On Map"
                    active={isActive === 'shareeOnMap'}
                    onPress={handleGoToShareeOnMap}
                /> */}
                {/* <Drawer.Item
                    label="Sharer On Map"
                    active={isActive === 'sharerOnMap'}
                    onPress={handleGoToSharerOnMap}
                /> */}
                {/* <Drawer.Item
                    label="Delivery Requests"
                    active={isActive === 'deliveryRequests'}
                    onPress={handleGoToDeliveryRequests}
                /> */}
                <Drawer.Item
                    label="Delivery"
                    active={isActive === 'delivery'}
                    onPress={handleGoToDelivery}
                />
            </Drawer.Section>
            <Drawer.Section title='Other'>
                <Drawer.Item
                    label="Price Comparator"
                    active={isActive === 'priceComparator'}
                    onPress={handleGoToPriceComparator}
                />
            </Drawer.Section>
        </View>
    );
};

export default withRouter(DrawerView);