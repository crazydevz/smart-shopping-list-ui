import React, { useEffect } from 'react';

import { View, ActivityIndicator } from 'react-native';

const Loading = props => (
    <View style={styles.container}>
        <ActivityIndicator />
    </View>
);

useEffect(() => {
    !props.isLoading && props.history.push('/Lists');
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
})