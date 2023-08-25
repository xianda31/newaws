import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    console.log('signup component destroyed');
  }

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      firstname: new FormControl({ value: '', disabled: true }),
      lastname: new FormControl({ value: '', disabled: true }),
      email: new FormControl({ value: '', disabled: false }),
      password: new FormControl(''),
      license: new FormControl(''),
    })

    this.signupForm.valueChanges.subscribe((value) => {
      this.memberFound = this.memberConfirmed;
    })
  }

  get password() { return this.signupForm.get('password')!.value; }
  get email() { return this.signupForm.get('email')!.value; }
  get firstname() { return this.signupForm.get('firstname')!.value; }
  get lastname() { return this.signupForm.get('lastname')!.value; }

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
      console.log('signing up: ', this.password, this.email);
      this.cognitoService._signUp({
        email: this.email,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname
      }).then((result) => {
        console.log('result: ', result);
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
      email: this.email,
      password: this.password,
      code: code,
    }).then((result) => {
      this.toastService.showSuccessToast('signup success', 'Bienvenue ' + this.firstname);
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
