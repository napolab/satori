import satoriWasm, { init } from "satori/wasm";
import initYoga from "yoga-wasm-web";

import type Satori from "satori";

let initialized = false;

export const satori = async (
  ...args: Parameters<typeof Satori>
): ReturnType<typeof Satori> => {
  if (!initialized) {
    const response = await fetch(
      "https://unpkg.com/yoga-wasm-web/dist/yoga.wasm"
    );
    const wasm = await response.arrayBuffer();
    init(await initYoga(wasm));
    initialized = true;
  }

  return satoriWasm(...args);
};
