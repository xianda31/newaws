import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CognitoService } from '../aws.services/cognito.aws.service';
import { MemberService } from '../aws.services/member.aws.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IsPublisherGuard {

  user_rights: string = environment.default_rights;
  constructor(
    private cognitoService: CognitoService,
    private MemberService: MemberService
  ) {
    this.cognitoService.currentAuthenticatedUser.subscribe(
      (user) => {
        if (user) {
          const license = user.license;
          this.user_rights = this.MemberService.getMemberByLicense(license)!.rights;
        } else {
          this.user_rights = environment.default_rights;
        }
      });
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.user_rights ? this.user_rights?.includes('p') : false;
  }

}
