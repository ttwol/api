interface IToken {
  readonly userId: number;
  readonly username: string;
  readonly iat: number;
  readonly exp: number;
}
