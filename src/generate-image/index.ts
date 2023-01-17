import { initWasm, Resvg } from "@resvg/resvg-wasm";
import satori, { init } from "satori/wasm";
import initYoga from "yoga-wasm-web";

import resvgWasm from "./resvg.wasm";

import type { ReactNode } from "react";

import yogaWasm from "./yoga.wasm";

import type { SatoriOptions } from "satori";

const initResvgWasm = async () => {
  try {
    await initWasm(resvgWasm as WebAssembly.Module);
  } catch (err) {
    // console.error(err);
  }
};

const initYogaWasm = async () => {
  try {
    const yoga = await initYoga(yogaWasm);
    await init(yoga);
  } catch (err) {
    // console.error(err);
  }
};

export const generateImage = async (node: ReactNode, options: SatoriOptions): Promise<Uint8Array> => {
  await Promise.allSettled([initResvgWasm(), initYogaWasm()]);

  const svg = await satori(node, options);
  const resvg = new Resvg(svg);

  return resvg.render().asPng();
};
