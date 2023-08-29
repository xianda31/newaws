import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/aws.services/cognito.aws.service';
import { MemberService } from 'src/app/aws.services/member.aws.service';
import { ToastService } from 'src/app/toaster/service/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm !: FormGroup;
  memberFound: boolean = false;
  memberConfirmed: boolean = false;
  isConfirmed: boolean = false;
  signupSucceded: boolean = false;

  constructor(
    private toastService: ToastService,
    private router: Router,
    private memberService: MemberService,
    private cognitoService: CognitoService

  ) { }
  ngOnDestroy(): void {
    if (!this.signupSucceded) {
      console.log('to do : cleanup partial signin');
      this.cognitoService._deleteLoggedUser();
    }
  }

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      firstname: new FormControl({ value: '', disabled: true }),
      lastname: new FormControl({ value: '', disabled: true }),
      email: new FormControl({ value: '', disabled: false }),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$')]),
      license: new FormControl(''),
    })

    this.signupForm.valueChanges.subscribe((value) => {
      this.memberFound = this.memberConfirmed;
    })
  }

  get password() { return this.signupForm.get('password')!; }
  get email() { return this.signupForm.get('email')!; }
  get firstname() { return this.signupForm.get('firstname')!; }
  get lastname() { return this.signupForm.get('lastname')!; }
  get license() { return this.signupForm.get('license')!; }

  async onSearch() {
    if (this.memberFound === false) {
      const member = await this.memberService.getMemberByLicense(this.signupForm.value.license);
      if (member === null) {
        this.toastService.showErrorToast('signup error', 'license inconnue du Club');
        return;
      } else if (member.email === this.email.value) {
        this.signupForm.patchValue({
          firstname: member.firstname,
          lastname: member.lastname,
          email: member.email,
          license: member.license
        });
        this.memberFound = true;
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
      this.cognitoService._signUp({
        email: this.email.value,
        password: this.password.value,
        firstname: this.firstname.value,
        lastname: this.lastname.value,
        license: this.license.value,
      }).then((result) => {
        // console.log('result: ', result);
        this.isConfirmed = true;
      })
        .catch((error) => {
          console.log('error: ', error);
          this.toastService.showErrorToast('signup error', error);
        }
        );
    }
  }
  confirmSignUp(code: string) {
    this.cognitoService._confirmSignUp({
      email: this.email.value,
      password: this.password.value,
      code: code,
    }).then((result) => {
      this.toastService.showSuccessToast('signup success', 'Bienvenue ' + this.firstname.value);
      this.signupSucceded = true;
      this.router.navigate(['/login']);
    })
      .catch((error) => {
        console.log('error: ', error);
        this.toastService.showErrorToast('signup error', 'erreur (' + error + ') lors de la verification du compte');
      }
      );






  }


}
