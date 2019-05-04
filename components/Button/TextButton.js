import React from "react";
import { Text, TouchableHighlight } from "react-native";
import { Spinner } from "../Spinner/Spinner";

const TextButton = ({ onPress, buttonStyle, textStyle, loading, ...props }) => {
  if (loading === true) {
    return (
      <TouchableHighlight
        onPress={onPress}
        style={[styles.buttonStyle, buttonStyle]}
      >
        <Spinner />
      </TouchableHighlight>
    );
  } else {
    return (
      <TouchableHighlight
        onPress={onPress}
        style={[styles.buttonStyle, buttonStyle]}
      >
        <Text style={[styles.textStyle, textStyle]}>{props.children}</Text>
      </TouchableHighlight>
    );
  }
};

const styles = {
  textStyle: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    fontSize: 17,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 0,
    letterSpacing: -0.41
  },
  buttonStyle: {
    height: 44,
    alignSelf: "stretch",
    position: "relative",
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: "transparent"
  }
};

export { TextButton };
