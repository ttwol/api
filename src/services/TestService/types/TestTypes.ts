export interface ITestInput {
  id: number
}

export interface ICreateTestInput {
  description: string;
  testTypeId: number;
}

export interface IUpdateTestInput extends ITestInput {
  description: string;
  testTypeId: number;
}