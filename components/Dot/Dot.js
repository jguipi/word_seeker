import React from "react";
import { StyleSheet, View } from "react-native";

const Dot = ({ active }) => {
  let currentStyle = active ? styles.dotActive : styles.dotInactive;
  return <View style={[styles.dot, currentStyle]} />;
};

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  dotActive: {
    backgroundColor: "#FC3768"
  },
  dotInactive: {
    backgroundColor: "#D2D2D4"
  }
});

export { Dot };
