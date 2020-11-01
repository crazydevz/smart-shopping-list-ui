import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { connect } from 'react-redux';
import Container from '../components/Container';

const Loading = props => {
    // useEffect(() => {
    //     props.isAuthenticated && props.history.push(props.screenPath);
    // });

    return (
        <Container>
            <ActivityIndicator />
        </Container>
    );
};

// const mapStateToProps = state => {
//     return {
//         isAuthenticated: state.user.isAuthenticated
//     };
// };

export default connect()(Loading);