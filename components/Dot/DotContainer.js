import React from "react";
import { StyleSheet, View } from "react-native";

const DotContainer = ({ ...props }) => {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.dotsContainer}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  dotsContainer: {
    width: 80,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export { DotContainer };
