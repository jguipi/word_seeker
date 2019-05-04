import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { LinearGradient, WebBrowser } from "expo";
import themeColor from "../constants/Colors";
import { TextField } from "../components/Index";
import i18n from "../helpers/i18n";
import { sendSMS } from "../helpers/others";

export default class SettingsScreen extends React.Component {
  state = {
    result: null
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: i18n.t("settings_title"),
      headerStyle: {
        backgroundColor: themeColor.lightSecondary
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };

  render() {
    return (
      <LinearGradient
        colors={[themeColor.secondaryColor, themeColor.thirdColor]}
        style={styles.container}
      >
        <View style={styles.subContainer}>
          <View style={styles.item}>
            {this._renderItemContent(
              i18n.t("language"),
              i18n.locale,
              false,
              this._changeLanguage
            )}
          </View>
          <View style={styles.item}>
            {this._renderItemContent(i18n.t("game_played"), 6)}
          </View>
        </View>

        <View style={styles.subContainer}>
          <View style={styles.item}>
            {this._renderItemContent(
              i18n.t("invite_a_friend"),
              i18n.t("git_text"),
              false,
              () => sendSMS()
            )}
          </View>
          <View style={styles.item}>
            {this._renderItemContent(
              i18n.t("git_repo"),
              i18n.t("git_text"),
              false,
              this._handleGitButtonPressAsync
            )}
          </View>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.item}>
            {this._renderItemContent(i18n.t("creator"), "Juste G.")}
          </View>
          <View style={styles.item}>
            {this._renderItemContent(
              i18n.t("made_for"),
              "Shopify",
              false,
              this._handleForShopifyButtonPressAsync
            )}
          </View>
        </View>
        <View style={[styles.item, { flex: 0.4 }]}>
          {this._renderItemContent(i18n.t("version"), "1.0.0", true)}
        </View>
        <View style={{ height: 0 }}>
          <TextField>
            {this.state.result && JSON.stringify(this.state.result)}
          </TextField>
        </View>
      </LinearGradient>
    );
  }

  _changeLanguage = () => {
    if (i18n.locale == "fr") {
      i18n.locale = "en";
    } else {
      i18n.locale = "fr";
    }
    this.forceUpdate();
  };

  _renderItemContent = (
    sectionName,
    value,
    lastItem = false,
    onPress = null
  ) => {
    if (lastItem) {
      return (
        <TouchableOpacity style={styles.lastItem} onPress={onPress}>
          <TextField style={styles.itemMainText}>{sectionName}</TextField>
          <TextField style={styles.itemSecondaryText}>{value}</TextField>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={onPress}>
          <TextField style={styles.itemMainText}>{sectionName}</TextField>
          <TextField style={styles.itemSecondaryText}>{value}</TextField>
        </TouchableOpacity>
      );
    }
  };

  _handleGitButtonPressAsync = async () => {
    this._accessWebpage("https://expo.io");
  };

  _handleForShopifyButtonPressAsync = async () => {
    this._accessWebpage(
      "https://fr.shopify.ca/carrieres/stage-en-developpement-mobile-sur-ios-automne-2019-fr-7ed9bd"
    );
  };

  _accessWebpage = async link => {
    let result = await WebBrowser.openBrowserAsync(link);
    this.setState({ result });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
  subContainer: {
    flex: 1,
    flexDirection: "row"
  },
  item: {
    backgroundColor: "#A1B5D8",
    opacity: 0.55,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1
  },
  lastItem: {
    backgroundColor: "#A1B5D8",
    opacity: 0.55,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1
  },
  itemMainText: {
    color: themeColor.thirdColor,
    fontWeight: "bold",
    fontSize: 14
  },
  itemSecondaryText: {
    color: themeColor.thirdColor,
    fontWeight: "bold",
    fontSize: 16
  }
});
