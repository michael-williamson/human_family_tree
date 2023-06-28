import { ReactNode } from "react";

export interface OnChangeFunctionType {
    (e: React.ChangeEvent<HTMLInputElement>):void
}

export interface KeyNameType {
    [key: string]: boolean | undefined;
  }

  export interface ReactChildrenProp {
    children:ReactNode
  }