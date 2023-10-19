import { CanActivateFn } from '@angular/router';
import { CognitoService } from '../aws.services/cognito.aws.service';
import { inject } from '@angular/core';
import { MemberService } from '../aws.services/member.aws.service';

export function canActivateGuard(right: string): CanActivateFn {
  return () => {
    const authService: CognitoService = inject(CognitoService);
    const memberService: MemberService = inject(MemberService);
    const user = authService.user;
    if (!user) {
      console.log('user not logged in')
      return false;
    } else {
      let member = memberService.getMemberByLicense(user.license);
      const rights = member?.rights;
      if (right == 'any right') {
        // console.log('checking right for user %s : %s', user.username, rights);
        return (rights == '') ? false : true;
      } else {
        // console.log('checking right for user %s : %s', user.username, rights?.includes(right));
        return (rights?.includes(right) ? true : false);
      }
    }

  }
}
