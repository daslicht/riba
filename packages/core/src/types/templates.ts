/** Type definition for html-loader */
declare module "*.html" {
  const content: string;
  export default content;
}
/** Type definition for pug-loader: https://github.com/pugjs/pug-loader */
declare module "*.pug" {
  const pug: (locals?: any) => string;
  export default pug;
}

declare module "*.svg" {
  const svg: string;
  export default svg;
}
