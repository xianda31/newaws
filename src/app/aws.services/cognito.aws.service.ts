import { Injectable } from "@angular/core";
import { Amplify } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { ModelCategoryConditionInput } from '../API.service';
import { User } from "../interfaces/user.interface";

@Injectable({
  providedIn: "root"
})
export class CognitoService {

  // Amplify.configure({
  //   Auth: environment.cognito
  // });


  _signUp(user: User): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        email: user.email,
        name: user.firstname,
        family_name: user.lastname,
      }
    });
  }


  _confirmSignUp(user: User): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code ? user.code : '');
  }


  _deleteLoggedUser(): Promise<any> {

    return Auth.deleteUser();
  }


  _getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  _signIn(user: User): Promise<any> {
    return Auth.signIn(user.email, user.password);
  }

  // _confirmSignIn(user: User): Promise<any> {
  //   return Auth.confirmSignIn(user.email, user.code ? user.code : '');
  // }

  _signOut(): Promise<any> {
    return Auth.signOut();
  }

  _forgotPassword(email: string): Promise<any> {
    return Auth.forgotPassword(email);
  }

  _forgotPasswordSubmit(email: string, code: string, password: string): Promise<any> {
    return Auth.forgotPasswordSubmit(email, code, password);
  }
}
