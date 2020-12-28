import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Appbar, TextInput } from "react-native-paper";
import { connect } from "react-redux";
// import PriceComparatorAction from '../Services/Actions/PriceComparatorAction.js'

// import { Container } from './styles';
import CustomDrawer from '../components/CustomDrawer';
import { loadPriceComparisons } from '../actions/priceComparison';

const PriceComparatorScreen = (props) => {
  let [word, setWord] = useState("");

  const handleLoadPriceComparisons = () => {
    (async () => {
      await props.dispatch(loadPriceComparisons(word));
      props.history.push('/PriceComparatorSearched');
    })();
  };

  return (
    // <View>
    <CustomDrawer>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => {props.history.push('/Lists')}} />
        <Appbar.Content title='Price Comaparator' />
      </Appbar.Header>
      <View style={styles.container}>
        <TextInput
          style={styles.txtInput}
          label="Enter Item"
          selectionColor="blue"
          onChangeText={(text) => setWord(text)}
          value={word}
        />
        <View style={styles.wrapper}>
          <TouchableOpacity style={styles.touchOp} onPress={handleLoadPriceComparisons}>
            <View style={styles.txtContainer}>
              <Text style={styles.searchText}>Search</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </CustomDrawer>
    // </View>
  );
};

let styles = StyleSheet.create({
  container: {
    width: "80%",
    alignSelf: "center",
    height: "60%",
    marginVertical: "25%",
    borderRadius: 20,
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  txtInput: {
    width: "80%",
  },
  wrapper: {
    height: "15%",
    width: "90%",
    alignItems: "center",
  },
  touchOp: {
    width: "40%",
    height: "90%",
  },
  txtContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    borderRadius: 10,
    backgroundColor: "#000080",
    height: "100%",
    justifyContent: "center",
  },
  searchText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    // fontFamily:"Roboto-Light"
  },
});

export default connect()(PriceComparatorScreen); //connect(mapStateToProp,mapDispatchToProps)(PriceComparatorScreen);
