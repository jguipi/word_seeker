import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Platform
} from "react-native";
import {
  Dot,
  DotContainer,
  TextButton,
  OnboardingCard,
  TextField
} from "../components/Index";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import i18n from "../helpers/i18n";

const PAGE_INDEX = [0, 1, 2];
const EVENT_THROTTLE = 16;

class OnboardingScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    activePageIndex: 0
  };

  render() {
    const { activePageIndex } = this.state;
    const { navigation } = this.props;
    return (
      <View>
        <StatusBar barStyle="light-content" />
        <View style={{ position: "absolute" }}>
          <ScrollView
            pagingEnabled={true}
            horizontal={true}
            onScroll={this._handleScroll}
            scrollEventThrottle={EVENT_THROTTLE}
          >
            {this._renderOnboarding()}
          </ScrollView>
          <View style={styles.tabBarInfoContainer}>
            <View style={styles.bottomSectionContainer}>
              <View style={styles.container} />
              <View style={styles.container}>
                <DotContainer>
                  <Dot active={activePageIndex === 0} />
                  <Dot active={activePageIndex === 1} />
                  <Dot active={activePageIndex === 2} />
                </DotContainer>
              </View>
              <View style={styles.container}>
                {this._renderTextButton(activePageIndex, navigation)}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  _handleScroll = event => {
    let offSet = event.nativeEvent.contentOffset.x;
    if (offSet > 400 && offSet < 800) {
      this._handleActiveDotChange(1);
    } else if (offSet > 800) {
      this._handleActiveDotChange(2);
    } else {
      this._handleActiveDotChange(0);
    }
  };

  _handleActiveDotChange(index) {
    this.setState({ activePageIndex: index });
  }

  _renderTextButton(activePageIndex, navigation) {
    if (activePageIndex === 2) {
      return (
        <TextButton
          textStyle={{ color: "white" }}
          onPress={() => navigation.navigate("Main")}
        >
          {i18n.t("continue")}
        </TextButton>
      );
    } else {
      return (
        <TextButton
          textStyle={{ color: "white" }}
          onPress={() => navigation.navigate("Main")}
        >
          {i18n.t("skip")}
        </TextButton>
      );
    }
  }

  _renderOnboarding = () => {
    return PAGE_INDEX.map(index => {
      if (index === 0) {
        return (
          <OnboardingCard
            key={index}
            text={i18n.t("welcome")}
            {...this.props}
          />
        );
      } else if (index === 1) {
        return (
          <OnboardingCard
            key={index}
            text={i18n.t("info_text")}
            {...this.props}
          />
        );
      } else {
        return (
          <OnboardingCard
            key={index}
            text="Use the button to navigate through the app"
            {...this.props}
          >
            <MaterialIcons name="replay" style={styles.actionButtonIcon} />
            <TextField>{i18n.t("info_text_2")}</TextField>
            <MaterialIcons name="skip-next" style={styles.actionButtonIcon} />
            <TextField>{i18n.t("info_text_3")}</TextField>
            <Ionicons
              name="ios-help-circle-outline"
              style={styles.actionButtonIcon}
            />
            <TextField>{i18n.t("info_text_4")}</TextField>
            <Ionicons name="ios-settings" style={styles.actionButtonIcon} />
            <TextField>{i18n.t("info_text_5")}</TextField>
            <TextField>{i18n.t("info_text_6")}</TextField>
          </OnboardingCard>
        );
      }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomSectionContainer: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#738290",
    alignItems: "center",
    justifyContent: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb"
  }
});

export default OnboardingScreen;
