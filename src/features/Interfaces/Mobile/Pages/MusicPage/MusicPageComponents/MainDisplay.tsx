import React from "react";
import { View, Text, StyleSheet } from "react-native";

import ReactPlayer from "react-player";

interface MainDisplayInterface {
  section: { currentSection: string; setSection: Function };
  currentMotionPicture: {
    current: number;
    numOfMotionPictures: number;
    set: Function;
  };
  currentPhoto: number;
  currentPassage: number;
  musicPlaying: { isIt: boolean; setPlaying: Function };
  musicInterval: { current: number; setInterval: Function };
  excerpt: {
    numberOfIndexes: number;
    index: number;
    excerptTitle: string;
    motionPictures: Array<{ title: string; url: string }>;
    gallery: Array<{ title: string; fileName: string }>;
    journal: Array<{ title: string; content: string }>;
  };
}

const MainDisplay: React.FC<MainDisplayInterface> = ({
  section,
  currentMotionPicture,
  currentPassage,
  currentPhoto,
  musicPlaying,
  musicInterval,
  excerpt,
}) => {
  // Setup StyleSheet For Manipulation
  const [styles, setStyles] = React.useState({
    mainScene: styles2.mainScene,
    mainSceneReconfigForPassage: styles2.mainSceneReconfigForPassage,
    mPScreenScene: styles2.mPScreenScene,
    photoScene: styles2.photoScene,
    passageScene: styles2.passageScene,
    passageText: styles2.passageText,
  });

  // Handle Excerpt Updates
  React.useEffect(() => {
    console.log({ ExcerptPropertyForMainDisplayForMobileMusicPage: excerpt });
  }, [excerpt]);

  // Handle Return Views
  switch (section.currentSection) {
    case "motionPictures":
      return (
        <View style={styles.mainScene}>
          <View style={styles.mPScreenScene}>
            <ReactPlayer
              width={"100%"}
              height={"100%"}
              controls
              url={excerpt.motionPictures[currentMotionPicture.current].url}
              config={{
                youtube: {
                  playerVars: { start: musicInterval.current },
                },
              }}
              playing={musicPlaying.isIt}
              onStart={() => {
                console.log(
                  `React Player has loaded with message: stateHold: ${musicInterval.current}`
                );
              }}
              onPlay={() => {
                musicPlaying.setPlaying(true);
              }}
              onPause={() => {
                musicPlaying.setPlaying(false);
              }}
              onEnded={() => {
                musicPlaying.setPlaying(false);
                musicInterval.setInterval(0);
              }}
              onProgress={(prop) => {
                let musicIntervalHold = Math.round(prop.playedSeconds);
                let reconfiguredInterval = 0;
                if (musicIntervalHold < musicInterval.current) {
                  reconfiguredInterval = musicInterval.current;
                } else if (musicIntervalHold > musicInterval.current) {
                  reconfiguredInterval = musicIntervalHold;
                }
                musicInterval.setInterval(reconfiguredInterval);
                console.log(
                  `MPC reactplayer progress prop: ${musicIntervalHold}, stateHold: ${musicInterval.current}`
                );
              }}
            />
          </View>
        </View>
      );
    case "gallery":
      return (
        <View style={styles.mainScene}>
          <View style={styles.photoScene}>
            <img
              src={excerpt.gallery[currentPhoto].fileName}
              width={"100%"}
              height={"auto"}
              alt={"Gallery"}
            />
          </View>
          <View style={styles2.mPScreenSceneHidden}>
            <ReactPlayer
              width={"100%"}
              height={"100%"}
              controls
              url={excerpt.motionPictures[currentMotionPicture.current].url}
              config={{
                youtube: {
                  playerVars: { start: musicInterval.current },
                },
              }}
              playing={musicPlaying.isIt}
              onStart={() => {
                console.log(
                  `React Player has loaded with message: stateHold: ${musicInterval.current}`
                );
              }}
              onPlay={() => {
                musicPlaying.setPlaying(true);
              }}
              onPause={() => {
                musicPlaying.setPlaying(false);
              }}
              onEnded={() => {
                musicPlaying.setPlaying(false);
                musicInterval.setInterval(0);
              }}
              onProgress={(prop) => {
                let musicIntervalHold = Math.round(prop.playedSeconds);
                let reconfiguredInterval = 0;
                if (musicIntervalHold < musicInterval.current) {
                  reconfiguredInterval = musicInterval.current;
                } else if (musicIntervalHold > musicInterval.current) {
                  reconfiguredInterval = musicIntervalHold;
                }
                musicInterval.setInterval(reconfiguredInterval);
                console.log(
                  `MPC reactplayer progress prop: ${musicIntervalHold}, stateHold: ${musicInterval.current}`
                );
              }}
            />
          </View>
        </View>
      );
    case "journal":
      return (
        <View style={styles.mainSceneReconfigForPassage}>
          <View style={styles.passageScene}>
            <Text style={styles.passageText}>
              {excerpt.journal[currentPassage].content}
            </Text>
          </View>
          <View style={styles2.mPScreenSceneHidden}>
            <ReactPlayer
              width={"100%"}
              height={"100%"}
              controls
              url={excerpt.motionPictures[currentMotionPicture.current].url}
              config={{
                youtube: {
                  playerVars: { start: musicInterval.current },
                },
              }}
              playing={musicPlaying.isIt}
              onStart={() => {
                console.log(
                  `React Player has loaded with message: stateHold: ${musicInterval.current}`
                );
              }}
              onPlay={() => {
                musicPlaying.setPlaying(true);
              }}
              onPause={() => {
                musicPlaying.setPlaying(false);
              }}
              onEnded={() => {
                musicPlaying.setPlaying(false);
                musicInterval.setInterval(0);
              }}
              onProgress={(prop) => {
                let musicIntervalHold = Math.round(prop.playedSeconds);
                let reconfiguredInterval = 0;
                if (musicIntervalHold < musicInterval.current) {
                  reconfiguredInterval = musicInterval.current;
                } else if (musicIntervalHold > musicInterval.current) {
                  reconfiguredInterval = musicIntervalHold;
                }
                musicInterval.setInterval(reconfiguredInterval);
                console.log(
                  `MPC reactplayer progress prop: ${musicIntervalHold}, stateHold: ${musicInterval.current}`
                );
              }}
            />
          </View>
        </View>
      );
    default:
      return <View></View>;
  }
};

const styles2 = StyleSheet.create({
  mainScene: {
    margin: "auto",
    width: "100%",
    height: "550px",
    borderRadius: 3,
  },
  mainSceneReconfigForPassage: {
    margin: "auto",
    width: "100%",
    height: "550px",
    borderRadius: 3,
    overflow: "scroll",
  },
  mPScreenScene: {
    position: "relative",
    top: "3%",
    width: "100%",
    height: "500px",
  },
  mPScreenSceneHidden: {
    display: "none",
  },
  photoScene: {
    position: "relative",
    top: "13%",
    width: "100%",
    height: "500px",
  },
  passageScene: {
    position: "relative",
    top: "3%",
    width: "100%",
    height: "auto",
    paddingLeft: 15,
    paddingRight: 15,
  },
  passageText: {
    color: "slategrey",
    lineHeight: 30,
  },
});

export default MainDisplay;
