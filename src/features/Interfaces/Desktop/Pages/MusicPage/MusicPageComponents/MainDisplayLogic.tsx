import React from "react";
import { StyleSheet } from "react-native";

function changeStyle(
  styleSheet: Array<any>,
  styleChangeFunction: Function,
  index: number,
  whichStyle: string
) {
  if (whichStyle === "EDBDefault") {
    let tempStyleSheetHold = styleSheet;
    let tempStyleHold = styleSheet[index];
    tempStyleHold = {
      ...tempStyleHold,
      expandedDisplayButton: { color: "whitesmoke" },
      expandedDisplayButtonText: {
        color: "slategrey",
        backgroundColor: "rgba(112, 128, 144, 0.40)",
        borderColor: "slategrey",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 5,
        paddingLeft: 5,
        paddingRight: 5,
        shadowColor: "rgba(112,128, 144, 1.0)",
        shadowRadius: 5,
      },
      motionPictureDisplaySceneBackground:
        styles.motionPictureDisplaySceneBackgroundDefault,
      miniPhotoCatalogSceneBackground:
        styles.miniPhotoCatalogSceneBackgroundDefault,
    };
    tempStyleSheetHold.splice(index, 1, tempStyleHold);
    styleChangeFunction(tempStyleSheetHold);
  } else if (whichStyle === "EDBOnHover") {
    let tempStyleSheetHold = styleSheet;
    let tempStyleHold = styleSheet[index];
    tempStyleHold = {
      ...tempStyleHold,
      expandedDisplayButton: { color: "blue" },
      expandedDisplayButtonText: {
        color: "rgba(50, 205, 50, 0.50)",
        backgroundColor: "rgba(50, 205, 50, 0.40)",
        borderColor: "rgba(50, 205, 50, 1.0)",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 5,
        paddingLeft: 5,
        paddingRight: 5,
        shadowColor: "rgba(50,205, 50, 1.0)",
        shadowRadius: 5,
      },
      motionPictureDisplaySceneBackground:
        styles.motionPictureDisplaySceneBackgroundOnHover,
      miniPhotoCatalogSceneBackground:
        styles.miniPhotoCatalogSceneBackgroundOnHover,
    };
    tempStyleSheetHold.splice(index, 1, tempStyleHold);
    styleChangeFunction(tempStyleSheetHold);
  }
}

const styles = StyleSheet.create({
  motionPictureDisplaySceneBackgroundDefault: {
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    opacity: 0.95,
    elevation: 20,
    shadowColor: "slategrey",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.95,
    shadowRadius: 10,
  },
  miniPhotoCatalogSceneBackgroundDefault: {
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    opacity: 0.95,
    elevation: 20,
    shadowColor: "slategrey",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.95,
    shadowRadius: 10,
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "slategrey",
    borderTopWidth: 0,
  },
  motionPictureDisplaySceneBackgroundOnHover: {
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    opacity: 0.95,
    elevation: 20,
    shadowColor: "rgba(50, 205, 50, 1.0)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.95,
    shadowRadius: 10,
  },
  miniPhotoCatalogSceneBackgroundOnHover: {
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    opacity: 0.95,
    elevation: 20,
    shadowColor: "rgba(50, 205, 50, 1.0)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.95,
    shadowRadius: 10,
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "rgba(50, 205, 50, 0.75)",
    borderTopWidth: 0,
  },
});

export { changeStyle };
