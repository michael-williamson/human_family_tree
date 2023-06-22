export interface OnChangeFunctionType {
    (e: React.ChangeEvent<HTMLInputElement>):void
}

export interface KeyNameType {
    [key: string]: boolean | undefined;
  }