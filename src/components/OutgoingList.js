import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Surface, Text } from 'react-native-paper';
import { withRouter } from 'react-router-native';

const OutgoingList = props => {

    return (
        <Surface style={styles.listContainer}>
            <View style={styles.listInfo}>
                <View style={styles.listName}>
                    <Text>{props.listVal.listName}</Text>
                </View>
                <View style={styles.creatorUsername}>
                    <Text>To {props.listVal.shareeUsername}</Text>
                </View>
            </View>
            <View style={styles.options}>
                <IconButton
                    icon="eye"
                    size={20}
                    onPress={() => props.history.push(
                        {
                            pathname: '/ListItems',
                            state: {
                                listType: 'outgoingList',
                                listKey: props.listKey,
                                listName: props.listVal.listName,
                                listItems: props.listVal.listItems,
                                shareeUsername: props.listVal.shareeUsername,
                                onUnshareList: props.onUnshareList
                            }
                        }
                    )}
                />
            </View>
        </Surface>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 8,
        marginVertical: 5,
        height: 70,
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        elevation: 4,
    },
    listInfo: {
        height: '100%',
        flex: 4,
        flexDirection: 'row',
    },
    listName: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 2,
    },
    creatorUsername: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
    },
    options: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});

export default withRouter(OutgoingList);