import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components";
import ReactPlayer from "react-player";

import MajorCatalogNavBar from "../../../../Bars/MusicPageBars/MajorCatalogBars/MajorCatalogNavBar/MajorCatalogNavBar";
import MajorCatalogPhotoBar from "../../../../Bars/MusicPageBars/MajorCatalogBars/MajorCatalogPhotoBar/MajorCatalogPhotoBar";
import MajorCatalogMotionPictureBar from "../../../../Bars/MusicPageBars/MajorCatalogBars/MajorCatalogMotionPictureBar/MajorCatalogMotionPictureBar";
import MajorCatalogJournalBar from "../../../../Bars/MusicPageBars/MajorCatalogBars/MajorCatalogJournalBar/MajorCatalogJournalBar";

import "./MajorPhotoCatalogStyles.scss";

interface CatalogExcerptInterface {
  motionPictures: Array<{ title: string; url: string }>;
  photos: Array<{
    title: string;
    source: string;
  }>;
  journal: Array<{ title: string; content: string }>;
  currentPage: number;
  setExcerptIndex: Function;
  currentExcerpt: number;
  realCatIndexes: Array<number>;
  changeExcerpt: Function;
  catalogLength: number;
  layout: string;
  mainExcerptsTitles: Array<string>;
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

const CatalogExcerptExpanded: React.FC<CatalogExcerptInterface> = ({
  motionPictures,
  photos,
  journal,
  currentPage,
  setExcerptIndex,
  currentExcerpt,
  realCatIndexes,
  changeExcerpt,
  catalogLength,
  layout,
  mainExcerptsTitles,
  load,
}) => {
  const [currentCatPage, setCurrentCatPage] = React.useState(0);
  const [currentExcerptIndex, setCurrentExcerptIndex] = React.useState(0);
  const [currentPhoto, setCurrentPhoto] = React.useState(0);
  const [photosTitles, setPhotosTitles] = React.useState([``]);
  const [currentMotionPicture, setCurrentMotionPicture] = React.useState(0);
  const [motionPicturesTitles, setMotionPicturesTitles] = React.useState([``]);
  const [currentPassage, setCurrentPassage] = React.useState(0);
  const [journalTitles, setJournalTitles] = React.useState([``]);
  const [isMusicPlaying, setIsMusicPlaying] = React.useState(false);
  const [currentMusicInterval, setCurrentMusicInterval] = React.useState(0);
  const [screenLayout, setScreenLayout] = React.useState([
    { majorCatalogNavBar: <></> },
    {
      layout: <></>,
    },
    { layout: <></> },
    { layout: <></> },
  ]);
  const [pagesPosition, setPagesPosition] = React.useState({
    firstPosition: 1,
    secondPosition: 2,
    thirdPosition: 3,
  });
  const [mainDisplay, setMainDisplay] = React.useState("photos");

  const autoPlayNext = (
    currentIndex: number,
    setIndex: Function,
    arrayLength: number
  ) => {
    let lengthReconfig = arrayLength - 1;
    let newIndex = 0;
    if (currentIndex < lengthReconfig) {
      newIndex = currentIndex + 1;
    } else if (currentIndex >= lengthReconfig) {
      newIndex = 0;
    }
    setCurrentMusicInterval(0);
    setCurrentMotionPicture(newIndex);
    setIsMusicPlaying(true);
  };

  React.useEffect(() => {
    if (currentExcerptIndex !== currentExcerpt) {
      setCurrentExcerptIndex(currentExcerpt);
      setCurrentMusicInterval(0);
    } else {
      if (layout === "majorCatalogLayout") {
        let photosTitlesHold = photos.map((photo) => {
          let photoTitleHold = photo.title;
          return photoTitleHold;
        });
        let motionPicturesTitlesHold = motionPictures.map((motionPicture) => {
          let motionPictureTitleHold = motionPicture.title;
          return motionPictureTitleHold;
        });
        let journalTitlesHold = journal.map((passage) => {
          let passageTitleHold = passage.title;
          return passageTitleHold;
        });

        // Major Catalog Navigation Bar Setup
        let majorCatalogNavBarHold = (
          <View style={styles.catalogNavBar}>
            <MajorCatalogNavBar
              isMusicPlaying={isMusicPlaying}
              playMusicFunction={setIsMusicPlaying}
              musicInterval={currentMusicInterval}
              setMusicInterval={setCurrentMusicInterval}
              setPagesPosition={setPagesPosition}
              setExcerptIndex={setExcerptIndex}
              currentExcerpt={currentExcerpt}
              changeExcerpt={changeExcerpt}
              catalogLength={catalogLength}
              currentMotionPicture={currentMotionPicture}
              motionPicturesLength={motionPicturesTitles.length}
              setCurrentPhoto={setCurrentPhoto}
              setCurrentMotionPicture={setCurrentMotionPicture}
              setCurrentPassage={setCurrentPassage}
              mainDisplay={mainDisplay}
              setMainDisplay={setMainDisplay}
              realCatIndexes={realCatIndexes}
              currentPage={currentPage}
              load={load}
            />
          </View>
        );

        // Photo View Setup
        let imagePositionSupport = { transform: "translateY(30px)" };

        let photoViewHold = (
          <View style={styles.photosScene}>
            <View
              style={
                mainDisplay === "photos"
                  ? styles.middlePhotoSceneDisplayed
                  : styles.middlePhotoScene
              }
            >
              <div className={"photosSceneStyleSupport"}>
                <img
                  src={photos[currentPhoto].source}
                  alt={"Testing for Major Catalog"}
                  width={"auto"}
                  height={"90%"}
                  style={
                    mainDisplay === "photos"
                      ? {
                          ...imagePositionSupport,
                          border: "solid 1px rgba(0, 0, 0, 0.75)",
                          boxShadow: "0px 0px 4px 1px rgba(50, 205, 50, 0.75)",
                        }
                      : {
                          ...imagePositionSupport,
                          border: "solid 1px rgba(0, 0, 0, 0.75)",
                          boxShadow:
                            "0px 0px 12px 3px rgba(112, 114, 128, 0.75)",
                        }
                  }
                />
              </div>
            </View>
            <View
              style={
                mainDisplay === "photos"
                  ? styles.photosNavBar
                  : styles.photosNavBarHidden
              }
            >
              <MajorCatalogPhotoBar
                currentIndex={currentPhoto}
                setNextPhoto={setCurrentPhoto}
                catalogLength={photos.length}
                photosTitles={photosTitlesHold}
              />
            </View>
          </View>
        );

        // Motion Pictures Setup
        let motionPicturesViewHold = (
          <View
            style={
              mainDisplay === "motionPictures"
                ? styles.motionPictureSceneDisplayed
                : styles.motionPictureScene
            }
          >
            <View
              style={
                mainDisplay === "motionPictures"
                  ? styles.motionPicturePlayerDisplayed
                  : styles.motionPicturePlayerHidden
              }
            >
              <ReactPlayer
                width={"100%"}
                height={"100%"}
                controls
                url={motionPictures[currentMotionPicture].url}
                config={{
                  youtube: {
                    playerVars: { start: currentMusicInterval },
                  },
                }}
                playing={isMusicPlaying}
                onStart={() => {
                  console.log(
                    `React Player has loaded with message: stateHold: ${currentMusicInterval}`
                  );
                }}
                onPlay={() => {
                  setIsMusicPlaying(true);
                }}
                onPause={() => {
                  setIsMusicPlaying(false);
                }}
                onEnded={() => {
                  let arrayLengthHold = motionPicturesTitles.length;
                  autoPlayNext(
                    currentMotionPicture,
                    setCurrentMotionPicture,
                    arrayLengthHold
                  );
                }}
                onProgress={(prop) => {
                  let musicInterval = Math.round(prop.playedSeconds);
                  let reconfiguredInterval = 0;
                  if (musicInterval < currentMusicInterval) {
                    reconfiguredInterval = currentMusicInterval;
                  } else if (musicInterval > currentMusicInterval) {
                    reconfiguredInterval = musicInterval;
                  }
                  setCurrentMusicInterval(reconfiguredInterval);
                  console.log(
                    `MPC reactplayer progress prop: ${musicInterval}, stateHold: ${currentMusicInterval}`
                  );
                }}
              />
            </View>
            <View
              style={
                mainDisplay === "motionPictures"
                  ? styles.motionPicturePlayerPlaceHolderHidden
                  : styles.motionPicturePlayerPlaceHolderDisplayed
              }
            >
              <img
                src={require("../../../../../../../media/Backgrounds/daimondPlayButton.jpg")}
                alt={"Daimond Play Button"}
                width={"50%"}
                height={"auto"}
                style={{
                  border: "solid 1px rgba(112, 114, 128, 1.0)",
                  boxShadow: "0px 0px 5px 5px rgba(112, 114, 128, 0.75)",
                  filter: "brightness(75%)",
                }}
              />
            </View>
            <View
              style={
                mainDisplay === "motionPictures"
                  ? styles.motionPicturesNavBar
                  : styles.motionPicturesNavBarHidden
              }
            >
              <MajorCatalogMotionPictureBar
                currentIndex={currentMotionPicture}
                setNextMotionPicture={setCurrentMotionPicture}
                catalogLength={motionPictures.length}
                motionPicturesTitles={motionPicturesTitlesHold}
                musicInterval={currentMusicInterval}
                setMusicInterval={setCurrentMusicInterval}
              />
            </View>
          </View>
        );
        // Journal View Set Up
        let journalViewHold = (
          <View style={styles.journalScene}>
            <View style={styles.journalContent}>
              <Text
                style={
                  mainDisplay === "journal"
                    ? styles.passageTitleDisplayed
                    : styles.passageTitle
                }
              >
                {journal[currentPassage].title}
              </Text>
              <Text
                style={
                  mainDisplay === "journal"
                    ? styles.mainPassageTextDisplayed
                    : styles.mainPassageText
                }
              >
                {journal[currentPassage].content}
              </Text>
            </View>
            <View
              style={
                mainDisplay === "journal"
                  ? styles.journalNavBar
                  : styles.journalNavBarHidden
              }
            >
              <MajorCatalogJournalBar
                currentIndex={currentPassage}
                setNextPassage={setCurrentPassage}
                catalogLength={journal.length}
                journalTitles={journalTitlesHold}
              />
            </View>
          </View>
        );
        setPhotosTitles(photosTitlesHold);
        setMotionPicturesTitles(motionPicturesTitlesHold);
        setJournalTitles(journalTitlesHold);
        setScreenLayout([
          { majorCatalogNavBar: majorCatalogNavBarHold },
          {
            layout: photoViewHold,
          },
          { layout: motionPicturesViewHold },
          { layout: journalViewHold },
        ]);
        console.log({
          majorCatalogPhotosTitles: photosTitlesHold,
          majorCatalogMotionPicturesTitles: motionPicturesTitlesHold,
          majorCatalogJournalTitles: journalTitlesHold,
        });
      }
    }
    return;
  }, [
    currentExcerpt,
    currentExcerptIndex,
    photos,
    currentPhoto,
    currentMotionPicture,
    currentPassage,
    isMusicPlaying,
    currentMusicInterval,
    pagesPosition,
    mainDisplay,
    layout,
  ]);

  return (
    <View style={styles.mainScene}>
      <View style={styles.mainExcerptTitleScene}>
        <ExcerptTitleText>
          {mainExcerptsTitles[currentExcerpt]}
        </ExcerptTitleText>
      </View>
      {screenLayout[0].majorCatalogNavBar}
      <View style={styles.firstPagePosition}>
        {screenLayout[pagesPosition.firstPosition].layout}
      </View>
      <View style={styles.secondPagePosition}>
        {screenLayout[pagesPosition.secondPosition].layout}
      </View>
      <View style={styles.thirdPagePosition}>
        {screenLayout[pagesPosition.thirdPosition].layout}
      </View>
    </View>
  );
};

const ExcerptTitleText = styled.span`
  position: absolute;
  left: 2px;
  margin: auto;
  padding-bottom: 5px;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 5px;
  color: rgba(112, 128, 144, 1);
  border: 1px solid rgba(112, 128, 144, 1);
  text-align: center;
  text-shadow: 0px 0px 5px rgba(245, 80, 0, 1);
  font-size: 25px;
  box-shadow: inset 0px 0px 3px 1px rgba(245, 80, 0, 0.5);
`;

const styles = StyleSheet.create({
  mainScene: {
    margin: "auto",
    width: "100%",
    height: "100%",
    minHeight: "780px",
  },
  firstPagePosition: {
    position: "relative",
    left: "115px",
    top: "70px",
    width: "100%",
  },
  secondPagePosition: {
    position: "relative",
    left: "33%",
    top: "70px",
    zIndex: -1,
    width: "100%",
  },
  thirdPagePosition: {
    position: "relative",
    left: "66%",
    top: "70px",
    zIndex: -2,
    width: "100%",
  },
  mainExcerptTitleScene: {
    position: "absolute",
    left: "10px",
    transform: [{ translateY: -10 }],
    width: "100%",
    color: "slategrey",
  },
  catalogNavBar: {
    position: "absolute",
    top: "53px",
    left: "17px",
  },
  photosScene: {
    position: "absolute",
    width: "auto",
    height: "100%",
  },
  middlePhotoScene: {
    position: "relative",
    top: "40px",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
    width: "675px",
    height: "675px",
    backgroundColor: "rgba(0, 0, 0, 1.0)",
    borderColor: "rgba(112, 114, 128, 0.50)",
    borderWidth: 1,
    borderRadius: 3,
    borderStyle: "solid",
    shadowColor: "rgba(112, 114, 128, 1.0)",
    shadowRadius: 10,
  },
  middlePhotoSceneDisplayed: {
    position: "relative",
    top: "40px",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
    width: "675px",
    height: "675px",
    backgroundColor: "rgba(0, 0, 0, 1.0)",
    borderColor: "rgba(50, 205, 50, 0.50)",
    borderWidth: 1,
    borderRadius: 3,
    borderStyle: "solid",
  },
  photosNavBar: {
    position: "absolute",
    top: "-40px",
    left: "-34px",
    margin: "auto",
    paddingTop: "5px",
    justifyContent: "center",
    alignItems: "center",
  },
  photosNavBarHidden: { display: "none" },
  motionPictureScene: {
    position: "absolute",
    top: "40px",
    width: "675px",
    height: "675px",
  },
  motionPictureSceneDisplayed: {
    position: "absolute",
    top: "40px",
    width: "675px",
    height: "675px",
  },
  motionPicturePlayerDisplayed: {
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: "0px",
    width: "675px",
    height: "675px",
    backgroundColor: "black",
    borderColor: "rgba(50, 205, 50, 0.50)",
    borderWidth: 1,
    borderRadius: 3,
    borderStyle: "solid",
  },
  motionPicturePlayerHidden: {
    display: "none",
  },
  motionPicturePlayerPlaceHolderDisplayed: {
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: "0px",
    width: "100%",
    height: "675px",
    backgroundColor: "rgba(25, 105, 25, 1.0)",
    borderColor: "rgba(112, 114, 128, 0.50)",
    borderWidth: 1,
    borderRadius: 3,
    borderStyle: "solid",
    shadowColor: "rgba(112, 114, 128, 1.0)",
    shadowRadius: 10,
  },
  motionPicturePlayerPlaceHolderHidden: {
    display: "none",
  },

  motionPicturesNavBar: {
    position: "absolute",
    top: "-80px",
    left: "-34px",
    margin: "auto",
    paddingTop: "5px",
    justifyContent: "center",
    alignItems: "center",
  },
  motionPicturesNavBarHidden: { display: "none" },

  journalScene: {
    position: "absolute",
    top: "40px",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
    width: "675px",
    height: "675px",
  },
  journalContent: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  passageTitle: {
    paddingTop: "20px",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    height: "10%",
    color: "orange",
    backgroundColor: "black",
    borderColor: "rgba(112, 114, 128, 0.50)",
    borderWidth: 1,
    borderRadius: 3,
    borderStyle: "solid",
    shadowColor: "rgba(112, 114, 128, 1.0)",
    shadowRadius: 10,
  },
  passageTitleDisplayed: {
    paddingTop: "20px",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    height: "10%",
    color: "orange",
    backgroundColor: "black",
    borderColor: "rgba(50, 205, 50, 0.50)",
    borderWidth: 1,
    borderRadius: 3,
    borderStyle: "solid",
  },
  mainPassageText: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10px",
    paddingBottom: "10px",
    width: "100%",
    height: "90%",
    color: "orange",
    backgroundColor: "black",
    borderColor: "rgba(112, 114, 128, 0.50)",
    borderWidth: 1,
    borderRadius: 3,
    borderStyle: "solid",
    shadowColor: "rgba(112, 114, 128, 1.0)",
    shadowRadius: 10,
  },
  mainPassageTextDisplayed: {
    overflowY: "scroll",
    overflowX: "hidden",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10px",
    paddingBottom: "10px",
    width: "100%",
    height: "90%",
    color: "orange",
    backgroundColor: "black",
    borderColor: "rgba(50, 205, 50, 0.50)",
    borderWidth: 1,
    borderRadius: 3,
    borderStyle: "solid",
  },
  journalNavBar: {
    position: "absolute",
    top: "-80px",
    left: "-34px",
    margin: "auto",
    paddingTop: "5px",
    justifyContent: "center",
    alignItems: "center",
  },
  journalNavBarHidden: { display: "none" },
});

export default CatalogExcerptExpanded;
