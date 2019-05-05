import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import themeColor from "../../constants/Colors";
import { Spinner } from "../Spinner/Spinner";

const Button = ({ onPress, children, buttonStyle, textStyle }) => {
  if (loading === true) {
    return (
      <TouchableHighlight onPress={onPress} style={[styles.buttonStyle, buttonStyle]}>
        <Spinner />
      </TouchableHighlight>
    );
  } else {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, buttonStyle]}>
        <Text style={[styles.textStyle, textStyle]}>{children}</Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "#007aff",
    fontSize: 17,
    paddingTop: 10,
    paddingBottom: 10,
    letterSpacing: -0.41
  },
  buttonStyle: {
    width: "100%",
    height: 44,
    alignSelf: "stretch",
    position: "relative",
    backgroundColor: themeColor.lightSecondary,
    borderColor: "black",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#FFFFFF"
  }
});

export { Button };
