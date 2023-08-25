import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/aws.services/cognito.aws.service';
import { ToastService } from 'src/app/toaster/service/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private cognitoService: CognitoService,
    private toastService: ToastService,
    private router: Router
  ) { }

  loginForm !: FormGroup;
  // loginRefused: boolean = false;
  // resetMode: boolean = false;

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(6)]),
    })

  }
  get email() { return this.loginForm.get('email')!; }
  get password() { return this.loginForm.get('password')!; }

  onLogin() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.cognitoService._signIn({
      email: this.email.value,
      password: this.password.value
    })
      .then((result) => {
        this.toastService.showSuccessToast('login success', 'Bonjour ' + result.attributes.name);
        this.cognitoService.userLogged(true);
        this.router.navigate(['/']);

      })
      .catch((error) => {
        this.toastService.showInfoToast('login error', 'email/password incorrect');
        console.log('login error: ', error);
        // this.loginRefused = true;
      }
      );
  }


  confirmSignIn(code: string) {
    console.log('confirmSignIn code : ', code);
  }

  onReset() {
    if (this.email.invalid) {
      this.loginForm.markAllAsTouched();

    } else {

      this.router.navigate(['/pswreset', this.email.value]);
    }
  }


}
