import "./env";

import { writeFileSync } from "fs";

import { Resvg } from "@resvg/resvg-js";
import React from "react";

import { loadGoogleFont } from "./loading-google-font";
import { satori } from "./satori";

const main = async () => {
  const notoSans = await loadGoogleFont({
    family: "M PLUS 1p",
    weight: 500,
  });

  const svg = await satori(
    <div
      style={{
        display: "flex",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: 500,
        height: 250,
      }}
    >
      <p style={{ textTransform: "uppercase", fontSize: 24 }}>夜空にながれ星</p>
    </div>,
    {
      width: 500,
      height: 250,
      fonts: [{ name: "M PLUS 1p", data: notoSans, weight: 500, style: "normal" }],
    }
  );

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  writeFileSync("./out.png", pngData.asPng());
};

// eslint-disable-next-line no-void
void main();
