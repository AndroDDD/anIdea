import React from "react";

function changeStyle({
  styleSheet,
  styleChangeFunction,
  event,
  element,
}: {
  styleSheet: { imageStyles: object };
  styleChangeFunction: Function;
  event: string;
  element: string;
}) {
  switch (event) {
    case "reset":
      if (element === "middle") {
        styleChangeFunction({
          ...styleSheet,
          imageStyles: {
            ...styleSheet.imageStyles,
            middle: {
              border: "1px solid rgba(50, 205, 25, .20)",
              boxShadow: "0 -0px 5px -1px rgba(50, 205, 50, .60)",
              opacity: "0.75",
            },
          },
        });
      } else if (element === "topLeft") {
        styleChangeFunction({
          ...styleSheet,
          imageStyles: {
            ...styleSheet.imageStyles,
            topLeftCorner: {
              border: "1px solid rgba(112, 128, 144, 0.50)",
              boxShadow: "0 -0px 5px 1px rgba(112, 150, 144, 0.60)",
              opacity: "0.75",
            },
          },
        });
      } else if (element === "bottomLeft") {
        styleChangeFunction({
          ...styleSheet,
          imageStyles: {
            ...styleSheet.imageStyles,
            bottomLeftCorner: {
              border: "1px solid rgba(112, 128, 144, 0.50)",
              boxShadow: "0 -0px 5px 1px rgba(112, 150, 144, 0.60)",
              opacity: "0.75",
            },
          },
        });
      } else if (element === "topRight") {
        styleChangeFunction({
          ...styleSheet,
          imageStyles: {
            ...styleSheet.imageStyles,
            topRightCorner: {
              border: "1px solid rgba(112, 128, 144, 0.50)",
              boxShadow: "0 -0px 5px 1px rgba(112, 150, 144, 0.60)",
              opacity: "0.75",
            },
          },
        });
      } else if (element === "bottomRight") {
        styleChangeFunction({
          ...styleSheet,
          imageStyles: {
            ...styleSheet.imageStyles,
            bottomRightCorner: {
              border: "1px solid rgba(112, 128, 144, 0.50)",
              boxShadow: "0 -0px 5px 1px rgba(112, 150, 144, 0.60)",
              opacity: "0.75",
            },
          },
        });
      }
      return;
    case "hover":
      if (element === "middle") {
        styleChangeFunction({
          ...styleSheet,
          imageStyles: {
            ...styleSheet.imageStyles,
            middle: {
              border: "1px solid rgba(50, 205, 25, .50)",
              boxShadow: "0 -0px 5px -1px rgba(50, 205, 50, .60)",
              opacity: "1.0",
              filter: "brightness(140%)",
            },
          },
        });
      } else if (element === "topLeft") {
        styleChangeFunction({
          ...styleSheet,
          imageStyles: {
            ...styleSheet.imageStyles,
            topLeftCorner: {
              border: "1px solid rgba(50, 205, 25, 0.50)",
              boxShadow: "0 -0px 5px 1px rgba(112, 150, 144, 0.60)",
              opacity: "1.0",
              filter: "brightness(140%)",
            },
          },
        });
      } else if (element === "bottomLeft") {
        styleChangeFunction({
          ...styleSheet,
          imageStyles: {
            ...styleSheet.imageStyles,
            bottomLeftCorner: {
              border: "1px solid rgba(50, 205, 25, 0.50)",
              boxShadow: "0 -0px 5px 1px rgba(112, 150, 144, 0.60)",
              opacity: "1.0",
              filter: "brightness(140%)",
            },
          },
        });
      } else if (element === "topRight") {
        styleChangeFunction({
          ...styleSheet,
          imageStyles: {
            ...styleSheet.imageStyles,
            topRightCorner: {
              border: "1px solid rgba(50, 205, 25, 0.50)",
              boxShadow: "0 -0px 5px 1px rgba(112, 150, 144, 0.60)",
              opacity: "1.0",
              filter: "brightness(140%)",
            },
          },
        });
      } else if (element === "bottomRight") {
        styleChangeFunction({
          ...styleSheet,
          imageStyles: {
            ...styleSheet.imageStyles,
            bottomRightCorner: {
              border: "1px solid rgba(50, 205, 25, 0.50)",
              boxShadow: "0 -0px 5px 1px rgba(112, 150, 144, 0.60)",
              opacity: "1.0",
              filter: "brightness(140%)",
            },
          },
        });
      }
      return;
    default:
      styleChangeFunction({ ...styleSheet });
      return;
  }
}

export { changeStyle };
