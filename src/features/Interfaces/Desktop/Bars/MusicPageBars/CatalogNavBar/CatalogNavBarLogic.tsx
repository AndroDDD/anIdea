import React from "react";
import { Text, View, StyleSheet } from "react-native";
import styled from "styled-components";

import { retrieveScrapBookData } from "../../../Pages/MusicPage/MusicPageSlice";

// Handle Display Changes for Catalog
function switchCatalogDisplay(
  whichDisplay: string,
  change: Function,
  load: { loadData: any; changeLoad: Function }
) {
  if (whichDisplay === "miniCatalog") {
    console.log("clicked for mini Cat");
    change("miniCatalogLayout");
  } else if (whichDisplay === "majorCatalog") {
    console.log("clicked for major cat");
    change("majorCatalogLayout");
  }
  load.changeLoad({ ...load.loadData, isViewChanging: true });
}

// Handle Style Changes for Catalog Navigation Bar
function changeStyle(
  whichStyle: string,
  styleSheet: any,
  changeStyle: Function,
  isSelected: boolean
) {
  if (whichStyle === "miniCatButtonDefault") {
    if (isSelected) {
      changeStyle({ ...styleSheet, miniCatText: styles.miniCatTextSelected });
    } else {
      changeStyle({ ...styleSheet, miniCatText: styles.miniCatTextDefault });
    }
  } else if (whichStyle === "miniCatButtonHovered") {
    if (isSelected) {
    } else {
      changeStyle({ ...styleSheet, miniCatText: styles.miniCatTextHovered });
    }
  } else if (whichStyle === "majorCatButtonDefault") {
    if (isSelected) {
      changeStyle({ ...styleSheet, majorCatText: styles.majorCatTextSelected });
    } else {
      changeStyle({ ...styleSheet, majorCatText: styles.majorCatTextDefault });
    }
  } else if (whichStyle === "majorCatButtonHovered") {
    if (isSelected) {
    } else {
      changeStyle({ ...styleSheet, majorCatText: styles.majorCatTextHovered });
    }
  }
}

// Handle Catalog Page Change
function switchCatalogPage(
  currentIndex: number,
  navigateTo: string,
  setLoadIcon: Function,
  load: { loadData: any; changeLoad: Function },
  selectPage?: { selectedPage: number; resetPageHold: Function },
  style?: { styleSheet: any; styleChange: Function },
  setMusicInterval?: Function
) {
  if (navigateTo === "next") {
    let nextPage = currentIndex + 1;
    retrieveScrapBookData(nextPage, {
      loadData: load.loadData,
      loadStatus: {
        isCatalogPageChanging: false,
      },
      changeLoad: load.changeLoad,
    });
    load.changeLoad({
      ...load.loadData,
      isCatalogPageChanging: true,
    });
    setLoadIcon(
      <Text style={styles.indexIconLoad}>{"Loading Next Page"}</Text>
    );
  } else if (navigateTo === "prev") {
    let prevPage = currentIndex - 1;
    if (prevPage >= 1) {
      retrieveScrapBookData(prevPage, {
        loadData: load.loadData,
        loadStatus: {
          isCatalogPageChanging: false,
        },
        changeLoad: load.changeLoad,
      });
      load.changeLoad({
        ...load.loadData,
        isCatalogPageChanging: true,
      });
      setLoadIcon(
        <Text style={styles.indexIconLoad}>{"Loading Previous Page"}</Text>
      );
    }
  } else if (navigateTo === "selectedPage") {
    if (selectPage) {
      retrieveScrapBookData(
        selectPage?.selectedPage,
        {
          loadData: load.loadData,
          loadStatus: {
            isCatalogPageChanging: false,
          },
          changeLoad: load.changeLoad,
        },
        {
          type: "reset",
          execute: () => {
            selectPage.resetPageHold(undefined);
          },
        }
      );
      load.changeLoad({
        ...load.loadData,
        isCatalogPageChanging: true,
      });
      if (style) {
        style.styleChange({
          ...style.styleSheet,
          catPageTitle: styles.catPageTitle,
          catPageSearchButtonScene: styles.catPageSearchButtonSceneHidden,
        });
      }
      setLoadIcon(
        <Text style={styles.indexIconLoad}>{"Loading Selected Page"}</Text>
      );
    }
  }
  if (setMusicInterval) {
    setMusicInterval(0);
  }
}

// Update Cat Search Input Value
function updatePageIndexHold(value: any, changeValue: Function) {
  changeValue(value);
}

// Handle Title Searches
async function handleSearch(
  titles: Array<string>,
  query: string,
  setQuery: Function,
  setFoundQuerys: Function,
  styleSheet: any,
  setStyles: Function,
  resultsFocused: Function,
  changeExcerptIndex: Function,
  handleDisplay: Function,
  layout: { type: string; change: Function },
  load: { loadData: any; changeLoad: Function },
  setMusicInterval?: Function
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

      if (slicedTitleToCompare === queryToCompare) {
        let titleView = (
          <View key={`${title} ${i}`}>
            <SearchResultButton
              onMouseOver={() => {
                resultsFocused(true);
                console.log("searchResultFocused");
              }}
              onMouseLeave={() => {
                resultsFocused(false);
                console.log("searchResultsUnfocused");
              }}
              onClick={() => {
                resultButtonNavigation(
                  retrieveScrapBookData,
                  titlesLength,
                  i + 1,
                  changeExcerptIndex,
                  handleDisplay,
                  layout,
                  load,
                  setMusicInterval
                );
                setQuery(``);
                setStyles({
                  ...styleSheet,
                  searchResultsScene: styles.searchResultsSceneHidden,
                  excerptSearchLoadIconScene: styles.excerptSearchLoadIconScene,
                });
              }}
            >
              {title}
            </SearchResultButton>
          </View>
        );

        foundQuerys.push(titleView);
      }
    }

    let foundQuerysLength = foundQuerys.length;
    if (foundQuerysLength > 0) {
      let tempFoundQuerysHold = foundQuerys.slice(0, 5);
      setFoundQuerys(tempFoundQuerysHold);
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
function resultButtonNavigation(
  setPage: Function,
  titlesLength: number,
  index: number,
  changeExcerptIndex: Function,
  handleDisplay: Function,
  layout: { type: string; change: Function },
  load: { loadData: any; changeLoad: Function },
  setMusicInterval?: Function
) {
  setPage(
    1,
    undefined,
    {
      type: "reset",
      execute: () => {
        if (layout.type === "majorCatalogLayout") {
          let indexFloored = Math.floor(index / 5) * 5;
          let tempIndexHold = index % 5 === 0 ? 4 : index - indexFloored - 1;
          console.log({ CatalogNavBarLogic: tempIndexHold });
          handleDisplay("majorCatalogDisplay", tempIndexHold);
        } else if (layout.type === "miniCatalogLayout") {
          handleDisplay("miniCatalogDisplay");
        }
      },
    },
    index
  );
  if (setMusicInterval) {
    setMusicInterval(0);
  }
}

// Style Sheet
const styles = StyleSheet.create({
  miniCatTextDefault: {
    color: "rgba(50, 205, 50, 0.75)",
    textShadowRadius: 5,
    textShadowColor: "rgba(112, 128, 144, 0.75)",
  },
  miniCatTextHovered: {
    color: "rgba(255, 100, 0, 0.85)",
    textShadowRadius: 10,
    textShadowColor: "rgba(112, 128, 144, 1)",
  },
  miniCatTextSelected: {
    paddingLeft: 5,
    paddingRight: 5,
    color: "rgba(255, 100, 0, 0.85)",
    backgroundColor: "rgba(0, 0, 0, 1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(112, 128, 144, 0.75)",
    shadowRadius: 5,
    shadowColor: "rgba(112, 128, 144, 0.75)",
    textShadowRadius: 10,
    textShadowColor: "rgba(112, 128, 144, 1)",
  },
  majorCatTextDefault: {
    color: "rgba(50, 205, 50, 0.75)",
    textShadowRadius: 5,
    textShadowColor: "rgba(112, 128, 144, 0.75)",
  },
  majorCatTextHovered: {
    color: "rgba(255, 100, 0, 0.85)",
    textShadowRadius: 10,
    textShadowColor: "rgba(112, 128, 144, 1)",
  },
  majorCatTextSelected: {
    paddingLeft: 5,
    paddingRight: 5,
    color: "rgba(255, 100, 0, 0.85)",
    backgroundColor: "rgba(0, 0, 0, 1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(112, 128, 144, 0.75)",
    shadowRadius: 5,
    shadowColor: "rgba(112, 128, 144, 0.75)",
    textShadowRadius: 10,
    textShadowColor: "rgba(112, 128, 144, 1)",
  },
  catPageTitle: {
    position: "absolute",
    bottom: "-8px",
    margin: "auto",
    paddingLeft: "2px",
    paddingRight: "1px",
    paddingTop: "-4px",
    paddingBottom: "0px",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateX: 0 }],
    borderColor: "rgba(50, 205, 50, 0.50)",
    borderStyle: "solid",
    borderWidth: 1,
    shadowColor: "rgba(50, 205, 50, 0.75)",
    shadowRadius: 5,
    color: "slategrey",
    backgroundColor: "rgba(0, 0, 0, 1.0)",
    fontSize: 8,
    letterSpacing: 2,
  },
  catPageSearchButtonSceneHidden: { display: "none" },
  indexIconLoad: {
    paddingLeft: 5,
    paddingRight: 5,
    color: "rgba(250, 100, 0, 0.85)",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(112, 128, 114, 0.75)",
    borderRadius: 20,
    textShadowRadius: 5,
    textShadowColor: "rgba(112, 128, 144, 0.75)",
  },
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
  excerptSearchLoadIconScene: {
    position: "absolute",
    top: "-1px",
    left: "-30px",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
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
  switchCatalogDisplay,
  changeStyle,
  switchCatalogPage,
  updatePageIndexHold,
  handleSearch,
};
