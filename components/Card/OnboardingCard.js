import React from "react";
import { View, Dimensions } from "react-native";
import { LinearGradient } from "expo";
import { TextField } from "../TextField/TextField";
import { StyleSheet } from "react-native";
import themeColor from "../../constants/Colors";

const { width, height } = Dimensions.get("window");

const OnboardingCard = ({ text, ...props }) => {
  return (
    <LinearGradient
      colors={[themeColor.secondaryColor, themeColor.primaryColor]}
      style={styles.container}
    >
      <View style={styles.children}>
        <TextField style={[styles.textStyle, props.style]}>{text}</TextField>
        {props.children}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    height,
    width,
    justifyContent: "flex-end",
    alignItems: "stretch"
  },
  children: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 17,
    paddingTop: 10,
    paddingBottom: 10,
    letterSpacing: -0.41
  }
});

export { OnboardingCard };
