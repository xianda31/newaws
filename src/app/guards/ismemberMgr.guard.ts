import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CognitoService } from '../aws.services/cognito.aws.service';
import { MemberService } from '../aws.services/member.aws.service';

@Injectable({
  providedIn: 'root'
})
export class IsMemberMgrGuard {
  currentUser: { username: string; license: string; } | null = null;

  constructor(
    private auth: CognitoService,
    private memberService: MemberService
  ) {
    this.auth.currentAuthenticatedUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.currentUser) {
      return false;
    } else {
      let member = this.memberService.getMemberByLicense(this.currentUser.license);
      return member ? member.rights?.includes('r') : false;
    }
  }

}
