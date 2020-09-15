import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Swipeable } from "react-swipeable";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";

import "./IndexNavigationStyles.scss";

interface IndexNavigator {
  section: string;
  motionPictures: {
    numberOfIndexes: number;
    currentIndex: number;
    setIndex: Function;
    title: string;
    reset: Function;
  };
  gallery: {
    numberOfIndexes: number;
    currentIndex: number;
    setIndex: Function;
    title: string;
  };
  journal: {
    numberOfIndexes: number;
    currentIndex: number;
    setIndex: Function;
    title: string;
  };
}

const IndexNavigator: React.FC<IndexNavigator> = ({
  section,
  motionPictures,
  gallery,
  journal,
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

  // Handle Title Updates
  React.useEffect(() => {
    if (section === "motionPictures") {
      setTitle(motionPictures.title);
    } else if (section === "gallery") {
      setTitle(gallery.title);
    } else if (section === "journal") {
      setTitle(journal.title);
    }
  }, [section, motionPictures.title, gallery.title, journal.title]);

  //Handle Return View
  return (
    <Swipeable
      style={{ width: "100%" }}
      onSwiped={(event) => {
        // Logging Center For Section Navigator OnSwipe Event
        console.log("SectionNavigator Has Been Swiped.!.");
        console.log({ SectionNavigatorEvent: event });
      }}
      onSwipedLeft={(event) => {
        if (section === "motionPictures") {
          let tempIndexHold = motionPictures.currentIndex;
          let reconfigNumOfIndexes = motionPictures.numberOfIndexes - 1;
          let newIndex = 0;
          if (tempIndexHold < reconfigNumOfIndexes && tempIndexHold >= 0) {
            newIndex = tempIndexHold + 1;
          }
          motionPictures.reset();
          motionPictures.setIndex(newIndex);
        } else if (section === "gallery") {
          let tempIndexHold = gallery.currentIndex;
          let reconfigNumOfIndexes = gallery.numberOfIndexes - 1;
          let newIndex = 0;
          if (tempIndexHold < reconfigNumOfIndexes && tempIndexHold >= 0) {
            newIndex = tempIndexHold + 1;
          }
          gallery.setIndex(newIndex);
        } else if (section === "journal") {
          let tempIndexHold = journal.currentIndex;
          let reconfigNumOfIndexes = journal.numberOfIndexes - 1;
          let newIndex = 0;
          if (tempIndexHold < reconfigNumOfIndexes && tempIndexHold >= 0) {
            newIndex = tempIndexHold + 1;
          }
          journal.setIndex(newIndex);
        }
      }}
    >
      <div className={styles.mainSceneStyleSupport}>
        <View style={styles.mainScene}>
          <View style={styles.titleTextScene}>
            <Text style={styles.titleText}>{title}</Text>
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

export default IndexNavigator;
