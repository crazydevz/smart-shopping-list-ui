import React, { useState } from 'react';
import { Drawer } from 'react-native-paper';
import { withRouter } from 'react-router-native';

const DrawerView = props => {
    const [isActive, setIsActive] = useState('');

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

    return (
        <Drawer.Section style={{marginTop: 50}} title="Some title">
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
    );
};

export default withRouter(DrawerView);