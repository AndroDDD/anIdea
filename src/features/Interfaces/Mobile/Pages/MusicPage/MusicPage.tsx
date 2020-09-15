import React from "react";
import { View, StyleSheet } from "react-native";

import { store } from "../../../../../routes/routerBlock";
import { retrieveData } from "./MusicPageSlice";

import HeaderBar from "../../Bars/HeaderBar/HeaderBar";
import ExcerptNavigator from "../../Bars/MusicPageBars/ExcerptNavigation/ExcerptNavigation";
import MusicPlayer from "../../Bars/MusicPageBars/MusicPlayer/MusicPlayer";
import SectionNavigator from "../../Bars/MusicPageBars/SectionNavigation/SectionNavigation";
import IndexNavigator from "../../Bars/MusicPageBars/IndexNavigation/IndexNavigation";
import MainDisplay from "./MusicPageComponents/MainDisplay";

import "./MusicPageStyles.scss";

const MusicPageM: React.FC = () => {
  // Local State For Mobile Music Page
  const [localState, setLocalState] = React.useState<{
    numberOfIndexes: number;
    index: number;
    excerptTitle: string;
    motionPictures: Array<{ title: string; url: string }>;
    gallery: Array<{ title: string; fileName: string }>;
    journal: Array<{ title: string; content: string }>;
  }>({
    numberOfIndexes: 0,
    index: 0,
    excerptTitle: ``,
    motionPictures: [{ title: ``, url: `` }],
    gallery: [{ title: ``, fileName: `` }],
    journal: [{ title: ``, content: `` }],
  });

  // Declare Properties For Main Display
  const [section, setSection] = React.useState("motionPictures");
  const [currentMotionPicture, setCurrentMotionPicture] = React.useState(0);
  const [currentPhoto, setCurrentPhoto] = React.useState(0);
  const [currentPassage, setCurrentPassage] = React.useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = React.useState(false);
  const [musicInterval, setMusicInterval] = React.useState(0);
  const [motionPicturesTitles, setMotionPicturesTitles] = React.useState([``]);
  // Function Declaration For Resetting Page Data
  const resetPage = () => {
    setSection("motionPictures");
    setCurrentMotionPicture(0);
    setCurrentPhoto(0);
    setCurrentPassage(0);
    setIsMusicPlaying(false);
    setMusicInterval(0);
  };

  // Handle Detections For Store Store Changes
  store.subscribe(() => {
    console.log(`Detected Store State Manipulations.!.`);
    return;
  });

  // Handle Data Retrieval for Mobile Music Page
  React.useEffect(() => {
    retrieveData(0, {
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
        setLocalState({ ...data });
      },
    });
  }, []);

  // Handle Data Retrieval After Effects
  React.useEffect(() => {
    let motionPicturesTitlesHold = localState.motionPictures.map((data) => {
      return data.title;
    });
    setMotionPicturesTitles(motionPicturesTitlesHold);
    console.log({ localStateDataForMusicPage: localState });
  }, [localState]);

  // Handle Return View
  return (
    <View style={styles.scene}>
      <HeaderBar whichPage={"music"} />
      <ExcerptNavigator
        currentExcerptIndex={localState.index}
        excerptTitle={localState.excerptTitle}
        setLocalState={setLocalState}
        reset={resetPage}
      />
      <MusicPlayer
        play={{ isPlaying: isMusicPlaying, setPlay: setIsMusicPlaying }}
        song={{
          numOfSongs: localState.motionPictures.length,
          currentSong: currentMotionPicture,
          setSong: setCurrentMotionPicture,
          setSongInterval: setMusicInterval,
        }}
        titles={motionPicturesTitles}
      />
      <SectionNavigator
        section={{ currentSection: section, setSection: setSection }}
      />
      <IndexNavigator
        section={section}
        motionPictures={{
          numberOfIndexes: localState.motionPictures.length,
          currentIndex: currentMotionPicture,
          setIndex: setCurrentMotionPicture,
          title: localState.motionPictures[currentMotionPicture].title,
          reset: () => {
            setIsMusicPlaying(false);
            setMusicInterval(0);
          },
        }}
        gallery={{
          numberOfIndexes: localState.gallery.length,
          currentIndex: currentPhoto,
          setIndex: setCurrentPhoto,
          title: localState.gallery[currentPhoto].title,
        }}
        journal={{
          numberOfIndexes: localState.journal.length,
          currentIndex: currentPassage,
          setIndex: setCurrentPassage,
          title: localState.journal[currentPassage].title,
        }}
      />
      <MainDisplay
        section={{ currentSection: section, setSection: setSection }}
        currentMotionPicture={{
          current: currentMotionPicture,
          numOfMotionPictures: localState.motionPictures.length,
          set: setCurrentMotionPicture,
        }}
        currentPhoto={currentPhoto}
        currentPassage={currentPassage}
        musicPlaying={{ isIt: isMusicPlaying, setPlaying: setIsMusicPlaying }}
        musicInterval={{
          current: musicInterval,
          setInterval: setMusicInterval,
        }}
        excerpt={localState}
      />
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

export default MusicPageM;
