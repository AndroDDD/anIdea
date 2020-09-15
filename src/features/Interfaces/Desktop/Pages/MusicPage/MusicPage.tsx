import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import HeaderBar from "../../Bars/HeaderBar/HeaderBar";
import FooterBar from "../../Bars/FooterBar/FooterBar";
import MainDisplay from "./MusicPageComponents/MainDisplay";

import { store, dataBaseUrl } from "../../../../../routes/routerBlock";
import { retrieveScrapBookData } from "./MusicPageSlice";
import CatalogNavBar from "../../Bars/MusicPageBars/CatalogNavBar/CatalogNavBar";

import "./MusicPageStyles.scss";

const MusicPageD: React.FC = () => {
  const [layoutType, setLayoutType] = React.useState("miniCatalogLayout");
  const [initialDataSet, setInitialDataSet] = React.useState({
    initialDataRetrieved: false,
    dataStored: false,
    dataRestructured: false,
    initialStylesSet: false,
    isViewChanging: false,
    isCatalogPageChanging: false,
    navigationType: "",
  });

  const [storeState, setStoreState] = React.useState<
    Array<{
      catalogIndex: number;
      excerptIndex: number;
      id: string;
      title: string;
      motionPictures: Array<{ title: string; url: string }>;
      muralPhotos: Array<{
        middle: string;
        topLeft: string;
        bottomLeft: string;
        topRight: string;
        bottomRight: string;
      }>;
      galleryPhotos: Array<{ title: string; filename: string }>;
      journal: Array<{ title: string; content: string }>;
    }>
  >([
    {
      catalogIndex: 0,
      excerptIndex: 0,
      id: ``,
      title: ``,
      motionPictures: [{ title: ``, url: `` }],
      muralPhotos: [
        {
          middle: ``,
          topLeft: ``,
          bottomLeft: ``,
          topRight: ``,
          bottomRight: ``,
        },
      ],
      galleryPhotos: [{ title: ``, filename: `` }],
      journal: [{ title: ``, content: `` }],
    },
  ]);
  const [storeSearchData, setStoreSearchData] = React.useState<{
    mainExcerptsTitles: Array<string>;
  }>({ mainExcerptsTitles: [``] });
  const [restructuredData, setRestructuredData] = React.useState<{
    catalogIndex: number;
    mainExcerptsTitles: Array<string>;
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
  }>({
    catalogIndex: 0,
    mainExcerptsTitles: [``],
    excerpts: [
      {
        index: 0,
        title: ``,
        motionPictures: [{ title: ``, url: `` }],
        muralPhotos: [
          {
            middle: { source: "", width: 0, height: 0 },
            topLeft: { source: "", width: 0, height: 0 },
            bottomLeft: { source: "", width: 0, height: 0 },
            topRight: { source: "", width: 0, height: 0 },
            bottomRight: { source: "", width: 0, height: 0 },
          },
        ],
        galleryPhotos: [{ title: ``, source: `` }],
        journal: [{ title: ``, content: `` }],
      },
    ],
  });
  const [excerptIndex, setExcerptIndex] = React.useState(0);

  store.subscribe(() => {
    if (storeState.length <= 1) {
      setInitialDataSet({
        ...initialDataSet,
        initialDataRetrieved: true,
        dataStored: false,
        dataRestructured: false,
      });
    }
    return;
  });

  React.useEffect(() => {
    let effectContainer = () => {
      if (initialDataSet.initialDataRetrieved === false) {
        retrieveScrapBookData(1);
        setInitialDataSet({ ...initialDataSet, initialDataRetrieved: true });
      } else {
        if (initialDataSet.dataStored === false) {
          let updatedState = store.getState().musicPageReducer.displayData;
          let updatedSearchData = store.getState().musicPageReducer.searchData;
          console.log({ musicPageStoreSubscriptionData: updatedState });
          setInitialDataSet({ ...initialDataSet, dataStored: true });
          setStoreState(updatedState);
          setStoreSearchData(updatedSearchData);
          console.log({ updatedSearchDataFromMusicPage: updatedSearchData });
        } else if (initialDataSet.dataRestructured === false) {
          /** 
           * Alternate Mapping of Data
             let loopLength = storeState.length;
             let tempDataHold = [];

            for (let i = 0; i < loopLength; i++) {
            let { motionPicture, photos } = storeState[i];
            let dataToPush = {
            motionPicture: motionPicture,
            photos: photos,
            };
            tempDataHold.push(dataToPush);
            }
            */

          let restructuredDataMap = storeState.map((data, index) => {
            let restructuredMotionPictures = storeState[
              index
            ].motionPictures.map((motionPicture) => {
              return motionPicture;
            });
            let restructuredMiniCatPhotoUrls = storeState[
              index
            ].muralPhotos.map((data) => {
              return {
                middle: `${dataBaseUrl}scrap-book/music/photos/${data.middle}`,
                topLeft: `${dataBaseUrl}scrap-book/music/photos/${data.topLeft}`,
                bottomLeft: `${dataBaseUrl}scrap-book/music/photos/${data.bottomLeft}`,
                topRight: `${dataBaseUrl}scrap-book/music/photos/${data.topRight}`,
                bottomRight: `${dataBaseUrl}scrap-book/music/photos/${data.bottomRight}`,
              };
            });
            let restructuredMiniCatPhotosData = restructuredMiniCatPhotoUrls.map(
              (photo) => {
                let middleImage = new Image();
                let topLeftImage = new Image();
                let bottomLeftImage = new Image();
                let topRightImage = new Image();
                let bottomRightImage = new Image();

                middleImage.src = photo.middle;
                topLeftImage.src = photo.topLeft;
                bottomLeftImage.src = photo.bottomLeft;
                topRightImage.src = photo.topRight;
                bottomRightImage.src = photo.bottomRight;

                let middleImageWidth = middleImage.naturalWidth;
                let middleImageHeight = middleImage.naturalHeight;
                let topLeftImageWidth = middleImage.naturalWidth;
                let topLeftImageHeight = middleImage.naturalHeight;
                let bottomLeftImageWidth = middleImage.naturalWidth;
                let bottomLeftImageHeight = middleImage.naturalHeight;
                let topRightImageWidth = middleImage.naturalWidth;
                let topRightImageHeight = middleImage.naturalHeight;
                let bottomRightImageWidth = middleImage.naturalWidth;
                let bottomRightImageHeight = middleImage.naturalHeight;

                let tempDataHold = {
                  middle: {
                    source: photo.middle,
                    width: middleImageWidth,
                    height: middleImageHeight,
                  },
                  topLeft: {
                    source: photo.topLeft,
                    width: topLeftImageWidth,
                    height: topLeftImageHeight,
                  },
                  bottomLeft: {
                    source: photo.bottomLeft,
                    width: bottomLeftImageWidth,
                    height: bottomLeftImageHeight,
                  },
                  topRight: {
                    source: photo.topRight,
                    width: topRightImageWidth,
                    height: topRightImageHeight,
                  },
                  bottomRight: {
                    source: photo.bottomRight,
                    width: bottomRightImageWidth,
                    height: bottomRightImageHeight,
                  },
                };

                return tempDataHold;
              }
            );
            let restructuredMajorCatPhotosData = storeState[
              index
            ].galleryPhotos.map((photo) => {
              let tempDataHold = {
                title: photo.title,
                source: `${dataBaseUrl}scrap-book/music/photos/${photo.filename}`,
              };
              return tempDataHold;
            });
            let restructuredJournalData = storeState[index].journal.map(
              (passage) => {
                let tempDataHold = {
                  title: passage.title,
                  content: passage.content,
                };
                return tempDataHold;
              }
            );

            return {
              index: data.excerptIndex,
              title: data.title,
              motionPictures: restructuredMotionPictures,
              muralPhotos: restructuredMiniCatPhotosData,
              galleryPhotos: restructuredMajorCatPhotosData,
              journal: restructuredJournalData,
            };
          });

          if (restructuredDataMap.length % 5 === 0) {
            console.log("Music Page Says Data Array in Multiple of 5's.");
          } else {
            console.log("Music Page Says Data Array NOT in Multiple of 5's.");
          }

          let restructuredDataPolished = {
            catalogIndex: storeState[0].catalogIndex,
            mainExcerptsTitles: storeSearchData.mainExcerptsTitles,
            excerpts: restructuredDataMap,
          };

          setRestructuredData(restructuredDataPolished);
          setInitialDataSet({
            ...initialDataSet,
            dataRestructured: true,
          });
          console.log({
            restructuredDataForMusicPage: restructuredDataPolished,
          });
        }
      }
      console.log({
        localMusicPageStoreState: storeState,
        restructuredData: restructuredData,
        initialDataSet: initialDataSet,
      });
    };
    effectContainer();
    return;
  }, [
    initialDataSet.initialDataRetrieved,
    initialDataSet.dataStored,
    initialDataSet.dataRestructured,
  ]);

  React.useEffect(() => {
    console.log("Music Page Detects Excerpt Index Change");
    console.log({ excerptIndex: excerptIndex });
  }, [excerptIndex]);

  return (
    <View style={styles.scene}>
      <HeaderBar whichPage={"music"} />
      <CatalogNavBar
        display={layoutType}
        displayChange={setLayoutType}
        load={{ loadData: initialDataSet, changeLoad: setInitialDataSet }}
        catalogIndex={restructuredData.catalogIndex}
        mainExcerptsTitles={storeSearchData.mainExcerptsTitles}
        changeExcerptIndex={setExcerptIndex}
        layout={{ type: layoutType, change: setLayoutType }}
      />
      <MainDisplay
        musicData={restructuredData}
        layout={{ type: layoutType, change: setLayoutType }}
        excerptIndex={{ index: excerptIndex, set: setExcerptIndex }}
        load={{
          initialDataSet: {
            initialStylesSet: initialDataSet.initialStylesSet,
            isViewChanging: initialDataSet.isViewChanging,
            isCatalogPageChanging: initialDataSet.isCatalogPageChanging,
            navigationType: initialDataSet.navigationType,
          },
          setInitialDataSet: (data: any) => {
            setInitialDataSet({ ...initialDataSet, ...data });
            console.log("InitialDataSet Method Activated", {
              data: { ...initialDataSet, ...data },
            });
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    margin: "auto",
    minWidth: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    textAlign: "center",
    backgroundColor: "black",
  },
});

export default MusicPageD;
