import React from "react";
import { Text, StyleSheet } from "react-native";

const TextField = ({ ...props }) => {
  return <Text style={[styles.text, props.style]}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    margin: 8,
    marginBottom: 0,
    color: "black",
    textAlign: "center",
    backgroundColor: "transparent"
  }
});

export { TextField };
