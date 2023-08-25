import { Injectable } from "@angular/core";
import { Auth } from 'aws-amplify';
import { User } from "../interfaces/user.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CognitoService {

  // _userLoggedIn: boolean = false;
  UserLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  userLogged(bool: boolean) {
    this.UserLoggedIn$.next(bool);
  }

  get userLoggedIn() {
    return this.UserLoggedIn$.asObservable();
  }

  _signUp(user: User): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        email: user.email,
        name: user.firstname,
        family_name: user.lastname,
        'custom:license': user.license
      }
    });
  }

  _confirmSignUp(user: User): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code ? user.code : '');
  }

  _deleteLoggedUser(): Promise<any> {
    return Auth.deleteUser();
  }

  _signIn(user: User): Promise<any> {
    return Auth.signIn(user.email, user.password);
  }

  _signOut(): Promise<any> {
    return Auth.signOut();
  }

  _forgotPassword(email: string): Promise<any> {
    return Auth.forgotPassword(email);
  }

  _forgotPasswordSubmit(email: string, code: string, password: string): Promise<any> {
    return Auth.forgotPasswordSubmit(email, code, password);
  }

  _getUserInfo(): Promise<any> {
    return Auth.currentAuthenticatedUser();
  }
}

