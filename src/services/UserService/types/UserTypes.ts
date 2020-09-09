export interface IUserInput {
  id: number
}

export interface ICreateUserInput {
  username: string;
  email: string;
  password: string;
}

export interface IUpdateUserInput {
  id: number;
  username: string;
  password: string;
}
