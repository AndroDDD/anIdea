// Import React and Necessary Components
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "@material-ui/core";
// Import Icons
import PlayCircleOutlineSharp from "@material-ui/icons/PlayCircleOutlineSharp";
import PauseCircleOutlineSharp from "@material-ui/icons/PauseCircleOutlineSharp";
import SkipPrevious from "@material-ui/icons/SkipPrevious";
import SkipNext from "@material-ui/icons/SkipNext";
import FastRewind from "@material-ui/icons/FastRewind";
import FastForward from "@material-ui/icons/FastForward";
// Import Styles
import "./MusicPlayerStyles.scss";

interface MusicPlayerInterface {
  play: { isPlaying: boolean; setPlay: Function };
  song: {
    numOfSongs: number;
    currentSong: number;
    setSong: Function;
    setSongInterval: Function;
  };
  titles: Array<string>;
}

const MusicPlayer: React.FC<MusicPlayerInterface> = ({
  play,
  song,
  titles,
}) => {
  // Setup StyleSheet For Manipulation
  const [styles, setStyles] = React.useState({
    mainScene: styles2.mainScene,
    mainSceneStyleSupport: "mainSceneStyleSupport",
    playerScene: styles2.playerScene,
    musicIconScene: styles2.musicIconScene,
    musicExtScene: styles2.musicExtScene,
    musicNavScene: styles2.musicNavScene,
    musicTitleScene: styles2.musicTitleScene,
    prevSongIconScene: styles2.prevSongIconScene,
    nextSongIconScene: styles2.nextSongIconScene,
    musicIcon: "musicIconInactive",
    prevSongIcon: "prevSongIcon",
    nextSongIcon: "nextSongIcon",
  });

  // Setup Icons For Manipulation
  const [icons, setIcons] = React.useState({
    musicIcon: (
      <PlayCircleOutlineSharp
        className={styles.musicIcon}
        style={{ margin: "auto", width: "55px", height: "auto" }}
      />
    ),
    prevSongIcon: (
      <View>
        <div className={styles.prevSongIcon}>
          <SkipPrevious
            style={{
              width: "15px",
              position: "absolute",
            }}
          />
          <FastRewind
            style={{
              width: "15px",
              position: "absolute",
              left: "4px",
            }}
          />
        </div>
      </View>
    ),
    nextSongIcon: (
      <View>
        <div className={styles.nextSongIcon}>
          <FastForward
            style={{
              width: "15px",
              position: "absolute",
            }}
          />
          <SkipNext
            style={{
              width: "15px",
              position: "absolute",
              left: "4px",
            }}
          />
        </div>
      </View>
    ),
  });

  // Handle Music Icon Updates
  React.useEffect(() => {
    if (play.isPlaying === true) {
      setIcons({
        ...icons,
        musicIcon: (
          <PauseCircleOutlineSharp
            className={styles.musicIcon}
            style={{
              margin: "auto",
              width: "55px",
              height: "auto",
            }}
          />
        ),
      });
    } else if (play.isPlaying === false) {
      setIcons({
        ...icons,
        musicIcon: (
          <PlayCircleOutlineSharp
            className={styles.musicIcon}
            style={{
              margin: "auto",
              width: "55px",
              height: "auto",
            }}
          />
        ),
      });
    }
  }, [play]);

  // Handle Return View
  return (
    <div className={styles.mainSceneStyleSupport}>
      <View style={styles.mainScene}>
        <View style={styles.playerScene}>
          <View style={styles.musicIconScene}>
            <IconButton
              onClick={() => {
                if (play.isPlaying === true) {
                  play.setPlay(false);
                } else if (play.isPlaying === false) {
                  play.setPlay(true);
                }
              }}
            >
              {icons.musicIcon}
            </IconButton>
          </View>
          <View style={styles.musicExtScene}>
            <View style={styles.musicTitleScene}>
              <Text style={{ color: "slategrey" }}>
                {titles[song.currentSong]}
              </Text>
            </View>
            <View style={styles.musicNavScene}>
              <View style={styles.prevSongIconScene}>
                <IconButton
                  onClick={() => {
                    if (song.currentSong <= 0) {
                      let newSong = song.numOfSongs - 1;
                      song.setSong(newSong);
                    } else if (song.currentSong > 0) {
                      let newSong = song.currentSong - 1;
                      song.setSong(newSong);
                    }
                    song.setSongInterval(0);
                  }}
                >
                  {icons.prevSongIcon}
                </IconButton>
              </View>
              <View style={styles.nextSongIconScene}>
                <IconButton
                  onClick={() => {
                    if (
                      song.currentSong >= song.numOfSongs - 1 ||
                      song.currentSong < 0
                    ) {
                      song.setSong(0);
                    } else if (
                      song.currentSong < song.numOfSongs - 1 &&
                      song.currentSong >= 0
                    ) {
                      let newSong = song.currentSong + 1;
                      song.setSong(newSong);
                    }
                    song.setSongInterval(0);
                  }}
                >
                  {icons.nextSongIcon}
                </IconButton>
              </View>
            </View>
          </View>
        </View>
      </View>
    </div>
  );
};

const styles2 = StyleSheet.create({
  mainScene: {
    flexDirection: "row",
    width: "100%",
  },
  playerScene: {
    flexDirection: "row",
    position: "relative",
    width: "50%",
  },
  musicExtScene: {
    position: "relative",
  },
  musicNavScene: {
    position: "relative",
    top: "40px",
    flexDirection: "row",
  },
  musicTitleScene: {
    position: "relative",
    left: "10px",
    top: "10px",
  },
  musicIconScene: {
    position: "relative",
    left: 10,
  },
  nextSongIconScene: { position: "absolute", bottom: "0px", left: "36px" },
  prevSongIconScene: { position: "absolute", bottom: "0px", left: "0px" },
});

export default MusicPlayer;
