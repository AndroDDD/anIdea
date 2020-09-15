import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { Button } from "@material-ui/core";

import { changeStyle } from "./MainDisplayLogic";
import MotionPictureDisplay from "./MotionPictureDisplay/MotionPictureDisplay";
import MiniPhotoCatalog from "./MiniPhotoCatalog/MiniPhotoCatalog";
import CatalogExcerptExpanded from "./MajorPhotoCatalog/MajorPhotoCatalog";

interface MainDisplayInterface {
  musicData: {
    catalogIndex: number;
    excerpts: Array<{
      index: number;
      title: string;
      motionPictures: Array<{ title: string; url: string }>;
      muralPhotos: Array<{
        middle: { source: string; width: number; height: number };
        topLeft: { source: string; width: number; height: number };
        bottomLeft: { source: string; width: number; height: number };
        topRight: { source: string; width: number; height: number };
        bottomRight: { source: string; width: number; height: number };
      }>;
      galleryPhotos: Array<{ title: string; source: string }>;
      journal: Array<{ title: string; content: string }>;
    }>;
  };
  load: {
    initialDataSet: {
      initialStylesSet: boolean;
      isViewChanging: boolean;
      isCatalogPageChanging: boolean;
      navigationType: string;
    };
    setInitialDataSet: Function;
  };
  layout: { type: string; change: Function };
  excerptIndex: { index: number; set: Function };
}

function isOdd(n: number) {
  return Boolean(n % 2);
}

const MainDisplay: React.FC<MainDisplayInterface> = ({
  musicData,
  load,
  layout,
  excerptIndex,
}) => {
  const [view, setView] = React.useState({
    MajorCatalogLayout: [<div key={"initialData101MajorCatalogLayout"}></div>],
    MiniCatalogLayout: [<div key={"initialData101MiniCatalogLayout"}></div>],
    VLayoutLeft: [<div key={"initialData101VLayoutLeft"}></div>],
    VLayoutRight: [<div key={"initialData101VLayoutRight"}></div>],
  });
  const [styles2, setStyles2] = React.useState([
    {
      expandedDisplayButton: {
        color: "whitesmoke",
      },
      expandedDisplayButtonText: { backgroundColor: "cyan" },
      motionPictureDisplaySceneBackground:
        styles.motionPictureDisplaySceneBackgroundDefault,
      miniPhotoCatalogSceneBackground:
        styles.miniPhotoCatalogSceneBackgroundDefault,
    },
  ]);
  const [catPageIndexes, setCatPageIndexes] = React.useState([0]);
  const [excerptsTitles, setExcerptsTitles] = React.useState([``]);

  function setNewStyle(index: number, whichStyle: string) {
    if (whichStyle === "EDBDefault") {
      changeStyle(styles2, setStyles2, index, "EDBDefault");
    } else if (whichStyle === "EDBOnHover") {
      changeStyle(styles2, setStyles2, index, "EDBOnHover");
    }
    load.setInitialDataSet({
      isViewChanging: true,
    });
  }

  function setCatalogDisplay(whichDisplay: string, whichExcerpt?: number) {
    if (whichDisplay === "majorCatalogDisplay") {
      if (whichExcerpt) {
        excerptIndex.set(whichExcerpt);
      } else {
        excerptIndex.set(0);
      }
      layout.change("majorCatalogLayout");
    } else if ((whichDisplay = "miniCatalogDisplay")) {
      layout.change("miniCatalogLayout");
    }
    console.log({ EDBNavigation: layout.type });
    load.setInitialDataSet({
      isViewChanging: true,
    });
  }

  React.useEffect(() => {
    if (
      styles2.length !== musicData.excerpts.length ||
      load.initialDataSet.initialStylesSet === false
    ) {
      // Set Initial Styles
      let newStyleSheet = musicData.excerpts.map((data) => {
        return {
          expandedDisplayButton: { color: "whitesmoke" },
          expandedDisplayButtonText: {
            color: "slategrey",
            backgroundColor: "rgba(112, 128, 144, 0.40)",
            borderColor: "slategrey",
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 5,
            paddingLeft: 5,
            paddingRight: 5,
            shadowColor: "rgba(112,128, 144, 1.0)",
            shadowRadius: 5,
          },
          miniPhotoCatalogSceneBackground:
            styles.miniPhotoCatalogSceneBackgroundDefault,
          motionPictureDisplaySceneBackground:
            styles.motionPictureDisplaySceneBackgroundDefault,
        };
      });

      // Obtain real Catalog Indexes for Excerpt
      let catPageIndexesDataHold = musicData.excerpts.map((data) => {
        let tempDataHold = data.index;
        return tempDataHold;
      });

      // Obtain Main Excerpts Titles
      let excerptsTitlesHold = musicData.excerpts.map((data) => {
        let tempDataHold = data.title;
        return tempDataHold;
      });

      setStyles2(newStyleSheet);
      load.setInitialDataSet({
        initialStylesSet: true,
        isViewChanging: true,
      });
      setCatPageIndexes(catPageIndexesDataHold);
      setExcerptsTitles(excerptsTitlesHold);

      excerptIndex.set(0);
    } else if (load.initialDataSet.isViewChanging === true) {
      if (layout.type === "majorCatalogLayout") {
        let tempViewHold = (
          <CatalogExcerptExpanded
            key={"Testing Catalog Major Display"}
            motionPictures={
              musicData.excerpts[excerptIndex.index].motionPictures
            }
            photos={musicData.excerpts[excerptIndex.index].galleryPhotos}
            journal={musicData.excerpts[excerptIndex.index].journal}
            setExcerptIndex={excerptIndex.set}
            currentExcerpt={excerptIndex.index}
            catalogLength={musicData.excerpts.length}
            changeExcerpt={setCatalogDisplay}
            layout={layout.type}
            currentPage={musicData.catalogIndex}
            realCatIndexes={catPageIndexes}
            mainExcerptsTitles={excerptsTitles}
            load={load}
          />
        );
        setView({
          ...view,
          MajorCatalogLayout: [tempViewHold],
        });
        load.setInitialDataSet({
          isViewChanging: false,
        });
      } else if (layout.type === "miniCatalogLayout") {
        // Set Mini Catalog Layout
        let tempViewHold = musicData.excerpts.map((data, index) => {
          if (isOdd(index)) {
            return (
              <View
                key={`catalog-index-${index}`}
                style={styles.miniCatalogSceneSplit}
              >
                <View style={styles.miniCatalogSceneSplitInteractive}>
                  <Button
                    style={styles2[index].expandedDisplayButton}
                    onMouseOver={() => {
                      setNewStyle(index, "EDBOnHover");
                    }}
                    onMouseLeave={() => {
                      setNewStyle(index, "EDBDefault");
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      setCatalogDisplay("majorCatalogDisplay", index);
                    }}
                  >
                    <Text style={styles2[index].expandedDisplayButtonText}>
                      {data.title}
                    </Text>
                  </Button>
                </View>
                <View style={styles.miniCatalogSceneSplitVisual}>
                  <View style={styles.miniCatalogSceneSplitLeft}>
                    <ImageBackground
                      key={`$catalog-index-${index}-of-photos`}
                      source={{
                        uri: require("../../../../../../media/Backgrounds/rainDropBackgroundv2.2.png"),
                      }}
                      imageStyle={{ resizeMode: "cover" }}
                      style={styles2[index].miniPhotoCatalogSceneBackground}
                    >
                      <MiniPhotoCatalog photos={data.muralPhotos} />
                    </ImageBackground>
                  </View>
                  <View style={styles.miniCatalogSceneSplitRight}>
                    <ImageBackground
                      key={`catalog-index-${index}-of-motionPicture`}
                      source={{
                        uri: require("../../../../../../media/Backgrounds/blackPlate.png"),
                      }}
                      imageStyle={{ resizeMode: "cover" }}
                      style={styles2[index].motionPictureDisplaySceneBackground}
                    >
                      <MotionPictureDisplay
                        motionPicture={data.motionPictures[0].url}
                      />
                    </ImageBackground>
                  </View>
                </View>
              </View>
            );
          } else {
            return (
              <View
                key={`catalog-index-${index}`}
                style={styles.miniCatalogSceneSplit}
              >
                <View style={styles.miniCatalogSceneSplitInteractive}>
                  <Button
                    style={styles2[index].expandedDisplayButton}
                    onMouseOver={() => {
                      setNewStyle(index, "EDBOnHover");
                    }}
                    onMouseLeave={() => {
                      setNewStyle(index, "EDBDefault");
                    }}
                    onClick={() => {
                      setCatalogDisplay("majorCatalogDisplay", index);
                    }}
                  >
                    <Text style={styles2[index].expandedDisplayButtonText}>
                      {data.title}
                    </Text>
                  </Button>
                </View>
                <View style={styles.miniCatalogSceneSplitVisual}>
                  <View style={styles.miniCatalogSceneSplitLeft}>
                    <ImageBackground
                      key={`catalog-index-${index}-of-motionPicture`}
                      source={{
                        uri: require("../../../../../../media/Backgrounds/blackPlate.png"),
                      }}
                      imageStyle={{ resizeMode: "cover" }}
                      style={styles2[index].motionPictureDisplaySceneBackground}
                    >
                      <MotionPictureDisplay
                        motionPicture={data.motionPictures[0].url}
                      />
                    </ImageBackground>
                  </View>
                  <View style={styles.miniCatalogSceneSplitRight}>
                    <ImageBackground
                      key={`$catalog-index-${index}-of-photos`}
                      source={{
                        uri: require("../../../../../../media/Backgrounds/rainDropBackgroundv2.2.png"),
                      }}
                      imageStyle={{ resizeMode: "cover" }}
                      style={styles2[index].miniPhotoCatalogSceneBackground}
                    >
                      <MiniPhotoCatalog photos={data.muralPhotos} />
                    </ImageBackground>
                  </View>
                </View>
              </View>
            );
          }
        });
        setView({
          ...view,
          MiniCatalogLayout: tempViewHold,
        });
        load.setInitialDataSet({
          isViewChanging: false,
        });
      }
    } else if (layout.type === "verticalLayout") {
      // Set Vertical Layout
      let tempLeftViewHold = musicData.excerpts.map((data, index) => {
        if (isOdd(index)) {
          return (
            <ImageBackground
              key={`${index}-left-photos`}
              source={{
                uri: require("../../../../../../media/Backgrounds/rainDropBackgroundv2.2.png"),
              }}
              imageStyle={{ resizeMode: "cover" }}
              style={styles2[index].miniPhotoCatalogSceneBackground}
            >
              <MiniPhotoCatalog photos={data.muralPhotos} />
            </ImageBackground>
          );
        } else {
          return (
            <ImageBackground
              key={`${index}-left-motionPicture`}
              source={{
                uri: require("../../../../../../media/Backgrounds/blackPlate.png"),
              }}
              imageStyle={{ resizeMode: "cover" }}
              style={styles2[index].motionPictureDisplaySceneBackground}
            >
              <MotionPictureDisplay
                motionPicture={data.motionPictures[0].url}
              />
            </ImageBackground>
          );
        }
      });
      let tempRightViewHold = musicData.excerpts.map((data, index) => {
        if (isOdd(index)) {
          return (
            <ImageBackground
              key={`${index}-right-motionPicture`}
              source={{
                uri: require("../../../../../../media/Backgrounds/blackPlate.png"),
              }}
              imageStyle={{ resizeMode: "cover" }}
              style={styles2[index].motionPictureDisplaySceneBackground}
            >
              <MotionPictureDisplay
                motionPicture={data.motionPictures[0].url}
              />
            </ImageBackground>
          );
        } else {
          return (
            <ImageBackground
              key={`${index}-right-photos`}
              source={{
                uri: require("../../../../../../media/Backgrounds/rainDropBackgroundv2.2.png"),
              }}
              imageStyle={{ resizeMode: "cover" }}
              style={styles2[index].miniPhotoCatalogSceneBackground}
            >
              <MiniPhotoCatalog photos={data.muralPhotos} />
            </ImageBackground>
          );
        }
      });

      /** Alternate Data Splitting For Display View Setup
     * 
    let leftTempDataHold = [];
    let rightTempDataHold = [];

    for (let i = 0; i < musicData.length; i++) {
      console.log({ catalogDataProps: musicData });
      let leftId = getRandoId();
      let rightId = getRandoId();

      if (isOdd(i)) {
        leftTempDataHold.push(
          <ImageBackground
            key={leftId}
            source={{
              uri: require("../../../../../../media/Backgrounds/rainDropBackgroundv2.2.png"),
            }}
            imageStyle={{ resizeMode: "cover" }}
            style={styles.miniPhotoCatalogSceneBackground}
          >
            <MiniPhotoCatalog photos={musicData[i].photos} />
          </ImageBackground>
        );

        rightTempDataHold.push(
          <ImageBackground
            key={rightId}
            source={{
              uri: require("../../../../../../media/Backgrounds/blackPlate.png"),
            }}
            imageStyle={{ resizeMode: "cover" }}
            style={styles.motionPictureDisplaySceneBackground}
          >
            <MotionPictureDisplay motionPicture={musicData[i].motionPicture} />
          </ImageBackground>
        );
      } else {
        leftTempDataHold.push(
          <ImageBackground
            key={leftId}
            source={{
              uri: require("../../../../../../media/Backgrounds/blackPlate.png"),
            }}
            imageStyle={{ resizeMode: "cover" }}
            style={styles.motionPictureDisplaySceneBackground}
          >
            <MotionPictureDisplay motionPicture={musicData[i].motionPicture} />
          </ImageBackground>
        );

        rightTempDataHold.push(
          <ImageBackground
            key={rightId}
            source={{
              uri: require("../../../../../../media/Backgrounds/rainDropBackgroundv2.2.png"),
            }}
            imageStyle={{ resizeMode: "cover" }}
            style={styles.miniPhotoCatalogSceneBackground}
          >
            <MiniPhotoCatalog photos={musicData[i].photos} />
          </ImageBackground>
        );
      }
    }
    */

      setView({
        ...view,
        VLayoutLeft: tempLeftViewHold,
        VLayoutRight: tempRightViewHold,
      });
      console.log({
        tempLeftViewHold: tempLeftViewHold,
        tempRightViewHold: tempRightViewHold,
      });
    }
  }, [musicData, load.initialDataSet]);

  switch (layout.type) {
    case "majorCatalogLayout":
      return (
        <View style={styles.majorCatalogScene}>{view.MajorCatalogLayout}</View>
      );
    case "miniCatalogLayout":
      return (
        <View style={styles.miniCatalogContainer}>
          <View style={styles.miniCatalogScene}>{view.MiniCatalogLayout}</View>
        </View>
      );

    case "verticalLayout":
      return (
        <View style={styles.mainSceneVLayout}>
          <View style={styles.mainSceneSplitVLayout}>{view.VLayoutLeft}</View>
          <View style={styles.mainSceneSplitVLayout}>{view.VLayoutRight}</View>
        </View>
      );
    default:
      return (
        <View style={styles.mainSceneVLayout}>
          <View style={styles.mainSceneSplitVLayout}>
            <ImageBackground
              source={{
                uri: require("../../../../../../media/Backgrounds/blackPlate.png"),
              }}
              imageStyle={{ resizeMode: "cover" }}
              style={styles2[0].motionPictureDisplaySceneBackground}
            >
              <MotionPictureDisplay
                motionPicture={musicData.excerpts[0].motionPictures[0].url}
              />
            </ImageBackground>
            <ImageBackground
              source={{
                uri: require("../../../../../../media/Backgrounds/rainDropBackgroundv2.2.png"),
              }}
              imageStyle={{ resizeMode: "cover" }}
              style={styles2[0].miniPhotoCatalogSceneBackground}
            >
              <MiniPhotoCatalog photos={musicData.excerpts[0].muralPhotos} />
            </ImageBackground>
            <ImageBackground
              source={{
                uri: require("../../../../../../media/Backgrounds/blackPlate.png"),
              }}
              imageStyle={{ resizeMode: "cover" }}
              style={styles2[0].motionPictureDisplaySceneBackground}
            >
              <MotionPictureDisplay
                motionPicture={musicData.excerpts[0].motionPictures[0].url}
              />
            </ImageBackground>
          </View>
          <View style={styles.mainSceneSplitVLayout}>
            <ImageBackground
              source={{
                uri: require("../../../../../../media/Backgrounds/rainDropBackgroundv2.2.png"),
              }}
              imageStyle={{ resizeMode: "cover" }}
              style={styles2[0].miniPhotoCatalogSceneBackground}
            >
              <MiniPhotoCatalog photos={musicData.excerpts[0].muralPhotos} />
            </ImageBackground>
            <ImageBackground
              source={{
                uri: require("../../../../../../media/Backgrounds/blackPlate.png"),
              }}
              imageStyle={{ resizeMode: "cover" }}
              style={styles2[0].motionPictureDisplaySceneBackground}
            >
              <MotionPictureDisplay
                motionPicture={musicData.excerpts[0].motionPictures[0].url}
              />
            </ImageBackground>
            <ImageBackground
              source={{
                uri: require("../../../../../../media/Backgrounds/rainDropBackgroundv2.2.png"),
              }}
              imageStyle={{ resizeMode: "cover" }}
              style={styles2[0].miniPhotoCatalogSceneBackground}
            >
              <MiniPhotoCatalog photos={musicData.excerpts[0].muralPhotos} />
            </ImageBackground>
          </View>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  majorCatalogScene: {
    flexDirection: "column",
    margin: "auto",
    marginTop: "10px",
    marginBottom: "10px",
    padding: "5px",
    width: "100%",
    minWidth: "900px",
    height: "100%",
  },
  miniCatalogContainer: {
    position: "relative",
    top: "-10px",
    margin: "auto",
    width: "100%",
    height: "100%",
  },
  miniCatalogScene: {
    flexDirection: "column",
    margin: "auto",
    marginBottom: "10px",
    padding: "5px",
    width: "100%",
    maxWidth: "800px",
    height: "100%",
  },
  miniCatalogSceneSplit: {
    width: "100%",
    paddingTop: "20px",
  },
  miniCatalogSceneSplitVisual: {
    flexDirection: "row",
    flex: 2,
    width: "100%",
  },
  miniCatalogSceneSplitInteractive: {
    width: "100%",
  },
  miniCatalogSceneSplitLeft: {
    width: "50%",
    padding: "1px",
  },
  miniCatalogSceneSplitRight: {
    width: "50%",
    padding: "1px",
  },
  miniPhotoCatalogSceneBackgroundDefault: {
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    opacity: 0.95,
    elevation: 20,
    shadowColor: "slategrey",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.95,
    shadowRadius: 10,
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "slategrey",
    borderTopWidth: 0,
  },
  motionPictureDisplaySceneBackgroundDefault: {
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    opacity: 0.95,
    elevation: 20,
    shadowColor: "slategrey",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.95,
    shadowRadius: 10,
  },
  genericText: {
    color: "whitesmoke",
  },
  mainSceneVLayout: {
    flexDirection: "row",
    flex: 2,
    margin: "auto",
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
    height: "100%",
  },
  mainSceneSplitVLayout: {
    width: "50%",
    padding: "1px",
  },
});

export default MainDisplay;
