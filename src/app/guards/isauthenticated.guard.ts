import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CognitoService } from '../aws.services/cognito.aws.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard {
  currentUser: { username: string; license: string; } | null = null;

  constructor(
    private auth: CognitoService
  ) {
    this.auth.currentAuthenticatedUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    return this.currentUser ? true : false;
  }
}
