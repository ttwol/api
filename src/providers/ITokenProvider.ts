export interface ITokenProvider {
  createToken(payload: any): string;
}