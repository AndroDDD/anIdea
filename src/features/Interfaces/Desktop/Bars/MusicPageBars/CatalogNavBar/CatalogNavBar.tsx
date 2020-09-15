import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { ArrowForwardIosSharp, ArrowBackIosSharp } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";
import styled from "styled-components";

import {
  switchCatalogDisplay,
  changeStyle,
  switchCatalogPage,
  updatePageIndexHold,
  handleSearch,
} from "./CatalogNavBarLogic";
import "./CatalogNavBarStyles.scss";

interface CatalogNavBarInterface {
  display: string;
  displayChange: Function;
  load: { loadData: any; changeLoad: Function };
  catalogIndex: number;
  mainExcerptsTitles: Array<string>;
  changeExcerptIndex: Function;
  layout: { type: string; change: Function };
}

const CatalogNavBar: React.FC<CatalogNavBarInterface> = ({
  display,
  displayChange,
  load,
  catalogIndex,
  mainExcerptsTitles,
  changeExcerptIndex,
  layout,
}) => {
  // Define Styles
  const classes = useStyles();
  const [styles2, setStyles2] = React.useState<{
    miniCatText: any;
    majorCatText: any;
    searchResultsScene: any;
    prevIcon: any;
    nextIcon: any;
    catPageIndex: any;
    catPageTitle: any;
    catPageSearchButtonScene: any;
    catPageSearchButtonText: any;
    excerptSearchLoadIconScene: any;
    excerptSearchLoadIcon: any;
  }>({
    miniCatText:
      display === "miniCatalogLayout"
        ? styles.miniCatTextSelected
        : styles.miniCatTextDefault,
    majorCatText:
      display === "majorCatalogLayout"
        ? styles.majorCatTextSelected
        : styles.majorCatTextDefault,
    searchResultsScene: styles.searchResultsSceneHidden,
    prevIcon: {
      width: "17px",
      height: "17px",
      color: "rgba(50, 205, 50, 0.75)",
      background: "rgba(112, 128, 144, 0.5)",
      boxShadow: "0px 0px 5px 2px rgba(50, 205, 50, 0.75)",
    },
    nextIcon: {
      width: "17px",
      height: "17px",
      color: "rgba(50, 205, 50, 0.75)",
      background: "rgba(112, 128, 144, 0.5)",
      boxShadow: "0px 0px 5px 2px rgba(50, 205, 50, 0.75)",
    },
    catPageIndex: styles.catPageIndexDefault,
    catPageTitle: styles.catPageTitle,
    catPageSearchButtonScene: styles.catPageSearchButtonSceneHidden,
    catPageSearchButtonText: styles.catPageSearchButtonText,
    excerptSearchLoadIconScene: styles.excerptSearchLoadIconSceneHidden,
    excerptSearchLoadIcon: classes.progressIcon,
  });

  const [indexIcon, setIndexIcon] = React.useState(
    <Text style={styles2.catPageIndex}>{catalogIndex}</Text>
  );

  const [selectedPageHold, setSelectedPageHold] = React.useState();
  const [
    catPageSearchButtonFocused,
    setCatPageSearchButtonFocused,
  ] = React.useState(false);

  const [query, setQuery] = React.useState(``);
  const [searchResults, setSearchResults] = React.useState([
    <div key={"initialData"}></div>,
  ]);
  const [searchResultsFocused, setSearchResultsFocused] = React.useState(false);

  function handleDisplay(whichDisplay: string, whichExcerpt?: number) {
    if (whichDisplay === "majorCatalogDisplay") {
      if (whichExcerpt) {
        changeExcerptIndex(whichExcerpt);
      } else {
        changeExcerptIndex(0);
      }
      layout.change("majorCatalogLayout");
    } else if ((whichDisplay = "miniCatalogDisplay")) {
      layout.change("miniCatalogLayout");
    }
    console.log({ EDBNavigation: layout.type });
    load.changeLoad({ ...load.loadData, isViewChanging: true });
  }

  // Update View
  React.useEffect(() => {
    let tempStyleSheet = {
      ...styles2,
      miniCatText:
        display === "miniCatalogLayout"
          ? styles.miniCatTextSelected
          : styles.miniCatTextDefault,
      majorCatText:
        display === "majorCatalogLayout"
          ? styles.majorCatTextSelected
          : styles.majorCatTextDefault,
      catPageIndex: styles.catPageIndexDefault,
    };
    setStyles2(tempStyleSheet);

    if (load.loadData.isCatalogPageChanging === false) {
      setCatPageSearchButtonFocused(false);
      setStyles2({
        ...styles2,
        catPageTitle: styles.catPageTitle,
        catPageSearchButtonScene: styles.catPageSearchButtonSceneHidden,
      });
      setIndexIcon(
        <input
          type={"number"}
          className={"switchPageInput"}
          onChange={(e) => {
            console.log({ MainCatBarPageSwitch: e.target.value });
            updatePageIndexHold(e.target.value, setSelectedPageHold);
          }}
          value={
            selectedPageHold !== undefined ? selectedPageHold : catalogIndex
          }
        />
      );
      setStyles2({
        ...styles2,
        excerptSearchLoadIconScene: styles.excerptSearchLoadIconSceneHidden,
      });
    }
  }, [display, load]);

  React.useEffect(() => {
    setIndexIcon(
      <input
        type={"number"}
        className={"switchPageInput"}
        onBlur={() => {
          console.log({
            mainCatBarPageSearchButtonFocused: catPageSearchButtonFocused,
          });
          if (catPageSearchButtonFocused) {
            setStyles2({
              ...styles2,
              catPageTitle: styles.catPageTitleHidden,
              catPageSearchButtonScene: styles.catPageSearchButtonScene,
            });
          } else {
            setSelectedPageHold(undefined);
            setStyles2({
              ...styles2,
              catPageTitle: styles.catPageTitle,
              catPageSearchButtonScene: styles.catPageSearchButtonSceneHidden,
            });
          }
        }}
        onChange={(e) => {
          console.log({ MainCatBarPageSwitch: e.target.value });
          updatePageIndexHold(e.target.value, setSelectedPageHold);
          setStyles2({
            ...styles2,
            catPageTitle: styles.catPageTitleHidden,
            catPageSearchButtonScene: styles.catPageSearchButtonScene,
          });
        }}
        value={selectedPageHold !== undefined ? selectedPageHold : catalogIndex}
      />
    );
  }, [selectedPageHold, catPageSearchButtonFocused]);

  return (
    <View style={styles.mainNavScene}>
      <AppBar
        position={"static"}
        style={{
          top: "0%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(50, 205, 50, 1), rgba(112, 128, 144, 0.1) 3% 100%",
          boxShadow: "inset 0 -2px 3px -2px limegreen",
        }}
      >
        <Toolbar className={"toolbar"}>
          <View style={styles.navigationScene}>
            <View style={styles.miniCatButtonUnderlay}>
              <Button
                className={"miniCatButton"}
                onMouseOver={() => {
                  changeStyle(
                    "miniCatButtonHovered",
                    styles2,
                    setStyles2,
                    display === "miniCatalogLayout" ? true : false
                  );
                }}
                onMouseLeave={() => {
                  changeStyle(
                    "miniCatButtonDefault",
                    styles2,
                    setStyles2,
                    display === "miniCatalogLayout" ? true : false
                  );
                }}
                onClick={() => {
                  switchCatalogDisplay("miniCatalog", displayChange, {
                    loadData: load.loadData,
                    changeLoad: load.changeLoad,
                  });
                  setStyles2({
                    ...styles2,
                    miniCatText: styles.miniCatTextSelected,
                    majorCatText: styles.majorCatTextDefault,
                  });
                }}
              >
                <Text style={styles2.miniCatText}>{"Mini Catalog"}</Text>
              </Button>
            </View>
            <View style={styles.majorCatButtonUnderlay}>
              <Button
                className={"majorCatButton"}
                onMouseOver={() => {
                  changeStyle(
                    "majorCatButtonHovered",
                    styles2,
                    setStyles2,
                    display === "majorCatalogLayout" ? true : false
                  );
                }}
                onMouseLeave={() => {
                  changeStyle(
                    "majorCatButtonDefault",
                    styles2,
                    setStyles2,
                    display === "majorCatalogLayout" ? true : false
                  );
                }}
                onClick={() => {
                  switchCatalogDisplay("majorCatalog", displayChange, {
                    loadData: load.loadData,
                    changeLoad: load.changeLoad,
                  });
                  setStyles2({
                    ...styles2,
                    miniCatText: styles.miniCatTextDefault,
                    majorCatText: styles.majorCatTextSelected,
                  });
                }}
              >
                <Text style={styles2.majorCatText}>{"Expanded Catalog"}</Text>
              </Button>
            </View>
          </View>
          <View style={styles.switchCatPageScene}>
            <IconButton
              onClick={() => {
                switchCatalogPage(
                  catalogIndex,
                  "prev",
                  setIndexIcon,
                  load,
                  undefined,
                  undefined,
                  () => {}
                );
              }}
            >
              <ArrowBackIosSharp style={styles2.prevIcon} />
            </IconButton>

            {indexIcon}
            <Text style={styles2.catPageTitle}>{"PAGE"}</Text>
            <View style={styles2.catPageSearchButtonScene}>
              <Button
                onMouseOver={() => {
                  setCatPageSearchButtonFocused(true);
                  console.log("Moused Over Main Cat Search Button");
                }}
                onMouseLeave={() => {
                  setCatPageSearchButtonFocused(false);
                  console.log("Mouse Out Main Cat Search Button");
                }}
                onClick={() => {
                  switchCatalogPage(
                    catalogIndex,
                    "selectedPage",
                    setIndexIcon,
                    load,
                    {
                      selectedPage: Number(selectedPageHold),
                      resetPageHold: setSelectedPageHold,
                    },
                    { styleSheet: styles2, styleChange: setStyles2 }
                  );
                }}
              >
                <Text style={styles2.catPageSearchButtonText}>{"Search"}</Text>
              </Button>
            </View>
            <IconButton
              onClick={() => {
                switchCatalogPage(
                  catalogIndex,
                  "next",
                  setIndexIcon,
                  load,
                  undefined,
                  undefined,
                  () => {}
                );
              }}
            >
              <ArrowForwardIosSharp style={styles2.nextIcon} />
            </IconButton>
          </View>
          <View style={styles.searchScene}>
            <input
              type={"text"}
              name={"Find A Catalog Excerpt"}
              placeholder={"Find A Excerpt"}
              className={"inputText"}
              value={query}
              onBlur={() => {
                if (searchResultsFocused) {
                } else {
                  setQuery(``);
                  setStyles2({
                    ...styles2,
                    searchResultsScene: styles.searchResultsSceneHidden,
                  });
                }
              }}
              onChange={(e) => {
                console.log({ cnbTitles: mainExcerptsTitles });
                setQuery(e.target.value);
                handleSearch(
                  mainExcerptsTitles,
                  e.target.value,
                  setQuery,
                  setSearchResults,
                  styles2,
                  setStyles2,
                  setSearchResultsFocused,
                  changeExcerptIndex,
                  handleDisplay,
                  layout,
                  load,
                  () => {}
                );
              }}
            />
            <View style={styles2.searchResultsScene}>{searchResults}</View>
            <View style={styles2.excerptSearchLoadIconScene}>
              <CircularProgress
                className={styles2.excerptSearchLoadIcon}
                size={18}
              />
            </View>
          </View>
        </Toolbar>
      </AppBar>
    </View>
  );
};

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

const styles = StyleSheet.create({
  mainNavScene: {
    position: "relative",
    top: "-10px",
    zIndex: 1,
    margin: "auto",
    width: "100%",
    height: "40px",
    backgroundColor: "black",
  },
  navigationScene: {
    flexDirection: "row",
    position: "absolute",
    top: "4px",
    left: "0%",
    zIndex: 1,
    justifyCont: "center",
    alignItems: "center",
  },
  switchCatPageScene: {
    flexDirection: "row",
    postion: "absolute",
    top: "-13px",
    transform: [{ translateX: -25 }],
    width: "auto",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  searchScene: {
    position: "absolute",
    top: "10px",
    right: "60px",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  searchResultsScene: {
    position: "absolute",
    top: "25px",
    padding: "5px",
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
  miniCatButtonUnderlay: {
    margin: "auto",
  },
  miniCatTextDefault: {
    color: "rgba(50, 205, 50, 0.75)",
    textShadowRadius: 5,
    textShadowColor: "rgba(112, 128, 144, 0.75)",
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
  majorCatButtonUnderlay: {
    margin: "auto",
  },
  majorCatTextDefault: {
    color: "rgba(50, 205, 50, 0.75)",
    textShadowRadius: 5,
    textShadowColor: "rgba(112, 128, 144, 0.75)",
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
  catPageIndexDefault: {
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
  catPageTitleHidden: { display: "none" },
  catPageSearchButtonScene: {
    position: "absolute",
  },
  catPageSearchButtonSceneHidden: {
    display: "none",
  },
  catPageSearchButtonText: {
    transform: [{ translateY: 22 }],
    paddingLeft: "2px",
    paddingRight: "1px",
    borderColor: "rgba(50, 205, 50, 0.50)",
    borderStyle: "solid",
    borderWidth: 1,
    shadowColor: "rgba(50, 205, 50, 0.75)",
    shadowRadius: 5,
    color: "rgba(245, 80, 50, 0.75)",
    backgroundColor: "rgba(0, 0, 0, 1.0)",
    fontSize: 8,
    letterSpacing: 2,
  },
  excerptSearchLoadIconScene: {
    position: "absolute",
    top: "-1px",
    left: "-30px",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  excerptSearchLoadIconSceneHidden: {
    display: "none",
  },
});

export default CatalogNavBar;
