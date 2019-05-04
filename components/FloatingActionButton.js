import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ActionButton from "react-native-circular-action-menu";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import themeColor from "../constants/Colors";

const FloatingActionButton = (props) => {
  const {navigate} = props.navigation
    return (
      <View style={styles.container}>
        <ActionButton buttonColor={themeColor.primaryColor}>
          <ActionButton.Item buttonColor={themeColor.fifthColor} title="Notifications" onPress={() => {}}>
            <MaterialIcons name="replay" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor={themeColor.fifthColor} title="Notifications" onPress={() => {}}>
            <MaterialIcons name="skip-next" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor={themeColor.fifthColor} title="Notifications" onPress={() => navigate("Onboarding")}>
            <Ionicons name="ios-help-circle-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor={themeColor.fifthColor} title="All Tasks" onPress={() => navigate("Settings")}>
            <Ionicons name="ios-settings" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export {FloatingActionButton}