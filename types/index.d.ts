declare module "node-fetch-polyfill" {
  const fetch: typeof window.fetch;

  export default fetch;
}

declare module "satori/wasm" {
  function init(args: unknown): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const satori: any;

  export { init };
  export default satori;
}
