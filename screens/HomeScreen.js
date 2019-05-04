import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableHighlight
} from "react-native";
import { first_data_grid, word_to_found } from "../constants/GameDataGrid";
import { Button, TextField, FloatingActionButton } from "../components/Index";
import themeColor from "../constants/Colors";
import i18n from "../helpers/i18n";
import { playSoundAsync } from "../helpers/sounds";
import { strCompare, generateWord } from "../helpers/strOperation";
import { LinearGradient, WebBrowser } from "expo";

const numColumns = 10;
const dataArray = new Array(100);

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: i18n.t("home_title"),
      headerStyle: {
        backgroundColor: themeColor.lightSecondary
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };

  state = {
    wordToFound: word_to_found,
    remainingWord: 6,
    selectedLetter: []
  };

  render() {
    return (
      <LinearGradient
        colors={[themeColor.secondaryColor, themeColor.lighterSecondary]}
        style={styles.container}
      >
        <View
          style={{
            flex: 0.55,
            flexDirection: "row",
            backgroundColor: themeColor.lightSecondary
          }}
        >
          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <View
              style={{
                width: 150,
                height: 50,
                backgroundColor: themeColor.secondaryColor,
                borderRadius: 10,
                marginTop: 15.5
              }}
            >
              <TextField style={{ color: "white" }}>
                {i18n.t("home_remaining_word")}
              </TextField>
              <TextField style={{ color: "white" }}>
                {this.state.remainingWord}
              </TextField>
            </View>
          </View>
        </View>
        <FlatList
          data={first_data_grid}
          style={styles.flatListcontainer}
          renderItem={this._renderItem}
          numColumns={numColumns}
          keyExtractor={this._keyExtractor}
          scrollEnabled={false}
          extraData={this.state.selectedLetter}
        />

        <FloatingActionButton {...this.props} />
      </LinearGradient>
    );
  }

  _renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View key={index} style={[styles.item, styles.itemInvisible]} />;
    } else {
      return (
        <TouchableHighlight
          style={dataArray[index] == 1 ? styles.selectedItem : styles.item}
          key={index}
          onPress={() => this._onGridGamePress(item, index)}
        >
          <Text style={styles.itemText}>{item.key}</Text>
        </TouchableHighlight>
      );
    }
  };

  _onGridGamePress = (item, index) => {
    playSoundAsync();
    dataArray[index] =
      dataArray[index] === undefined || dataArray[index] === 0 ? 1 : 0;

    let itemDataObj = {
      key: item.key,
      index: index
    };

    this.setState(
      prevState => ({
        selectedLetter: [...prevState.selectedLetter, itemDataObj]
      }),
      () => {
        const { result, wordFound } = strCompare(
          generateWord(this.state.selectedLetter)
        );
        this._updateRemainingWordCount(wordFound);
      }
    );
  };

  _updateRemainingWordCount = wordFound => {
    this.setState(prevState => ({
      remainingWord: 6 - wordFound
    }));
  };

  _keyExtractor = (item, index) => index;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gameGridcontainer: {
    flex: 1
  },
  item: {
    backgroundColor: "#E4F0D0",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / numColumns // approximate a square
  },
  selectedItem: {
    backgroundColor: "#B1C5A9",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / numColumns // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent"
  },
  itemText: {
    color: "#738290"
  },
  flatListcontainer: {
    marginVertical: 20,
    marginRight: 12,
    marginLeft: 12
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "#FFF3E0",
    borderRadius: 3,
    paddingHorizontal: 4
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
    backgroundColor: "#FFF3E0"
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  }
});

export default HomeScreen;
