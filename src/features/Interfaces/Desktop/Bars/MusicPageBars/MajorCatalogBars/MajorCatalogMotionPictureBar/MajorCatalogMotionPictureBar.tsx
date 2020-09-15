import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { SkipPrevious, SkipNext, TurnedInNotSharp } from "@material-ui/icons";

import {
  prevMotionPicture,
  nextMotionPicture,
  handleSearch,
} from "./MajorCatalogVideoBarLogic";
import "../MajorCatalogBarsStyles.scss";

interface MajorCatalogPhotoBarInterface {
  currentIndex: number;
  setNextMotionPicture: Function;
  catalogLength: number;
  motionPicturesTitles: Array<string>;
  musicInterval: number;
  setMusicInterval: Function;
}

const MajorCatalogMotionPictureBar: React.FC<MajorCatalogPhotoBarInterface> = ({
  currentIndex,
  setNextMotionPicture,
  catalogLength,
  motionPicturesTitles,
  musicInterval,
  setMusicInterval,
}) => {
  const [styles2, setStyles2] = React.useState({
    appBar: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "inherit",
      boxShadow: "none",
    },
    toolbar: {
      position: "relative",
      margin: "auto",
      width: "auto",
      justifyContent: "center",
      alignItems: "center",
    },
    inputTextStyle: "inputTextStyle",
    prevIcon: {
      color: "rgba(50, 205, 50, 0.75)",
      background: "rgba(112, 128, 144, 0.5)",
      boxShadow: "0px 0px 5px 2px rgba(50, 205, 50, 0.75)",
    },
    nextIcon: {
      color: "rgba(50, 205, 50, 0.75)",
      background: "rgba(112, 128, 144, 0.5)",
      boxShadow: "0px 0px 5px 2px rgba(50, 205, 50, 0.75)",
    },
    searchResultsScene: styles.searchResultsSceneHidden,
    searchResultButton: {
      margin: "auto",
      padding: "0px",
      color: "orange",
    },
    titleText: styles.titleTextDefault,
  });
  const [foundTitles, setFoundTitles] = React.useState<Array<string>>();
  const [query, setQuery] = React.useState(``);
  const [searchSceneFocused, setSearchSceneFocused] = React.useState(false);
  const [searchResultsFocused, setSearchResultsFocused] = React.useState(false);
  React.useEffect(() => {
    if (searchSceneFocused === false) {
      setQuery(``);
      if (searchResultsFocused === false)
        setStyles2({
          ...styles2,
          searchResultsScene: styles.searchResultsSceneHidden,
        });
    }
  }, [searchSceneFocused]);

  return (
    <View style={styles.mainScene}>
      <AppBar position={"relative"} style={styles2.appBar}>
        <Toolbar>
          <View style={styles.titleView}>
            <Text style={styles2.titleText}>
              {motionPicturesTitles[currentIndex]}
            </Text>
          </View>
          <View style={styles.navigationScene}>
            <IconButton
              onClick={() => {
                prevMotionPicture(
                  currentIndex,
                  setNextMotionPicture,
                  catalogLength,
                  setMusicInterval
                );
              }}
            >
              <SkipPrevious style={styles2.prevIcon} />
            </IconButton>
            <View style={styles.searchScene}>
              <input
                type={"text"}
                name={"Find A Motion Picture"}
                placeholder={"Find A Motion Picture"}
                className={styles2.inputTextStyle}
                value={query}
                onBlur={() => {
                  setTimeout(() => {
                    setSearchSceneFocused(false);
                  }, 1000);
                }}
                onChange={(e) => {
                  console.log({ mcpbTitles: motionPicturesTitles });
                  setQuery(e.target.value);
                  handleSearch(
                    motionPicturesTitles,
                    e.target.value,
                    setFoundTitles,
                    styles2,
                    setStyles2,
                    setNextMotionPicture,
                    setSearchResultsFocused
                  );
                  setSearchSceneFocused(true);
                }}
              />
              <View style={styles2.searchResultsScene}>{foundTitles}</View>
            </View>
            <IconButton
              onClick={() => {
                nextMotionPicture(
                  currentIndex,
                  setNextMotionPicture,
                  catalogLength,
                  setMusicInterval
                );
              }}
            >
              <SkipNext style={styles2.nextIcon} />
            </IconButton>
          </View>
        </Toolbar>
      </AppBar>
    </View>
  );
};

const styles = StyleSheet.create({
  mainScene: {
    margin: "auto",
    width: "100%",
  },
  navigationScene: {
    flexDirection: "row",
    position: "absolute",
    left: "445px",
    justifyContent: "center",
    alignItems: "center",
  },
  searchScene: {
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  searchResultsSceneDisplayed: {
    position: "absolute",
    top: "25px",
    padding: "5px",
    color: "orange",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(50, 205, 50, 0.75)",
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    shadowRadius: 5,
    shadowColor: "rgba(50, 205, 50, 0.75)",
  },
  searchResultsSceneHidden: {
    display: "none",
  },
  titleView: {
    position: "relative",
    left: "10px",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  titleTextDefault: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    color: "rgba(112, 128, 144, 1.0)",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    shadowRadius: 5,
    shadowColor: "rgba(112, 128, 144, 0.75)",
    fontSize: 20,
    textShadowRadius: 5,
    textShadowColor: "rgba(245, 80, 0, 0.75)",
  },
});

export default MajorCatalogMotionPictureBar;
