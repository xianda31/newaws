import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { MemberService } from 'src/app/aws.services/member.aws.service';
import { ToastService } from 'src/app/toaster/service/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private toastService: ToastService,
    private router: Router,
    private memberService: MemberService,
    private authenticator: AuthenticatorService
  ) { }

  signupForm !: FormGroup;
  // userId!: string;
  memberFound: boolean = false;
  memberConfirmed: boolean = false;
  memberId!: string;


  ngOnInit(): void {

    this.signupForm = new FormGroup({
      firstname: new FormControl({ value: '', disabled: true }),
      lastname: new FormControl({ value: '', disabled: true }),
      email: new FormControl({ value: '', disabled: false }),
      password: new FormControl(''),
      username: new FormControl(''),
      license: new FormControl(''),
    })

    this.signupForm.valueChanges.subscribe((value) => {
      this.memberFound = this.memberConfirmed;
    })
  }

  get username() { return this.signupForm.get('username')!.value; }
  get password() { return this.signupForm.get('password')!.value; }
  get email() { return this.signupForm.get('email')!.value; }

  async onSearch() {
    if (this.memberFound === false) {
      const member = await this.memberService.getMemberByLicense(this.signupForm.value.license);
      if (member === null) {
        this.toastService.showErrorToast('signup error', 'license inconnue du Club');
        return;
      } else if (member.email === this.email) {
        this.signupForm.patchValue({
          firstname: member.firstname,
          lastname: member.lastname,
          email: member.email
        });
        this.memberFound = true;
        this.memberId = member.id;
      }
    }
  }

  onConfirm() {
    this.signupForm.controls['license'].disable({ emitEvent: false });
    this.signupForm.controls['email'].disable({ emitEvent: false });
    this.memberFound = true;
    this.memberConfirmed = true;
  }

  async onSignup() {
    {
      console.log('signup: ', this.username, this.password, this.email, this.memberId);
      // this.authenticator.initiateAuth(this.username)
      //   .then(() => {
      //     this.toastService.showSuccessToast('signup success', 'Bienvenue ' + this.username);
      //     this.router.navigate(['/login']);
      //   })
      //   .catch((error) => {
      //     this.toastService.showErrorToast('signup error', 'erreur (' + error + ') lors de la creation du compte');
      //   }
      //   );
    }

  }

}
