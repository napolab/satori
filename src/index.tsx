import "./adapter";

import fs from "fs";

import React from "react";


const main = async () => {


  const result = await satori(
    <div style={{ display: "flex" }}>
      <img
        src="https://picsum.photos/200/300"
        width={200}
        height={300}
        alt="satori"
      />
    </div>,
    { width: 500, height: 500, fonts: [] }
  );

  fs.writeFileSync("./out.svg", result);
};

// eslint-disable-next-line no-void
void main();
