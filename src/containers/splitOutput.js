import React from "react";
import { StyleSheet, View } from "react-native";

import SplitCount from "../components/splitCount";
import SplitTotal from "../components/splitTotal";

const styles = StyleSheet.create({
  sectionOutput: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#192E7A",
    borderRadius: 10,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
});

const SplitOutput = ({
  split,
  handleSplitAdd,
  handleSplitRemove,
  splitTotal,
}) => {
  return (
    <View>
      <SplitCount
        split={split}
        handleSplitAdd={handleSplitAdd}
        handleSplitRemove={handleSplitRemove}
      />
      <SplitTotal splitTotal={splitTotal} />
    </View>
  );
};

export default SplitOutput;
