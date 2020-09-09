export interface ITokenProvider {
  createToken(body: any): string;
}