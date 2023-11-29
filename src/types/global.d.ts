declare module "*.module.css" {
  interface IClassName {
    [className: string]: string;
  }
  const className: IClassName;
  export = className;
}

declare module "*.jpeg";
declare module "*.jpg";
