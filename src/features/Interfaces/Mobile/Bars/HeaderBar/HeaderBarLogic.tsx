import React from "react";
import { localUrl } from "../../../../../routes/routerBlock";

// Change Style of Various Header Elements
function changeStyle(
  styleSheet: Object,
  styleChangeFunction: Function,
  whichStyle: string
) {
  switch (whichStyle) {
    case "musicButtonDefault":
      styleChangeFunction({
        ...styleSheet,
        musicButton: {
          border: "1px solid slategrey",
          borderRadius: "5px",
          color: "whitesmoke",
        },
        musicButtonText: {
          color: "whitesmoke",
          textShadowColor: "cyan",
          textShadowRadius: 3,
        },
      });
      return;
    case "merchandiseButtonDefault":
      styleChangeFunction({
        ...styleSheet,
        merchandiseButton: {
          border: "1px solid slategrey",
          borderRadius: "5px",
          color: "whitesmoke",
        },
        merchandiseButtonText: {
          color: "whitesmoke",
          textShadowColor: "cyan",
          textShadowRadius: 3,
        },
      });
      return;
    case "musicButtonSelected":
      styleChangeFunction({
        ...styleSheet,
        appBar: {
          background: "linear-gradient(to bottom right, limegreen, 10%, black)",
        },
        musicButton: {
          border: "1px solid rgba(68, 250, 20, 0.40)",
          borderRadius: "5px",
          color: "black",
          backgroundColor: "rgba(112, 128, 144, 0.50)",
        },
        musicButtonText: {
          color: "rgba(68, 250, 20, 0.40)",
          textShadowColor: "whitesmoke",
          textShadowRadius: 7,
        },
      });
      return;
    case "merchandiseButtonSelected":
      styleChangeFunction({
        ...styleSheet,
        appBar: {
          background:
            "linear-gradient(to bottom right, rgb(0, 191, 255), 10%, black)",
        },
        merchandiseButton: {
          border: "1px solid rgba(0, 191, 255, 0.55)",
          borderRadius: "5px",
          color: "cyan",
          backgroundColor: "rgba(112, 128, 144, 0.50)",
        },
        merchandiseButtonText: {
          color: "rgba(176, 196, 222, 0.55)",
          fontWeight: "625",
          textShadowColor: "rgb(230, 230, 250)",
          textShadowRadius: 7,
        },
      });
      return;
    case "musicButtonHover":
      styleChangeFunction({
        ...styleSheet,
        musicButton: {
          border: "1px solid rgb(40, 160, 40)",
          borderRadius: "5px",
          color: "limegreen",
          backgroundColor: "rgba(0, 0, 0, 0.50)",
        },
        musicButtonText: {
          color: "rgb(68, 250, 20)",
          textShadowColor: "whitesmoke",
          textShadowRadius: 7,
        },
      });
      return;
    case "merchandiseButtonHover":
      styleChangeFunction({
        ...styleSheet,
        merchandiseButton: {
          border: "1px solid rgb(0, 191, 255)",
          borderRadius: "5px",
          color: "blue",
          backgroundColor: "rgba(0, 0, 0, 0.50)",
        },
        merchandiseButtonText: {
          color: "rgb(0, 191, 255)",
          textShadowColor: "whitesmoke",
          textShadowRadius: 7,
        },
      });
      return;
  }
}

// Handle Page Navigation
function navigatePage(whichPage: string) {
  switch (whichPage) {
    case "music":
      window.open(`${localUrl}`, "_self");
      return;
    case "merchandise":
      window.open(`${localUrl}merch`, "_self");
      return;
    default:
      return;
  }
}

export { changeStyle, navigatePage };
