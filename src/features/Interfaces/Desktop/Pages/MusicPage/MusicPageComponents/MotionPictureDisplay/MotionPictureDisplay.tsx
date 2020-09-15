import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ReactPlayer from "react-player";

interface MotionPictureDisplayInterface {
  motionPicture: string;
}

const MotionPictureDisplay: React.FC<MotionPictureDisplayInterface> = ({
  motionPicture,
}) => {
  const [motionPictureLink, setMotionPictureLink] = React.useState(``);
  React.useEffect(() => {
    setMotionPictureLink(motionPicture);
  }, [motionPicture]);

  return (
    <View style={styles.mainScene}>
      <ReactPlayer width={"100%"} controls url={motionPictureLink} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainScene: {
    margin: "auto",
    width: "100%",
  },
});

export default MotionPictureDisplay;
