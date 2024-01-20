export interface LoggedUser {
  email: string;
  firstname: string;
  lastname: string;
  credentials: string;
  license: string;
}
export interface SignInParams {
  email: string;
  password: string;
}

export interface SignUpParams {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  license: string;
}