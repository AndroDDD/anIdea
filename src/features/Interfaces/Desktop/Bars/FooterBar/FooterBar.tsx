import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FooterBar: React.FC = () => {
  return (
    <View style={styles.headerUnderlay}>
      <Text style={styles.genericText}>
        <Text style={styles.titleLabel}>{"DevelopedWith:"}</Text>{" "}
        {"React, Redux, Typescript"}
        {"    "}
        <Text style={styles.titleLabel}>{"DevelopedBy:"}</Text> {"Andre D."}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerUnderlay: {
    width: "100%",
    height: "auto",
    borderTopWidth: 1,
    borderTopColor: "limegreen",
    borderBottomWidth: 1,
    borderBottomColor: "limegreen",
    boxShadow: "0 3px 5px 3px limegreen",
    paddingBottom: 3,
  },
  genericText: {
    color: "cyan",
  },
  titleLabel: {
    color: "limegreen",
  },
});

export default FooterBar;
