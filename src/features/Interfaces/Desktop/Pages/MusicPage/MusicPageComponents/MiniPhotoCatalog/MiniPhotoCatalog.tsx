import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { changeStyle } from "./MiniPhotoCatalogLogic";

interface MiniPhotoCatalogInterface {
  photos: Array<{
    middle: { source: string; width: number; height: number };
    topLeft: { source: string; width: number; height: number };
    bottomLeft: { source: string; width: number; height: number };
    topRight: { source: string; width: number; height: number };
    bottomRight: { source: string; width: number; height: number };
  }>;
}

const MiniPhotoCatalog: React.FC<MiniPhotoCatalogInterface> = ({ photos }) => {
  // Stored Data State For Component
  const [catalogData, setCatalogData] = React.useState<{
    currentIndex: number;
    photos: Array<{
      middle: { source: string; width: number; height: number };
      topLeft: { source: string; width: number; height: number };
      bottomLeft: { source: string; width: number; height: number };
      topRight: { source: string; width: number; height: number };
      bottomRight: { source: string; width: number; height: number };
    }>;
  }>({
    currentIndex: 0,
    photos: [
      {
        middle: { source: "", width: 0, height: 0 },
        topLeft: { source: "", width: 0, height: 0 },
        bottomLeft: { source: "", width: 0, height: 0 },
        topRight: { source: "", width: 0, height: 0 },
        bottomRight: { source: "", width: 0, height: 0 },
      },
    ],
  });

  // Local Data State For Styles
  const [styles2, setStyles2] = React.useState({
    imageStyles: {
      topLeftCorner: {
        border: "1px solid rgba(112, 128, 144, 0.50)",
        boxShadow: "0 -0px 5px 1px rgba(112, 150, 144, 0.60)",
        opacity: "0.75",
      },
      topRightCorner: {
        border: "1px solid rgba(112, 128, 144, 0.50)",
        boxShadow: "0 -0px 5px 1px rgba(112, 150, 144, 0.60)",
        opacity: "0.75",
      },
      bottomLeftCorner: {
        border: "1px solid rgba(112, 128, 144, 0.50)",
        boxShadow: "0 -0px 5px 1px rgba(112, 150, 144, 0.60)",
        opacity: "0.75",
      },
      bottomRightCorner: {
        border: "1px solid rgba(112, 128, 144, 0.50)",
        boxShadow: "0 -0px 5px 1px rgba(112, 150, 144, 0.60)",
        opacity: "0.75",
      },
      middle: {
        border: "1px solid rgba(50, 205, 25, .20)",
        boxShadow: "0 -0px 5px -1px rgba(50, 205, 50, .60)",
        opacity: "0.75",
      },
    },
  });

  React.useEffect(() => {
    setCatalogData({ ...catalogData, photos: photos });
    console.log({ catalogData: photos });
  }, [photos]);

  return (
    <View style={styles.mainScene}>
      <View style={styles.mainSceneSplitLeft}>
        <View style={styles.topLeftCornerScene}>
          <img
            src={catalogData.photos[catalogData.currentIndex].topLeft.source}
            alt={"Positioned Top Left Corner"}
            width={"100%"}
            height={"100%"}
            style={styles2.imageStyles.topLeftCorner}
            onMouseOver={() => {
              changeStyle({
                styleSheet: styles2,
                styleChangeFunction: setStyles2,
                event: "hover",
                element: "topLeft",
              });
            }}
            onMouseOut={() => {
              changeStyle({
                styleSheet: styles2,
                styleChangeFunction: setStyles2,
                event: "reset",
                element: "topLeft",
              });
            }}
          />
        </View>
        <View style={styles.bottomLeftCornerScene}>
          <img
            src={catalogData.photos[catalogData.currentIndex].bottomLeft.source}
            alt={"Positioned Bottom Left Corner"}
            width={"150%"}
            height={"100%"}
            style={styles2.imageStyles.bottomLeftCorner}
            onMouseOver={() => {
              changeStyle({
                styleSheet: styles2,
                styleChangeFunction: setStyles2,
                event: "hover",
                element: "bottomLeft",
              });
            }}
            onMouseOut={() => {
              changeStyle({
                styleSheet: styles2,
                styleChangeFunction: setStyles2,
                event: "reset",
                element: "bottomLeft",
              });
            }}
          />
        </View>
        <View style={styles.middleScene}>
          <img
            src={catalogData.photos[catalogData.currentIndex].middle.source}
            alt={"Positioned In Middle"}
            width={"200%"}
            height={"100%"}
            style={styles2.imageStyles.middle}
            onMouseOver={() => {
              changeStyle({
                styleSheet: styles2,
                styleChangeFunction: setStyles2,
                event: "hover",
                element: "middle",
              });
            }}
            onMouseOut={() => {
              changeStyle({
                styleSheet: styles2,
                styleChangeFunction: setStyles2,
                event: "reset",
                element: "middle",
              });
            }}
          />
        </View>
      </View>
      <View style={styles.mainSceneSplitRight}>
        <View style={styles.topRightCornerScene}>
          <img
            src={catalogData.photos[catalogData.currentIndex].topRight.source}
            alt={"Positioned Top Right Corner"}
            width={"150%"}
            height={"100%"}
            style={styles2.imageStyles.topRightCorner}
            onMouseOver={() => {
              changeStyle({
                styleSheet: styles2,
                styleChangeFunction: setStyles2,
                event: "hover",
                element: "topRight",
              });
            }}
            onMouseOut={() => {
              changeStyle({
                styleSheet: styles2,
                styleChangeFunction: setStyles2,
                event: "reset",
                element: "topRight",
              });
            }}
          />
        </View>
        <View style={styles.bottomRightCornerScene}>
          <img
            src={
              catalogData.photos[catalogData.currentIndex].bottomRight.source
            }
            alt={"Positioned Bottom Right Corner"}
            width={"100%"}
            height={"100%"}
            style={styles2.imageStyles.bottomRightCorner}
            onMouseOver={() => {
              changeStyle({
                styleSheet: styles2,
                styleChangeFunction: setStyles2,
                event: "hover",
                element: "bottomRight",
              });
            }}
            onMouseOut={() => {
              changeStyle({
                styleSheet: styles2,
                styleChangeFunction: setStyles2,
                event: "reset",
                element: "bottomRight",
              });
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainScene: {
    margin: "auto",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flex: 2,
  },

  mainSceneSplitLeft: {
    flexDirection: "column",
    width: "50%",
    transform: [{ translateX: 1 }],
  },
  mainSceneSplitRight: {
    flexDirection: "column",
    width: "50%",
    alignItems: "flex-end",
    transform: [{ translateX: 1 }],
  },
  topLeftCornerScene: {
    width: "50%",
    height: "75%",
    padding: "3px",
  },
  topRightCornerScene: {
    width: "100%",
    height: "25%",
    position: "relative",
    right: "50%",
    padding: "3px",
  },
  bottomLeftCornerScene: {
    height: "25%",
    padding: "3px",
  },
  bottomRightCornerScene: {
    width: "50%",
    height: "75%",
    padding: "3px",
    paddingTop: "2px",
    transform: [{ translateX: -3 }],
  },
  middleScene: {
    height: "50%",
    position: "absolute",
    top: "25%",
    left: "50%",
    padding: "2px",
    paddingLeft: "3px",
    paddingBottom: "3px",
  },
});

export default MiniPhotoCatalog;
