import React from "react";
import { View, StyleSheet } from "react-native";
import styled from "styled-components";
import "../MajorCatalogBarsStyles.scss";

// Set Next Photo for Major Catalog
function nextMotionPicture(
  currentIndex: number,
  setNextMotionPicture: Function,
  catalogLength: number,
  setMusicInterval: Function
) {
  console.log("clicked Next", {
    currentIndex,
    setNextMotionPicture,
    catalogLength,
  });
  let arrayIndexHold = catalogLength - 1;
  if (currentIndex < arrayIndexHold && currentIndex >= 0) {
    setNextMotionPicture(currentIndex + 1);
  } else {
    setNextMotionPicture(0);
  }
  setMusicInterval(0);
}

// Set Prev Photo for Major Catalog
function prevMotionPicture(
  currentIndex: number,
  setPrevMotionPicture: Function,
  catalogLength: number,
  setMusicInterval: Function
) {
  console.log("clicked Prev");
  let arrayIndexHold = catalogLength - 1;
  if (currentIndex > 0 && currentIndex <= arrayIndexHold) {
    setPrevMotionPicture(currentIndex - 1);
  } else {
    setPrevMotionPicture(arrayIndexHold);
  }
  setMusicInterval(0);
}

// Handle Title Searches
async function handleSearch(
  titles: Array<string>,
  query: string,
  setFoundQuerys: Function,
  styleSheet: any,
  setStyles: Function,
  setPage: Function,
  resultsFocused: Function
) {
  console.log({ query: query, titles: titles });
  let titlesLength = titles.length;
  let queryLength = query.length;

  if (queryLength > 0) {
    let foundQuerys = [];
    for (let i = 0; i < titlesLength; i++) {
      let title = titles[i];
      let slicedTitle = title.slice(0, queryLength);
      let queryToCompare = query.toLowerCase();
      let slicedTitleToCompare = slicedTitle.toLowerCase();

      let titleView = (
        <View key={`${title} ${i}`}>
          <SearchResultButton
            onMouseOver={() => {
              resultsFocused(true);
            }}
            onMouseLeave={() => {
              resultsFocused(false);
            }}
            onClick={() => {
              resultButtonNavigation(setPage, i);
              setStyles({
                ...styleSheet,
                searchResultsScene: styles.searchResultsSceneHidden,
              });
            }}
          >
            {title}
          </SearchResultButton>
        </View>
      );

      if (slicedTitleToCompare === queryToCompare) {
        foundQuerys.push(titleView);
      }
    }

    let foundQuerysLength = foundQuerys.length;
    if (foundQuerysLength > 0) {
      setFoundQuerys(foundQuerys);
      setStyles({
        ...styleSheet,
        searchResultsScene: styles.searchResultsSceneDisplayed,
      });
    }
    console.log({ foundQuerysLength });
  } else {
    setFoundQuerys([]);
    setStyles({
      ...styleSheet,
      searchResultsScene: styles.searchResultsSceneHidden,
    });
    console.log("no found query .!.");
  }
}

// Handle Result Button Page Navigation
function resultButtonNavigation(setPage: Function, index: number) {
  setPage(index);
}

const styles = StyleSheet.create({
  searchResultsSceneDisplayed: {
    position: "absolute",
    top: "25px",
    width: "100%",
    color: "orange",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(50, 205, 50, 0.75)",
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    shadowRadius: 5,
    shadowColor: "rgba(50, 205, 50, 0.75)",
  },
  searchResultsSceneHidden: {
    display: "none",
  },
});

const SearchResultButton = styled.button`
  margin: auto;
  padding: 5px;
  width: 100%;
  border: 1px solid rgba(50, 205, 50, 0.75);
  color: black;
  background-color: rgba(112, 128, 144, 0.95);
  text-shadow: 0px 0px 3px whitesmoke;
  font-size: 15px;
  font-weight: bold;
  :hover {
    color: rgba(50, 205, 50, 0.75);
    background-color: rgba(0, 0, 0, 1);
    text-shadow: none;
    cursor: pointer;
  }
`;

export {
  nextMotionPicture,
  prevMotionPicture,
  handleSearch,
  resultButtonNavigation,
};
