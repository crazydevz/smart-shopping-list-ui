import React, { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Appbar } from 'react-native-paper';
import { connect } from 'react-redux';

import Container from '../components/Container';

// import { Container } from './styles';

const PriceComparatorSearched = props => {
    //   let {navigation} =props;

    const Views = (item) => (
        // <TouchableOpacity onPress={()=>navigation.navigate("FareCalculatorScreen")}>
        <TouchableOpacity>
            <View style={styles.card}>
                <View style={styles.verText}>
                    {/* <Text style={styles.brandText}>{item.brandName}</Text> */}
                    <Text style={styles.brandText}>{item.store}</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.mobileName}>
                        {/* <Text style={styles.mobile}>{item.mobile}</Text> */}
                        <Text style={styles.mobile}>{item.name}</Text>
                    </View>
                    {/* <View style={styles.innerContainer}> */}
                        {/* <View style={styles.imageContainer}>
                            <Image
                                style={styles.img}
                                source={require("../../utilities/mobile.jpg")}
                            />
                        </View> */}
                        <Container>
                            <View style={styles.priceContainer}>
                                {/* <Text style={styles.txt}>Price {item.price}</Text> */}
                                <Text style={styles.txt}>Price {item.price}</Text>
                                {/* <Text style={styles.txt}>Save {item.save}</Text> */}
                                <Text style={styles.txt}>Save {item.discount}</Text>
                            </View>
                        </Container>
                    {/* </View> */}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {props.history.push('/PriceComparator')}} />
                <Appbar.Content title='Compared Prices' />
            </Appbar.Header>
            <FlatList
                keyExtractor={(item) => {item.index}}
                data={props.loadedPriceComparisons}
                renderItem={({ item }) => Views(item)}
            />
        </SafeAreaView>
    );
};
let styles = StyleSheet.create({
    card: {
        flex: 1,
        borderColor: "gray",
        borderWidth: 0.2,
        margin: "1%",
        marginBottom: "2%",
        height: 220,
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
        alignItems: "center",
    },
    verText: {
        flex: 1,
        height: "100%",
        backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center",
    },
    brandText: {
        transform: [{ rotateZ: "-90deg" }],
        color: "white",
        width: "100%",

        textTransform: "uppercase",
        // fontFamily:"Roboto-Light",
        fontSize: 10
    },
    container: {
        height: "100%",
        width: "85%",
    },
    mobileName: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    mobile: {
        marginTop: "1%",
        fontSize: 18,
        textAlign: "center",
        textTransform: "uppercase",
        // fontFamily:"Roboto-Light"
    },
    innerContainer: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    imageContainer: {
        width: "40%",
        height: "90%",
    },
    img: {
        width: "100%",
        height: "100%",
    },
    priceContainer: {
        marginRight: "15%",
    },
    txt: {
        marginVertical: "5%",
        textTransform: "capitalize",
        fontSize: 16,
        // fontFamily:"Roboto-Light"
    },
});

//code for redux
// const mapStateToProps = (state) => ({
//       data: state.priceComparatorSearched
// });

const mapStateToProps = state => {
  return {
    loadedPriceComparisons: state.priceComparison.loadedComparisons
  };
};

export default connect(mapStateToProps)(PriceComparatorSearched);
  