//flat list
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import firebase from "../database/firebaseDB";
const db = firebase.firestore().collection("histories");

import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";

export default function History({ route, navigation, props }) {
  //testing code
  //   db.doc("2Uk4qY4Df1kCTGQc6Gj7").update({
  //     Bill: 10.5,
  //     Delivery: 3.2,
  //     Discount: 3.2,
  //     Split: 2.2,
  //   });
  const { setBill, setDeliveryFee, setDiscount, setSplit } = route.params;
  const [bills, setBills] = useState([]);
  useEffect(() => {
    const unsubscribe = db.orderBy("created").onSnapshot((collection) => {
      // let's get back a snapshot of this collection
      const updatedBills = collection.docs.map((doc) => {
        //create our own object that pulls the ID into a property
        const noteObject = {
          ...doc.data(),
          id: doc.id,
        };
        //console.log(noteObject);
        return noteObject;
      });
      setBills(updatedBills); // and set our notes state array to its docs
    });

    //unsubscribing when unmounting
    return () => {
      unsubscribe();
    };
  }, []);

  function deleteNote(id) {
    console.log("Deleting " + id);
    db.doc(id).delete();
  }

  function editBill(id) {
    db.doc(id).update({ Bill: 13 });
  }

  // The function to render each row in our FlatList
  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#E87EA1",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onPress={() => {
          setBill(item.Bill);
          setSplit(item.Split);
          setDiscount(item.Discount);
          setDeliveryFee(item.Delivery);
        }}
      >
        <TouchableOpacity onPress={() => editBill(item.id)}>
          <Text>Bill: {item.Bill}</Text>
        </TouchableOpacity>
        <Text>Delivery fee: {item.Delivery}</Text>
        <Text>Discount: {item.Discount}</Text>
        <Text>Split: {item.Split}</Text>
        <Text>Doc: {item.Split}</Text>
        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Text>DELETE</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <>
      {/* {console.log("discount", route.params)} */}
      <View style={styles.container}>
        <StatusBar style="auto" />
        <FlatList
          data={bills}
          renderItem={renderItem}
          style={{ width: "100%" }}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Dismiss</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 5,
    margin: 10,
    marginTop: 30,
    width: 80,
  },
  buttonText: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
