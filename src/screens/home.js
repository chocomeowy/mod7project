import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from "react-native";
import firebase from "../database/firebaseDB";
const db = firebase.firestore().collection("histories");
import Input from "../components/input";
import SplitOutput from "../containers/splitOutput";

const Home = ({ navigation }) => {
  const [bill, setBill] = useState("20.00");
  const [deliveryFee, setDeliveryFee] = useState("3.30");
  const [totalDiscounted, setTotalDiscounted] = useState("10");
  const [discount, setDiscount] = useState("2");
  const [split, setSplit] = useState("2");
  const [splitTotal, setSplitTotal] = useState("0.00");

  useEffect(() => {
    const total = parseFloat(bill);
    const delFee = parseFloat(deliveryFee);
    const discountAmt = parseFloat(discount);
    const splitCount = parseInt(split);

    const splitTotal = ((total - discountAmt + delFee) / splitCount).toFixed(2);

    setSplitTotal(splitTotal.toString());
  }, [bill, discount, split, deliveryFee]);

  const handleBillChange = (value) => {
    setBill(value);
  };
  const handleDeliveryFeeChange = (value) => {
    setDeliveryFee(value);
  };
  const handleTipChange = (value) => {
    setDiscount(value);
  };
  const handleTotal = (value) => {
    setTotalDiscounted(value);
  };
  const handleSplitAdd = () => {
    setSplit((split) => {
      const total = parseInt(split) + 1;
      return total.toString();
    });
  };
  const handleSplitRemove = () => {
    setSplit((split) => {
      const total = parseInt(split) - 1;
      return total.toString();
    });
  };

  const handleHistory = () => {
    navigation.navigate("History", {
      setBill: setBill,
      setDeliveryFee: setDeliveryFee,
      setDiscount: setDiscount,
      setSplit: setSplit,
    });
  };

  const handleSaving = () => {
    const newSave = {
      Bill: bill,
      Delivery: deliveryFee,
      Discount: discount,
      Split: split,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    };
    db.add(newSave);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Input
          label="Bill Food Value"
          amount={bill}
          handleTextChange={handleBillChange}
        />
        <Input
          label="Delivery Fee"
          amount={deliveryFee}
          handleTextChange={handleDeliveryFeeChange}
        />
        {/* <Input
        label="Total after discount"
        amount={totalDiscounted}
        handleTextChange={handleTotal}
      /> */}
        <Input
          label="Discount"
          amount={discount}
          handleTextChange={handleTipChange}
        />
        <SplitOutput
          split={split}
          splitTotal={splitTotal}
          handleSplitAdd={handleSplitAdd}
          handleSplitRemove={handleSplitRemove}
        />
        <TouchableOpacity onPress={handleHistory} style={styles.button}>
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSaving}>
          <Text style={styles.buttonText}>Save to History</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 30,
  },
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
});
