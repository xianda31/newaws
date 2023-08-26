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
    this.cognitoService.userLoggedIn.subscribe(
      (userLogged) => {
        if (userLogged) {
          this.cognitoService._getUserInfo()
            .then((user) => {
              const license = user.attributes['custom:license'];
              this.user_rights = this.MemberService.getMemberByLicense(license)!.rights;
            })
            .catch((error) => {
              console.log('getUser error : ', error);
              this.user_rights = environment.default_rights;
            });
        } else {
          this.user_rights = environment.default_rights;
        }
      });
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.user_rights ? this.user_rights?.includes('p') : false;
  }

}
