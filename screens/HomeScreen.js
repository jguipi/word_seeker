import React from "react";
import { Platform, StyleSheet, View, FlatList, Dimensions, TouchableHighlight } from "react-native";
import { first_data_grid, second_data_grid } from "../constants/GameDataGrid";
import { TextField, FloatingActionButton } from "../components/Index";
import themeColor from "../constants/Colors";
import i18n from "../helpers/i18n";
import { playSoundAsync } from "../helpers/sounds";
import { strCompare, generateWord, verifyGameGridWord } from "../helpers/gameOperation";
import { LinearGradient, WebBrowser } from "expo";
import { DangerZone } from "expo";
import { setSecureItem } from "../helpers/asyncStorage";
import { updateGamePlayed } from "../helpers/others";
let { Lottie } = DangerZone;

const COLUMN_NUMBER = 10;
var gameGridDatatArray = new Array(100);

const INITIAL_STATE = {
  currentGameGrid: first_data_grid,
  remainingWord: verifyGameGridWord(gameGridDatatArray),
  selectedLetter: [],
  animation: null
};

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: i18n.t("home_title"),
      headerStyle: {
        backgroundColor: themeColor.lightSecondary
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };

  state = INITIAL_STATE;

  render() {
    return (
      <LinearGradient
        colors={[themeColor.secondaryColor, themeColor.lighterSecondary]}
        style={styles.container}
      >
        <View style={styles.rowContainer}>
          <View style={styles.rowSubContainer}>
            <View style={styles.remainingWordContainer}>
              <TextField style={styles.textColor}>{i18n.t("home_remaining_word")}</TextField>
              <TextField style={styles.textColor}>{this.state.remainingWord}</TextField>
            </View>
          </View>
        </View>
        <FlatList
          data={this.state.currentGameGrid}
          style={styles.flatListcontainer}
          renderItem={this._renderItem}
          numColumns={COLUMN_NUMBER}
          keyExtractor={this._keyExtractor}
          scrollEnabled={false}
          extraData={this.state.selectedLetter}
        />
        <FloatingActionButton
          {...this.props}
          reloadDataGrid={() => this._reloadDataGrid()}
          changeDataGrid={() => this._changeDataGrid()}
        />
        <View style={styles.animationContainer}>
          {this.state.animation && (
            <Lottie
              ref={animation => {
                this.animation = animation;
              }}
              style={styles.animationDimension}
              source={this.state.animation}
            />
          )}
        </View>
      </LinearGradient>
    );
  }

  _renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View key={index} style={[styles.item, styles.itemInvisible]} />;
    } else {
      return (
        <TouchableHighlight
          style={gameGridDatatArray[index] == 1 ? styles.selectedItem : styles.item}
          key={index}
          onPress={() => this._onGridGamePress(item, index)}
        >
          <TextField style={styles.itemText}>{item.key}</TextField>
        </TouchableHighlight>
      );
    }
  };

  _onGridGamePress = async (item, index) => {
    playSoundAsync();
    gameGridDatatArray[index] =
      gameGridDatatArray[index] === undefined || gameGridDatatArray[index] === 0 ? 1 : 0;
    let newItem = {
      key: item.key
    };
    await this._setStateAsync({
      selectedLetter: [...this.state.selectedLetter, newItem]
    });
    this._updateRemainingWordCount(
      verifyGameGridWord(gameGridDatatArray, this.state.currentGameGrid)
    );
  };

  _setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  _updateRemainingWordCount = async remainingWord => {
    if (remainingWord === 0) {
      this._resetGameGridDataArray();
      await this._setStateAsync(INITIAL_STATE);
      this._changeDataGrid();
      this._playAnimation();
      updateGamePlayed();
    } else {
      await this._setStateAsync({ remainingWord });
    }
  };

  _changeDataGrid = () => {
    let nextGrid =
      this.state.currentGameGrid === first_data_grid ? second_data_grid : first_data_grid;
    this._resetGameGridDataArray();
    this.setState({ ...INITIAL_STATE, currentGameGrid: nextGrid });
  };

  _resetGameGridDataArray() {
    gameGridDatatArray = new Array(100);
  }

  _reloadDataGrid = () => {
    let currentGrid = this.state.currentGameGrid;
    this._resetGameGridDataArray();
    this.setState({ ...INITIAL_STATE, currentGameGrid: currentGrid });
  };

  _keyExtractor = (item, index) => index;

  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimationAsync();
    } else {
      this.animation.reset();
      this.animation.play();
      setTimeout(() => this.setState({ animation: null }), 3000);
    }
  };

  _loadAnimationAsync = async () => {
    this.setState(
      { animation: require("../assets/animations/animation.json") },
      this._playAnimation
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowSubContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  rowContainer: {
    flex: 0.55,
    flexDirection: "row",
    backgroundColor: themeColor.lightSecondary
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
    height: Dimensions.get("window").width / COLUMN_NUMBER
  },
  animationDimension: {
    width: 200,
    height: 200
  },
  selectedItem: {
    backgroundColor: "#B1C5A9",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / COLUMN_NUMBER
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
  },
  remainingWordContainer: {
    width: 150,
    height: 50,
    backgroundColor: themeColor.secondaryColor,
    borderRadius: 10,
    marginTop: 15.5
  },
  animationContainer: {
    position: "absolute",
    left: 110,
    right: 0,
    bottom: 25
  },
  textColor: {
    color: "white"
  }
});

export default HomeScreen;
