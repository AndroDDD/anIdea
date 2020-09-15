import React from "react";
import { View, StyleSheet } from "react-native";

import HeaderBar from "../../Bars/HeaderBar/HeaderBar";
import MainDisplay from "./MerchandisePageComponents/MainDisplay";

const MerchandisePageM: React.FC = () => {
  return (
    <View style={styles.scene}>
      <HeaderBar whichPage={"merchandise"} />
      <MainDisplay />
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    margin: "auto",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    textAlign: "center",
    backgroundColor: "black",
  },
});

export default MerchandisePageM;
