import { Injectable } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsMemberMgrGuard {

  constructor(
    private auth: AuthentificationService
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const rights = this.auth.getRights();
    return rights ? rights?.includes('r') : false;
  }

}
