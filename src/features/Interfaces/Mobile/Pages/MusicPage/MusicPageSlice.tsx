import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store, dataBaseUrl } from "../../../../../routes/routerBlock";

const MobileMusicPageSlice = createSlice({
  name: "mobileMusicPageData",
  initialState: {
    numberOfIndexes: 0,
    index: 0,
    excerptTitle: ``,
    motionPictures: [{ title: ``, url: `` }],
    gallery: [{ title: ``, fileName: `` }],
    journal: [{ title: ``, content: `` }],
  },
  reducers: {
    setMMPData: {
      reducer: (
        state,
        {
          payload,
        }: PayloadAction<{
          preparedData: {
            numberOfIndexes: number;
            index: number;
            excerptTitle: string;
            motionPictures: Array<{ title: string; url: string }>;
            gallery: Array<{ title: string; fileName: string }>;
            journal: Array<{ title: string; content: string }>;
          };
        }>
      ) => {
        state.numberOfIndexes = payload.preparedData.numberOfIndexes;
        state.index = payload.preparedData.index;
        state.excerptTitle = payload.preparedData.excerptTitle;
        state.motionPictures = payload.preparedData.motionPictures;
        state.gallery = payload.preparedData.gallery;
        state.journal = payload.preparedData.journal;
      },
      prepare: ({
        preparedData,
      }: {
        preparedData: {
          numberOfIndexes: number;
          index: number;
          excerptTitle: string;
          motionPictures: Array<{ title: string; url: string }>;
          gallery: Array<{ title: string; fileName: string }>;
          journal: Array<{ title: string; content: string }>;
        };
      }) => ({ payload: { preparedData } }),
    },
  },
});

export const { setMMPData } = MobileMusicPageSlice.actions;

export const retrieveData = async (
  index: number,
  opts?: { type: string; execute: Function }
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
        // Retrieve Number Of Indexes
        let numberOfIndexesHold = data.length;

        // Perform Verifications and Clarifications on Requested Index Number/Location
        let newIndexHold =
          index < numberOfIndexesHold && index >= 0 ? index : 0;

        // Setup End Slice Selection
        let endSlice = newIndexHold + 1;

        // Retrieve Selected Data Slice
        let slicedDataHold = data.slice(newIndexHold, endSlice);

        // Parse Selected Data Slice Into Data Holds For Dispatch
        let excerptTitleHold = slicedDataHold[0].ideaTitle;
        let motionPicturesHold = slicedDataHold[0].motionPictures.map((mp) => {
          return { title: mp.videoName, url: mp.videoUrl };
        });
        let galleryHold = slicedDataHold[0].majorCatalogPhotos.map((photo) => {
          return {
            title: photo.photoTitle,
            fileName: `${dataBaseUrl}scrap-book/music/photos/${photo.photoFilename}`,
          };
        });
        let journalHold = slicedDataHold[0].journal.map((passage) => {
          return { title: passage.title, content: passage.content };
        });

        // Dispatch Prepared Data to App Store
        let preppedDataHold = {
          numberOfIndexes: numberOfIndexesHold,
          index: newIndexHold,
          excerptTitle: excerptTitleHold,
          motionPictures: motionPicturesHold,
          gallery: galleryHold,
          journal: journalHold,
        };
        store.dispatch(setMMPData({ preparedData: preppedDataHold }));

        // Execute Optionals
        if (opts) {
          if (opts.type === "localStateReload") {
            opts.execute(preppedDataHold);
          }
        }

        // Logging Center
        console.log({
          FetchedDataForMobile: data,
          SlicedDataForMobile: slicedDataHold,
          ReconfiguredDataForMobile: {
            excerptTitleHold,
            motionPicturesHold,
            galleryHold,
            journalHold,
          },
        });
      }
    );
};

export default MobileMusicPageSlice.reducer;

export {};
