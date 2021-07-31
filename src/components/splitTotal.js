import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  textOutput: {
    fontSize: 30,
    color: "#000000",
  },
});

const SplitTotal = ({ splitTotal }) => {
  return (
    <View>
      <Text style={styles.textHeader}>Split total</Text>
      <Text style={styles.textOutput}>{splitTotal}</Text>
    </View>
  );
};

export default SplitTotal;
