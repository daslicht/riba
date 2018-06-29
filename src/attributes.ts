/**
 * Attribiute tyoes
 */
export const PRIMITIVE = 0;
export const KEYPATH = 1;

export interface IKeypaths {
  [propertyName: string]: string;
}

export interface IPrimitives {
  [propertyName: string]: any;
}


export const DEFAULT_PROPERTYNAME = '_binder';