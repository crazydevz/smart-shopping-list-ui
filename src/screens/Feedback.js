import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ScrollView,
} from "react-native";
import { Rating } from "react-native-ratings";
import { Appbar, TextInput } from "react-native-paper";
import { connect } from "react-redux";
import FeedbackAction from "../actions/feedback";

const Feedback = (props) => {
    let [getRates, setRates] = useState();
    let [comment, setComment] = useState("");

    return (
        <>
            <ScrollView>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => { props.history.push('/SharerOnMap') }} />
                    <Appbar.Content title='Provide Feedback' />
                </Appbar.Header>
                <View style={styles.personContainer}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{props.data.name}</Text>
                    </View>
                </View>
                <View style={styles.ratingCard}>
                    <Rating
                        showRating
                        onFinishRating={(rate) => setRates(rate)}
                        style={{ paddingVertical: 10 }}
                    />
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.inpText}
                        selectionColor="blue"
                        multiline={true}
                        label=" Enter Comment"
                        value={comment}
                        onChangeText={(text) => setComment(text)}
                    />
                </View>
                <View style={styles.btnTopContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            props.addFeedback({
                                rates: getRates,
                                comment: comment,
                            });
                            props.history.push('/SharerOnMap');
                        }}
                    >
                        <View style={styles.btnContainer}>
                            <Text style={styles.btnText}>Post</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};
let styles = StyleSheet.create({
    personContainer: {
        marginTop: "5%",
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        width: "40%",
    },
    nameContainer: {
        textAlign: 'center'
    },
    img: {
        width: "70%",
        height: 100,
        borderRadius: 100,
    },
    name: {
        fontSize: 18,
        marginRight: "30%",
    },
    ratingCard: {
        margin: "2%",
        width: "80%",
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },

    formContainer: {
        marginVertical: "2%",
        justifyContent: "center",
        alignItems: "center",
    },
    inpText: {
        width: "80%",
        height: 200,
    },
    btnTopContainer: {
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginVertical: "5%",
    },
    btnContainer: {
        backgroundColor: "#000080",
        borderRadius: 20,
        width: 120,
        height: 50,
        justifyContent: "center",
    },
    btnText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
});

const mapStateToProp = (state) => ({
    data: state.feedback,
});
const mapDispatchToProps = (dispatch) => {
    return {
        addFeedback: (item) => {
            dispatch(FeedbackAction(item));
        },
    };
};
export default connect(mapStateToProp, mapDispatchToProps)(Feedback);
