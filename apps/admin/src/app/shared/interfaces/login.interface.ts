export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  readonly access_token: string;
}
