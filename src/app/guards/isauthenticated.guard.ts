import { Injectable } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard {

  constructor(
    private auth: AuthentificationService
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.isAuthenticated;
  }
}
