export enum InputTypes {
  TEXT = 0,
  PASSWORD = 1,
}

export type LoginInput = {
  type: InputTypes;
  label: string;
  name: string;
  placeholder: string;
  rules: any;
};
