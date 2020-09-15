import React from "react";
import {
  PlayCircleOutlineSharp,
  PauseCircleOutlineSharp,
} from "@material-ui/icons";

import { retrieveScrapBookData } from "../../../../Pages/MusicPage/MusicPageSlice";
import "./MajorCatalogNavBarStyles.scss";

// Pause or Play Music Player
function switchMusicIcon(
  iconSheet: any,
  iconChangeFunction: Function,
  playMusicFunction: Function,
  active: boolean,
  interaction: string
) {
  console.log({ isMusicPlaying: active });
  if (active) {
    iconChangeFunction({
      ...iconSheet,
      musicIcon: (
        <PlayCircleOutlineSharp
          className={"musicIconInactive"}
          style={{ margin: "auto", width: "55px", height: "auto" }}
        />
      ),
    });
    if (interaction === "button") {
      playMusicFunction(false);
    }
  } else {
    iconChangeFunction({
      ...iconSheet,
      musicIcon: (
        <PauseCircleOutlineSharp
          className={"musicIconActive"}
          style={{ margin: "auto", width: "55px", height: "auto" }}
        />
      ),
    });
    if (interaction === "button") {
      playMusicFunction(true);
    }
  }
}

// Handle Catalog Page Navigation
function navigate(
  setPagesPosition: Function,
  setMainDisplay: Function,
  updating: Function,
  navigateTo: string
) {
  if (navigateTo === "photos") {
    setPagesPosition({ firstPosition: 1, secondPosition: 2, thirdPosition: 3 });
    setMainDisplay("photos");
  } else if (navigateTo === "motionPictures") {
    setPagesPosition({ firstPosition: 2, secondPosition: 3, thirdPosition: 1 });
    setMainDisplay("motionPictures");
  } else if (navigateTo === "journal") {
    setPagesPosition({ firstPosition: 3, secondPosition: 1, thirdPosition: 2 });
    setMainDisplay("journal");
    console.log("navigating to journal page... .. .. .");
  }
}

// Handle Excerpt Input Search Scene
function switchExcerptsInputView(value: number, changeValue: Function) {
  changeValue(value);
}

// Handle Switching Excerpts
function switchExcerpts(
  currentPage: number,
  setExcerptIndex: Function,
  currentExcerpt: number,
  changeExcerpt: Function,
  catalogLength: number,
  setCurrentPhoto: Function,
  setCurrentMotionPicture: Function,
  setCurrentPassage: Function,
  switchHow: string,
  navigationType: Function,
  load: {
    initialDataSet: {
      initialStylesSet: boolean;
      isViewChanging: boolean;
      isCatalogPageChanging: boolean;
    };
    setInitialDataSet: Function;
  },
  selectedExcerpt?: {
    index: number;
    excerptsPerPage: number;
    resetInputValue: Function;
  },
  setMusicInterval?: Function
) {
  if (switchHow === "next") {
    let nextExcerpt = currentExcerpt + 1;
    if (nextExcerpt >= catalogLength) {
      navigationType("nextPage");
      let nextPage = currentPage + 1;
      retrieveScrapBookData(nextPage);
    } else {
      navigationType("");
      changeExcerpt("majorCatalogDisplay", nextExcerpt);
    }
  } else if (switchHow === "prev") {
    let prevExcerpt = currentExcerpt - 1;
    let lastExcerpt = catalogLength - 1;
    if (prevExcerpt < 0) {
      let prevPage = currentPage - 1;
      if (prevPage >= 1) {
        navigationType("prevPage");
        retrieveScrapBookData(prevPage, undefined, {
          type: "reset",
          execute: () => {
            changeExcerpt("majorCatalogDisplay", lastExcerpt);
          },
        });
      }
    } else {
      navigationType("");
      changeExcerpt("majorCatalogDisplay", prevExcerpt);
    }
  } else if (switchHow === "selectExcerpt") {
    console.log(
      "attempting to retrieve related data for mCNB from selected page index.!.",
      selectedExcerpt
    );
    if (selectedExcerpt) {
      navigationType("selectExcerpt");
      let indexFloored =
        Math.floor(selectedExcerpt.index / selectedExcerpt.excerptsPerPage) *
        selectedExcerpt.excerptsPerPage;
      let tempIndexHold =
        selectedExcerpt.index % selectedExcerpt.excerptsPerPage === 0
          ? selectedExcerpt.excerptsPerPage - 1
          : selectedExcerpt.index - indexFloored - 1;
      selectedExcerpt.resetInputValue(undefined);
      retrieveScrapBookData(
        1,
        undefined,
        {
          type: "reset",
          execute: () => {
            changeExcerpt("majorCatalogDisplay", tempIndexHold);
          },
        },
        selectedExcerpt.index
      );
    }
  }

  setCurrentPhoto(0);
  setCurrentMotionPicture(0);
  setCurrentPassage(0);
  if (setMusicInterval) {
    setMusicInterval(0);
  }
}

function switchSong(
  whichWay: string,
  currentIndex: number,
  setIndex: Function,
  arrayLength: number,
  resetMusicInterval: Function
) {
  let lengthReconfig = arrayLength - 1;
  let newIndex = 0;
  if (whichWay === "next") {
    if (currentIndex < lengthReconfig) {
      newIndex = currentIndex + 1;
    } else if (currentIndex >= lengthReconfig) {
      newIndex = 0;
    }
  } else if (whichWay === "prev") {
    if (currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (currentIndex <= 0) {
      newIndex = lengthReconfig;
    }
  }
  resetMusicInterval(0);
  setIndex(newIndex);
}

export {
  switchMusicIcon,
  navigate,
  switchExcerptsInputView,
  switchExcerpts,
  switchSong,
};
