import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

const Rating = props => {
    let stars = [];

    for (let i = 0; i < 5; i++) {
        if(i < props.rating) {
            stars.push(<IconButton icon='star' size={15} key={i} />);
        }
        else {
            stars.push(<IconButton icon='star-outline' size={15} key={i} />);
        }
    }

    return (
        <View style={styles.rating}>
            <View style={styles.ratingNumber}>
                <Text>{props.rating} stars</Text>
            </View>
            <View style={styles.stars}>
                {stars}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    rating: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    ratingNumber: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    stars: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Rating;