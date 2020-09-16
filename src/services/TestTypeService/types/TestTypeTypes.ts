export interface ITestTypeInput {
  id: number
}

export interface ICreateTestTypeInput {
  description: string;
}

export interface IUpdateTestTypeInput extends ITestTypeInput {
  description: string;
}