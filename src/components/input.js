import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const styles = StyleSheet.create({
  section: {
    padding: 10,
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    color: "#616161",
    letterSpacing: 1.5,
    fontWeight: "700",
  },
  textInput: {
    fontSize: 30,
  },
});

const Input = ({ label, amount, placeholderText, handleTextChange }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.titleText}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholder={placeholderText}
          value={amount}
          onChangeText={handleTextChange}
        />
        {label === "Tip" ? <Text style={styles.textInput}>%</Text> : null}
      </View>
    </View>
  );
};

export default Input;
