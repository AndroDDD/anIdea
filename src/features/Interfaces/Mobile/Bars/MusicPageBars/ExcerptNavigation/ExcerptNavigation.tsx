import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Swipeable } from "react-swipeable";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";

import { retrieveData } from "../../../Pages/MusicPage/MusicPageSlice";

interface ExcerptNavigator {
  currentExcerptIndex: number;
  excerptTitle: string;
  setLocalState: Function;
  reset: Function;
}

const ExcerptNavigator: React.FC<ExcerptNavigator> = ({
  currentExcerptIndex,
  excerptTitle,
  setLocalState,
  reset,
}) => {
  // Declare View Title For Section
  const [title, setTitle] = React.useState("");

  // Declare StyleSheet For Manipulation
  const [styles, setStyles] = React.useState({
    mainScene: styles2.mainScene,
    mainSceneStyleSupport: "mainSceneStyleSupport",
    titleTextScene: styles2.titleTextScene,
    titleText: styles2.titleTextDefault,
    navIconScene: styles2.navIconScene,
  });

  return (
    <Swipeable
      style={{ width: "100%" }}
      onSwiped={(event) => {
        // Logging Center For Section Navigator OnSwipe Event
        console.log("SectionNavigator Has Been Swiped.!.");
        console.log({ SectionNavigatorEvent: event });
      }}
      onSwipedLeft={(event) => {
        let newIndexHold = currentExcerptIndex + 1;
        retrieveData(newIndexHold, {
          type: "localStateReload",
          execute: (data: {
            numberOfIndexes: number;
            index: number;
            excerptTitle: string;
            motionPictures: Array<{ title: string; url: string }>;
            gallery: Array<{ title: string; fileName: string }>;
            journal: Array<{ title: string; content: string }>;
          }) => {
            console.log({ storeDataRetrievedForMusicPage: data });
            reset();
            setLocalState({ ...data });
          },
        });
      }}
    >
      <div className={styles.mainSceneStyleSupport}>
        <View style={styles.mainScene}>
          <View style={styles.titleTextScene}>
            <Text style={styles.titleText}>{excerptTitle}</Text>
          </View>
          <View style={styles.navIconScene}>
            <ArrowBackIos style={{ width: "20px" }} />
          </View>
        </View>
      </div>
    </Swipeable>
  );
};

const styles2 = StyleSheet.create({
  mainScene: {
    width: "100%",
    height: "40px",
    flexDirection: "row",
  },
  titleTextScene: {
    width: "50%",
    position: "relative",
    left: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titleTextDefault: {
    color: "rgba(50, 205, 50, 0.75)",
    textAlign: "left",
  },
  navIconScene: {
    width: "50%",
    position: "relative",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default ExcerptNavigator;
