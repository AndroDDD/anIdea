import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store, dataBaseUrl } from "../../../../../routes/routerBlock";

export const musicPageSlice = createSlice({
  name: "musicPageData",
  initialState: {
    searchData: {
      mainExcerptsTitles: [``],
    },
    displayData: [
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
    ],
  },
  reducers: {
    displayData: {
      reducer: (
        state,
        {
          payload,
        }: PayloadAction<{
          preparedSearchData: { mainExcerptsTitles: Array<string> };
          preparedDisplayData: Array<{
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
          }>;
        }>
      ) => {
        state.searchData = payload.preparedSearchData;
        state.displayData = payload.preparedDisplayData;
      },
      prepare: ({
        preparedSearchData,
        preparedDisplayData,
      }: {
        preparedSearchData: { mainExcerptsTitles: Array<string> };
        preparedDisplayData: Array<{
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
        }>;
      }) => ({
        payload: {
          preparedSearchData,
          preparedDisplayData,
        },
      }),
    },
  },
});

export const { displayData } = musicPageSlice.actions;

export const retrieveScrapBookData = async (
  pageNumberInitial: number,
  load?: { loadData: any; loadStatus: any; changeLoad: Function },
  opts?: { type: string; execute: Function },
  excerptPageNumber?: number
) => {
  const url = `${dataBaseUrl}scrap-book/music/`;

  let fetchedData = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      const json = res.json();

      return json;
    })
    .then(
      (
        data: Array<{
          dateAdded: string;
          ideaTitle: string;
          journal: Array<{
            title: string;
            whatIsIt: string;
            content: string;
            references: { human: Array<string>; web: Array<string> };
            date: Date;
          }>;
          majorCatalogPhotos: Array<{
            photoTitle: string;
            photoFilename: string;
            photoReferences: Array<string>;
            dateUploaded: Date;
          }>;
          miniCatalogPhotos: Array<{
            _id: string;
            middle: {
              photoName: string;
              photoFilename: string;
              photoOrientation: string;
              photoReferences: Array<string>;
              catalogIndex: number;
              dateUploaded: Date;
            };
            topLeft: {
              photoName: string;
              photoFilename: string;
              photoOrientation: string;
              photoReferences: Array<string>;
              catalogIndex: number;
              dateUploaded: Date;
            };
            bottomLeft: {
              photoName: string;
              photoFilename: string;
              photoOrientation: string;
              photoReferences: Array<string>;
              catalogIndex: number;
              dateUploaded: Date;
            };
            topRight: {
              photoName: string;
              photoFilename: string;
              photoOrientation: string;
              photoReferences: Array<string>;
              catalogIndex: number;
              dateUploaded: Date;
            };
            bottomRight: {
              photoName: string;
              photoFilename: string;
              photoOrientation: string;
              photoReferences: Array<string>;
              catalogIndex: number;
              dateUploaded: Date;
            };
          }>;
          motionPictures: Array<{
            dateUploaded: string;
            videoName: string;
            videoType: string;
            videoUrl: string;
            _id: string;
          }>;
          _id: string;
        }>
      ) => {
        const dataLength = data.length;
        const sliceAmount = 5;
        const pageNumberRecheck = () => {
          let updatedPageNumber: number;
          if (excerptPageNumber) {
            if (excerptPageNumber <= dataLength) {
              updatedPageNumber =
                excerptPageNumber % sliceAmount === 0
                  ? excerptPageNumber / sliceAmount
                  : (Math.floor(excerptPageNumber / sliceAmount) *
                      sliceAmount) /
                      5 +
                    1;
              console.log({ musicSliceActivatedExcerpt: updatedPageNumber });
            } else {
              updatedPageNumber = pageNumberInitial;
            }
            return updatedPageNumber;
          } else {
            return pageNumberInitial;
          }
        };
        const pageNumber = pageNumberRecheck();
        const slicePosition = pageNumber * sliceAmount;
        const selectedInitialSlice =
          slicePosition - sliceAmount >= 0 ? slicePosition - sliceAmount : 0;
        const selectedEndSlice = slicePosition;
        const targetPage = pageNumber >= 1 ? pageNumber : 1;
        const tempDataHold: Array<{
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
        }> = [];

        if (selectedInitialSlice < dataLength) {
          const slicedData = data.slice(selectedInitialSlice, selectedEndSlice);
          const slicedDataLength = slicedData.length;
          for (let i = 0; i < slicedDataLength; i++) {
            // Retrieving Sliced Data
            let fetchedMotionPicturesHold = slicedData[i].motionPictures;
            let fetchedMiniCatPhotoHold = slicedData[i].miniCatalogPhotos;
            let fetchedMajorCatPhotoHold = slicedData[i].majorCatalogPhotos;
            let fetchedJournalHold = slicedData[i].journal;

            // Temporay Data Holds
            let tempMotionPicturesHold: Array<{
              title: string;
              url: string;
            }> = [];
            let tempMiniCatPhotoHold: Array<{
              middle: string;
              topLeft: string;
              bottomLeft: string;
              topRight: string;
              bottomRight: string;
            }> = [];
            let tempMajorCatPhotoHold: Array<{
              title: string;
              filename: string;
            }> = [];
            let tempJournalHold: Array<{ title: string; content: string }> = [];

            // Data Mapping
            for (let x = 0; x < fetchedMotionPicturesHold.length; x++) {
              let tempMotionPictureHold = {
                title: fetchedMotionPicturesHold[x].videoName,
                url: fetchedMotionPicturesHold[x].videoUrl,
              };
              tempMotionPicturesHold.push(tempMotionPictureHold);
            }
            for (let x = 0; x < fetchedMiniCatPhotoHold.length; x++) {
              let tempPhotoData = {
                middle: fetchedMiniCatPhotoHold[x].middle.photoFilename,
                topLeft: fetchedMiniCatPhotoHold[x].topLeft.photoFilename,
                bottomLeft: fetchedMiniCatPhotoHold[x].bottomLeft.photoFilename,
                topRight: fetchedMiniCatPhotoHold[x].topRight.photoFilename,
                bottomRight:
                  fetchedMiniCatPhotoHold[x].bottomRight.photoFilename,
              };
              tempMiniCatPhotoHold.push(tempPhotoData);
            }
            for (let x = 0; x < fetchedMajorCatPhotoHold.length; x++) {
              let tempPhotoData = {
                title: fetchedMajorCatPhotoHold[x].photoTitle,
                filename: fetchedMajorCatPhotoHold[x].photoFilename,
              };
              tempMajorCatPhotoHold.push(tempPhotoData);
            }
            for (let x = 0; x < fetchedJournalHold.length; x++) {
              let tempPassageHold = {
                title: fetchedJournalHold[x].title,
                content: fetchedJournalHold[x].content,
              };
              tempJournalHold.push(tempPassageHold);
            }

            tempDataHold.push({
              catalogIndex: targetPage,
              excerptIndex: selectedInitialSlice + 1 + i,
              id: slicedData[i]._id,
              title: slicedData[i].ideaTitle,
              motionPictures: tempMotionPicturesHold,
              muralPhotos: tempMiniCatPhotoHold,
              galleryPhotos: tempMajorCatPhotoHold,
              journal: tempJournalHold,
            });
          }

          if (tempDataHold.length % 5 !== 0) {
            let roundedLength = Math.ceil(tempDataHold.length / 5) * 5;
            let duplicateAmount = roundedLength - tempDataHold.length;
            let lastIndex = tempDataHold.length - 1;
            let tempAbstractDataHold = {
              catalogIndex: targetPage,
              excerptIndex: 3330,
              id: tempDataHold[lastIndex].id,
              title: tempDataHold[lastIndex].title,
              motionPictures: tempDataHold[lastIndex].motionPictures,
              muralPhotos: tempDataHold[lastIndex].muralPhotos,
              galleryPhotos: tempDataHold[lastIndex].galleryPhotos,
              journal: tempDataHold[lastIndex].journal,
            };
            for (let o = 0; o < duplicateAmount; o++) {
              tempDataHold.push({
                ...tempAbstractDataHold,
                excerptIndex: tempAbstractDataHold.excerptIndex + o,
              });
            }
          }

          // Retrieve all main Excerpts Titles
          const tempSearchDataHold: { mainExcerptsTitles: Array<string> } = {
            mainExcerptsTitles: data.map((data2) => {
              let tempTitleHold = data2.ideaTitle;
              return tempTitleHold;
            }),
          };

          store.dispatch(
            displayData({
              preparedSearchData: tempSearchDataHold,
              preparedDisplayData: tempDataHold,
            })
          );
          console.log({ musicSliceData: slicedData });
        }
      }
    )
    .then(() => {
      if (opts?.type === "reset") {
        console.log("Reset Option For Slice Data Retrieval Activated..!..");
        opts?.execute();
      }
      load?.changeLoad({ ...load.loadData, ...load.loadStatus });
    })
    .catch((err) => {
      console.log(err);
    });
};

export default musicPageSlice.reducer;

export {};
