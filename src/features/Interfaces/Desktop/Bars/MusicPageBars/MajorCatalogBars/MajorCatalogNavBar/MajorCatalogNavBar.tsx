import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppBar, Toolbar, IconButton, makeStyles } from "@material-ui/core";
import {
  PlayCircleOutlineSharp,
  MonochromePhotosSharp,
  TheatersSharp,
  MenuBookSharp,
  ArrowUpward,
  ArrowDownward,
  SearchSharp,
  FastForward,
  FastRewind,
  SkipNext,
  SkipPrevious,
} from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";

import {
  switchMusicIcon,
  navigate,
  switchExcerpts,
  switchExcerptsInputView,
  switchSong,
} from "./MajorCatalogNavBarLogic";
import "./MajorCatalogNavBarStyles.scss";

interface MajorCatalogNavBar {
  isMusicPlaying: boolean;
  playMusicFunction: Function;
  musicInterval: number;
  setMusicInterval: Function;
  setPagesPosition: Function;
  currentPage: number;
  setExcerptIndex: Function;
  currentExcerpt: number;
  changeExcerpt: Function;
  catalogLength: number;
  currentMotionPicture: number;
  motionPicturesLength: number;
  setCurrentPhoto: Function;
  setCurrentMotionPicture: Function;
  setCurrentPassage: Function;
  mainDisplay: string;
  setMainDisplay: Function;
  realCatIndexes: Array<number>;
  load: {
    initialDataSet: {
      initialStylesSet: boolean;
      isViewChanging: boolean;
      isCatalogPageChanging: boolean;
      navigationType: string;
    };
    setInitialDataSet: Function;
  };
}

const MajorCatalogNavBar: React.FC<MajorCatalogNavBar> = ({
  isMusicPlaying,
  playMusicFunction,
  musicInterval,
  setMusicInterval,
  setPagesPosition,
  changeExcerpt,
  currentPage,
  setExcerptIndex,
  currentExcerpt,
  catalogLength,
  currentMotionPicture,
  motionPicturesLength,
  setCurrentPhoto,
  setCurrentMotionPicture,
  setCurrentPassage,
  mainDisplay,
  setMainDisplay,
  realCatIndexes,
  load,
}) => {
  const classes = useStyles();
  const [realExcerptIndex, setRealExcerptIndex] = React.useState(0);
  const [navigationType, setNavigationType] = React.useState("next");
  const [isUpdating, setIsUpdating] = React.useState(true);
  const [currentMusicInterval, setCurrentMusicInterval] = React.useState(0);
  const [
    switchExcerptsInputValue,
    setSwitchExcerptsInputValue,
  ] = React.useState();
  const [
    pageIndexSelectButtonFocused,
    setPageIndexSelectButtonFocused,
  ] = React.useState(false);

  const [styles2, setStyles2] = React.useState<{
    appBar: {
      left: any;
      margin: any;
      justifyContent: any;
      alignItems: any;
      backgroundColor: any;
      boxShadow: any;
    };
    pageIndexText: any;
    selectExcerpt: any;
    musicIconScene: any;
    musicIcon: any;
    nextSongIconScene: any;
    nextSongIcon: any;
    prevSongIconScene: any;
    prevSongIcon: any;
    photosIconScene: any;
    photosIcon: any;
    motionPicturesIconScene: any;
    motionPicturesIcon: any;
    journalIconScene: any;
    journalIcon: any;
    upArrowIconScene: any;
    upArrowIcon: any;
    downArrowIconScene: any;
    downArrowIcon: any;
    pageIndexTitleScene: any;
    pageIndexSelectButtonScene: any;
    pageIndexSelectButton: any;
    pageIndexLoadIconScene: any;
    pageIndexLoadIcon: any;
  }>({
    appBar: {
      left: "10px",
      margin: "auto",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "inherit",
      boxShadow: "none",
    },
    pageIndexText: styles.pageIndexTextDefault,
    selectExcerpt: "selectExcerpt",
    musicIconScene: styles.musicIconScene,
    musicIcon: "musicIconInactive",
    nextSongIconScene: styles.nextSongIconScene,
    nextSongIcon: "nextSongIconInactive",
    prevSongIconScene: styles.prevSongIconScene,
    prevSongIcon: "prevSongIconInactive",
    photosIconScene: styles.photosIconScene,
    photosIcon: "photosIconInactive",
    motionPicturesIconScene: styles.motionPicturesIconScene,
    motionPicturesIcon: "motionPicturesIconInactive",
    journalIconScene: styles.journalIconScene,
    journalIcon: "journalIconInactive",
    upArrowIconScene: styles.upArrowIconScene,
    upArrowIcon: "upArrowIconInactive",
    downArrowIconScene: styles.downArrowIconScene,
    downArrowIcon: "downArrowIconInactive",
    pageIndexTitleScene: styles.pageIndexTitleScene,
    pageIndexSelectButtonScene: styles.pageIndexSelectButtonSceneHidden,
    pageIndexSelectButton: "pageIndexSelectButton",
    pageIndexLoadIconScene: styles.pageIndexLoadIconSceneHidden,
    pageIndexLoadIcon: classes.progressIcon,
  });
  const [icons, setIcons] = React.useState({
    musicIcon: (
      <PlayCircleOutlineSharp
        className={styles2.musicIcon}
        style={{ margin: "auto", width: "55px", height: "auto" }}
      />
    ),
    nextSongIcon: (
      <View>
        <div className={styles2.nextSongIcon}>
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
    prevSongIcon: (
      <View>
        <div className={styles2.prevSongIcon}>
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
    photosIcon: (
      <MonochromePhotosSharp
        className={styles2.photosIcon}
        style={{ margin: "auto", width: "27px", height: "auto" }}
      />
    ),
    motionPicturesIcon: (
      <TheatersSharp
        className={styles2.motionPicturesIcon}
        style={{ margin: "auto", width: "27px", height: "auto" }}
      />
    ),
    journalIcon: (
      <MenuBookSharp
        className={styles2.journalIcon}
        style={{ margin: "auto", width: "27px", height: "auto" }}
      />
    ),
    upArrowIcon: (
      <ArrowUpward
        className={styles2.upArrowIcon}
        style={{ margin: "auto", width: "27px", height: "auto" }}
      />
    ),
    downArrowIcon: (
      <ArrowDownward
        className={styles2.downArrowIcon}
        style={{ margin: "auto", width: "27px", height: "auto" }}
      />
    ),
    pageIndexSelectButton: (
      <SearchSharp
        className={styles2.pageIndexSelectButton}
        style={{ margin: "auto", width: "20px", height: "auto" }}
      ></SearchSharp>
    ),
  });

  React.useEffect(() => {
    switchMusicIcon(
      icons,
      setIcons,
      playMusicFunction,
      !isMusicPlaying,
      "player"
    );
  }, [isMusicPlaying]);

  React.useEffect(() => {
    if (mainDisplay === "photos") {
      setStyles2({
        ...styles2,
        photosIcon: "photosIconActive",
        motionPicturesIcon: "motionPicturesIconInactive",
        journalIcon: "journalIconInactive",
      });
      console.log("mCNB MainDisplay: Photos");
    } else if (mainDisplay === "motionPictures") {
      setStyles2({
        ...styles2,
        photosIcon: "photosIconInactive",
        motionPicturesIcon: "motionPicturesIconActive",
        journalIcon: "journalIconInactive",
      });
      console.log("mCNB MainDisplay: Motion Pictures");
    } else if (mainDisplay === "journal") {
      setStyles2({
        ...styles2,
        photosIcon: "photosIconInactive",
        motionPicturesIcon: "motionPicturesIconInactive",
        journalIcon: "journalIconActive",
      });
      console.log("mCNB MainDisplay: Journal");
    }

    console.log("mCNB has detected Main Display Change.");
  }, [mainDisplay]);

  // Handle Icon View Update
  React.useEffect(() => {
    setIcons({
      ...icons,
      photosIcon: (
        <MonochromePhotosSharp
          className={styles2.photosIcon}
          style={{ margin: "auto", width: "27px", height: "auto" }}
        />
      ),
      motionPicturesIcon: (
        <TheatersSharp
          className={styles2.motionPicturesIcon}
          style={{ margin: "auto", width: "27px", height: "auto" }}
        />
      ),
      journalIcon: (
        <MenuBookSharp
          className={styles2.journalIcon}
          style={{ margin: "auto", width: "27px", height: "auto" }}
        />
      ),
    });
  }, [styles2]);

  React.useEffect(() => {
    setCurrentMusicInterval(musicInterval);
  }, [musicInterval]);

  // Handle Real Index Display
  React.useEffect(() => {
    if (load.initialDataSet.isCatalogPageChanging === true) {
      setRealExcerptIndex(333);
      console.log({ Response: "Catalog Page is Changing!" });
    } else if (load.initialDataSet.isCatalogPageChanging === false) {
      if (navigationType === "prevPage") {
        let lastExcerpt = catalogLength - 1;
        setRealExcerptIndex(realCatIndexes[lastExcerpt]);
      } else if (navigationType === "nextPage") {
        setRealExcerptIndex(realCatIndexes[currentExcerpt]);
      } else if (navigationType === "selectExcerpt") {
        setRealExcerptIndex(realCatIndexes[currentExcerpt]);
        setStyles2({
          ...styles2,
          pageIndexLoadIconScene: styles.pageIndexLoadIconSceneHidden,
          pageIndexTitleScene: styles.pageIndexTitleScene,
        });
        console.log({
          currentExcerptMCNB: currentExcerpt,
          realIndexArray: realCatIndexes,
        });
      } else {
        setRealExcerptIndex(realCatIndexes[currentExcerpt]);
      }
      console.log({ Response: "CatalogPage has Changed." });
    }
  }, [load]);

  return (
    <View style={styles.mainScene}>
      <AppBar position={"absolute"} style={styles2.appBar}>
        <Toolbar className={"toolbar"}>
          <View>
            <div className={"musicSceneStyleSupport"}>
              <View style={styles2.musicIconScene}>
                <IconButton
                  onClick={() => {
                    switchMusicIcon(
                      icons,
                      setIcons,
                      playMusicFunction,
                      isMusicPlaying,
                      "button"
                    );
                  }}
                >
                  {icons.musicIcon}
                </IconButton>
                <View style={styles2.nextSongIconScene}>
                  <IconButton
                    onClick={() => {
                      switchSong(
                        "next",
                        currentMotionPicture,
                        setCurrentMotionPicture,
                        motionPicturesLength,
                        setMusicInterval
                      );
                    }}
                  >
                    {icons.nextSongIcon}
                  </IconButton>
                </View>
                <View style={styles2.prevSongIconScene}>
                  <IconButton
                    onClick={() => {
                      switchSong(
                        "prev",
                        currentMotionPicture,
                        setCurrentMotionPicture,
                        motionPicturesLength,
                        setMusicInterval
                      );
                    }}
                  >
                    {icons.prevSongIcon}
                  </IconButton>
                </View>
              </View>
            </div>

            <View style={styles.navigationScene}>
              <div className={"navigationSceneStyleSupport"}>
                <View style={styles2.photosIconScene}>
                  <IconButton
                    onClick={() => {
                      navigate(
                        setPagesPosition,
                        setMainDisplay,
                        setIsUpdating,
                        "photos"
                      );
                    }}
                  >
                    {icons.photosIcon}
                  </IconButton>
                </View>
                <View style={styles2.motionPicturesIconScene}>
                  <IconButton
                    onClick={() => {
                      navigate(
                        setPagesPosition,
                        setMainDisplay,
                        setIsUpdating,
                        "motionPictures"
                      );
                    }}
                  >
                    {icons.motionPicturesIcon}
                  </IconButton>
                </View>
                <View style={styles2.journalIconScene}>
                  <IconButton
                    onClick={() => {
                      navigate(
                        setPagesPosition,
                        setMainDisplay,
                        setIsUpdating,
                        "journal"
                      );
                    }}
                  >
                    {icons.journalIcon}
                  </IconButton>
                </View>
              </div>
            </View>

            <View style={styles.changeExcerptScene}>
              <div className={"changeExcerptSceneStyleSupport"}>
                <View style={styles2.upArrowIconScene}>
                  <IconButton
                    onClick={() => {
                      switchExcerpts(
                        currentPage,
                        setExcerptIndex,
                        currentExcerpt,
                        changeExcerpt,
                        catalogLength,
                        setCurrentPhoto,
                        setCurrentMotionPicture,
                        setCurrentPassage,
                        "next",
                        setNavigationType,
                        load,
                        undefined,
                        setMusicInterval
                      );
                    }}
                  >
                    {icons.upArrowIcon}
                  </IconButton>
                </View>
                <View style={styles.pageIndex}>
                  <input
                    className={"switchExcerptInput"}
                    type={"number"}
                    onChange={(e) => {
                      switchExcerptsInputView(
                        Number(e.target.value),
                        setSwitchExcerptsInputValue
                      );
                      setStyles2({
                        ...styles2,
                        pageIndexTitleScene: styles.pageIndexTitleSceneHidden,
                        pageIndexSelectButtonScene:
                          styles.pageIndexSelectButtonScene,
                      });
                    }}
                    onBlur={(e) => {
                      if (pageIndexSelectButtonFocused) {
                        setStyles2({
                          ...styles2,
                          pageIndexTitleScene: styles.pageIndexTitleSceneHidden,
                          pageIndexSelectButtonScene:
                            styles.pageIndexSelectButtonScene,
                        });
                      } else {
                        setSwitchExcerptsInputValue(undefined);
                        setStyles2({
                          ...styles2,
                          pageIndexTitleScene: styles.pageIndexTitleScene,
                          pageIndexSelectButtonScene:
                            styles.pageIndexSelectButtonSceneHidden,
                        });
                      }
                      console.log("escape");
                    }}
                    value={
                      switchExcerptsInputValue !== undefined
                        ? `${switchExcerptsInputValue}`
                        : `${realExcerptIndex}`
                    }
                  />
                </View>
                <View style={styles2.downArrowIconScene}>
                  <IconButton
                    onClick={() => {
                      switchExcerpts(
                        currentPage,
                        setExcerptIndex,
                        currentExcerpt,
                        changeExcerpt,
                        catalogLength,
                        setCurrentPhoto,
                        setCurrentMotionPicture,
                        setCurrentPassage,
                        "prev",
                        setNavigationType,
                        load,
                        undefined,
                        setMusicInterval
                      );
                    }}
                  >
                    {icons.downArrowIcon}
                  </IconButton>
                </View>
                <View style={styles2.pageIndexSelectButtonScene}>
                  <IconButton
                    onMouseOver={() => {
                      setPageIndexSelectButtonFocused(true);
                    }}
                    onMouseLeave={() => {
                      setPageIndexSelectButtonFocused(false);
                    }}
                    onClick={() => {
                      console.log(switchExcerptsInputValue);
                      switchExcerpts(
                        currentPage,
                        setExcerptIndex,
                        currentExcerpt,
                        changeExcerpt,
                        catalogLength,
                        setCurrentPhoto,
                        setCurrentMotionPicture,
                        setCurrentPassage,
                        "selectExcerpt",
                        setNavigationType,
                        load,
                        {
                          index: Number(switchExcerptsInputValue),
                          excerptsPerPage: catalogLength,
                          resetInputValue: setSwitchExcerptsInputValue,
                        }
                      );
                      setStyles2({
                        ...styles2,
                        pageIndexSelectButtonScene:
                          styles.pageIndexSelectButtonSceneHidden,
                        pageIndexLoadIconScene: styles.pageIndexLoadIconScene,
                      });
                    }}
                  >
                    {icons.pageIndexSelectButton}
                  </IconButton>
                </View>
                <View style={styles2.pageIndexLoadIconScene}>
                  <CircularProgress
                    className={styles2.pageIndexLoadIcon}
                    size={18}
                  />
                </View>
              </div>
            </View>
          </View>
        </Toolbar>
      </AppBar>
    </View>
  );
};

const styles = StyleSheet.create({
  mainScene: {
    position: "absolute",
    top: "-5px",
    left: "0%",
  },
  navigationScene: {
    position: "relative",
    top: "30px",
    left: "-10px",
  },
  changeExcerptScene: {
    position: "relative",
    top: "60px",
    left: "-10px",
  },
  musicIconScene: {
    position: "relative",
    top: "-13px",
  },
  nextSongIconScene: { position: "absolute", bottom: "0px", left: "36px" },
  prevSongIconScene: { position: "absolute", bottom: "0px", left: "0px" },
  photosIconScene: {
    position: "relative",
    top: "-0px",
  },
  motionPicturesIconScene: {
    position: "relative",
    top: "-0px",
  },
  journalIconScene: {
    position: "relative",
    top: "-0px",
  },
  upArrowIconScene: {
    position: "relative",
    top: "-0px",
  },
  downArrowIconScene: {
    position: "relative",
    top: "-0px",
  },
  navigationTitleScene: {
    position: "absolute",
    top: "55px",
    left: "-25px",
    transform: [{ rotate: "-90deg" }],
  },
  navigationTitleText: {
    margin: "auto",
    paddingLeft: "2px",
    paddingRight: "1px",
    paddingTop: "-4px",
    paddingBottom: "2px",
    borderColor: "rgba(50, 205, 50, 0.50)",
    borderStyle: "solid",
    borderWidth: 1,
    shadowColor: "rgba(50, 205, 50, 0.75)",
    shadowRadius: 3,
    color: "slategrey",
    backgroundColor: "rgba(0, 0, 0, 1.0)",
    fontSize: 8,
    letterSpacing: 2,
  },
  pageIndex: {
    position: "relative",
    top: "-0px",
    margin: "auto",
  },
  pageIndexTextDefault: {
    paddingLeft: 7,
    paddingRight: 7,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(112, 128, 144, 0.75)",
    borderRadius: 30,
    color: "rgba(50, 205, 50, 0.75)",
    backgroundColor: "rgba(112, 128, 144, 0.25)",
  },
  pageIndexTitleScene: {
    position: "absolute",
    top: "38px",
    left: "-25px",
    transform: [{ rotate: "-90deg" }],
  },
  pageIndexTitleSceneHidden: {
    display: "none",
  },
  pageIndexTitleText: {
    margin: "auto",
    paddingLeft: "2px",
    paddingRight: "1px",
    paddingTop: "-4px",
    paddingBottom: "2px",
    borderColor: "rgba(50, 205, 50, 0.50)",
    borderStyle: "solid",
    borderWidth: 1,
    shadowColor: "rgba(50, 205, 50, 0.75)",
    shadowRadius: 3,
    color: "slategrey",
    backgroundColor: "rgba(0, 0, 0, 1.0)",
    fontSize: 8,
    letterSpacing: 2,
  },
  pageIndexSelectButtonScene: {
    position: "absolute",
    top: "25px",
    left: "-19px",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  pageIndexSelectButtonSceneHidden: {
    display: "none",
  },
  pageIndexLoadIconScene: {
    position: "absolute",
    top: "37px",
    left: "-6px",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  pageIndexLoadIconSceneHidden: {
    display: "none",
  },
});

const useStyles = makeStyles({
  "@keyframes loadEffect": {
    "0%": {
      color: "rgba(50, 250, 50, 0.75)",
      boxShadow: "0 0 4px 2px rgba(245, 80, 0, 0.75)",
    },
    "100%": {
      color: "rgba(245, 80, 0, 0.75)",
      boxShadow: "0 0 4px 2px rgba(50, 250, 50, 0.75)",
    },
  },
  progressIcon: {
    padding: "2px",
    borderRadius: "25px",
    animationName: "$loadEffect",
    animationDuration: "2000ms",
    animationDirection: "alternate",
    animationIterationCount: "infinite",
  },
});

export default MajorCatalogNavBar;
