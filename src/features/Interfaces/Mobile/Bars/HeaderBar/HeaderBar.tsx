import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppBar, Toolbar, Button } from "@material-ui/core";

import { changeStyle, navigatePage } from "./HeaderBarLogic";

import "./HeaderBarStyles.scss";

interface HeaderBarInterface {
  whichPage: string;
}

const HeaderBar: React.FC<HeaderBarInterface> = ({ whichPage }) => {
  const [styles3, setStyles3] = React.useState({
    appBar: {
      background: "linear-gradient(to bottom right, limegreen, 10%, black)",
      borderBottom: "1px solid rgba(112, 128, 144, 1.0)",
    },

    musicButton: {
      border: "1px solid slategrey",
      borderRadius: "5px",
      color: "whitesmoke",
    },
    musicButtonText: {
      color: "whitesmoke",
      textShadowColor: "cyan",
      textShadowRadius: 3,
    },

    merchandiseButton: {
      border: "1px solid slategrey",
      borderRadius: "5px",
      color: "whitesmoke",
    },
    merchandiseButtonText: {
      color: "whitesmoke",
      textShadowColor: "cyan",
      textShadowRadius: 3,
    },
  });

  React.useEffect(() => {
    switch (whichPage) {
      case "music":
        changeStyle(styles3, setStyles3, "musicButtonSelected");
        return;
      case "merchandise":
        changeStyle(styles3, setStyles3, "merchandiseButtonSelected");
    }
  }, []);

  return (
    <View style={styles.headerUnderlay}>
      <AppBar position={"static"} style={styles3.appBar}>
        <View style={styles.navigationScene}>
          <View style={styles.musicButtonUnderlay}>
            <Button
              onMouseOver={() => {
                changeStyle(styles3, setStyles3, "musicButtonHover");
              }}
              onMouseLeave={() => {
                changeStyle(
                  styles3,
                  setStyles3,
                  whichPage === "music"
                    ? "musicButtonSelected"
                    : "musicButtonDefault"
                );
              }}
              onClick={() => {
                navigatePage("music");
              }}
              style={styles3.musicButton}
            >
              <Text style={styles3.musicButtonText}>{"MUSIC"}</Text>
            </Button>
          </View>
          <View style={styles.merchandiseButtonUnderlay}>
            <Button
              onMouseOver={() => {
                changeStyle(styles3, setStyles3, "merchandiseButtonHover");
              }}
              onMouseLeave={() => {
                changeStyle(
                  styles3,
                  setStyles3,
                  whichPage === "merchandise"
                    ? "merchandiseButtonSelected"
                    : "merchandiseButtonDefault"
                );
              }}
              onClick={() => {
                navigatePage("merchandise");
              }}
              style={styles3.merchandiseButton}
            >
              <Text style={styles3.merchandiseButtonText}>{"MERCH"}</Text>
            </Button>
          </View>
        </View>
      </AppBar>
    </View>
  );
};

const styles = StyleSheet.create({
  headerUnderlay: {
    position: "relative",
    zIndex: 10,
    width: "100%",
    height: "auto",
  },
  navigationScene: {
    position: "relative",
    top: 0,
    left: 0,
    flexDirection: "row",
    flex: 2,
    width: "100%",
    height: "auto",
    paddingTop: "5px",
    paddingBottom: "5px",
  },
  musicButtonUnderlay: {
    width: "50%",
    paddingLeft: "5px",
    paddingRight: "5px",
  },
  merchandiseButtonUnderlay: {
    width: "50%",
    paddingLeft: "5px",
    paddingRight: "5px",
  },
  genericText: {
    color: "whitesmoke",
  },
});

export default HeaderBar;
