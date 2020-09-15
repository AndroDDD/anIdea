import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Swipeable } from "react-swipeable";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";

import "./SectionNavigationStyles.scss";

interface SectionNavigator {
  section: {
    currentSection: string;
    setSection: Function;
  };
}

const SectionNavigator: React.FC<SectionNavigator> = ({ section }) => {
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
    if (section.currentSection === "motionPictures") {
      setTitle("MOTION PICTURES");
    } else if (section.currentSection === "gallery") {
      setTitle("GALLERY");
    } else if (section.currentSection === "journal") {
      setTitle("JOURNAL");
    }
  }, [section.currentSection]);

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
        if (section.currentSection === "motionPictures") {
          section.setSection("gallery");
        } else if (section.currentSection === "gallery") {
          section.setSection("journal");
        } else if (section.currentSection === "journal") {
          section.setSection("motionPictures");
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
  },
  navIconScene: {
    width: "50%",
    position: "relative",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default SectionNavigator;
