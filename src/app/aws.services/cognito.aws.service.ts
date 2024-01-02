import { Injectable } from "@angular/core";
import { Auth } from 'aws-amplify';
import { User } from "../interfaces/user.interface";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root"
})
export class CognitoService {

  currentUser: { username: string; license: string; } | null =
    (environment.logging_bypass ? { username: 'Christian', license: '02439752' } : null);

  private _currentAuthenticatedUser$: BehaviorSubject<any> = new BehaviorSubject<any>(this.currentUser);

  get currentAuthenticatedUser() {
    return this._currentAuthenticatedUser$.asObservable();
  }

  get user() {
    return this._currentAuthenticatedUser$.value;
  }

  async signIn(user: User): Promise<any> {
    try {
      const result = await Auth.signIn(user.email, user.password);
      this.currentUser = { username: result.attributes.name, license: result.attributes['custom:license'] };
      console.log('this.currentUser : ', result, this.currentUser);
      this._currentAuthenticatedUser$.next(this.currentUser);
      return (result);
    } catch (error) {
      return (null);
    }

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
    console.log('signing out ...');
    this._currentAuthenticatedUser$.next(null);
    return Auth.signOut();
  }

  _forgotPassword(email: string): Promise<any> {
    return Auth.forgotPassword(email);
  }

  _forgotPasswordSubmit(email: string, code: string, password: string): Promise<any> {
    return Auth.forgotPasswordSubmit(email, code, password);
  }

}

