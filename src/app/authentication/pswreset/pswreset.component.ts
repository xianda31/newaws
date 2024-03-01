import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CognitoService } from 'src/app/aws.services/cognito.aws.service';
import { ToastService } from 'src/app/toaster/toast.service';

@Component({
  selector: 'app-pswreset',
  templateUrl: './pswreset.component.html',
  styleUrls: ['./pswreset.component.scss']
})
export class PswresetComponent implements OnInit {

  constructor(
    private cognitoService: CognitoService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

  }

  resetForm!: FormGroup;

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        const email = paramMap.get('email')!;
        this.initForm(email);
      }
    );
  }

  initForm(email: string) {

    this.cognitoService._forgotPassword(email).then((result) => {
      this.toastService.showSuccessToast('resetPassword success', 'un code vous a été envoyé par mail');
      this.resetForm = new FormGroup({
        email: new FormControl({ value: email, disabled: true }),
        password: new FormControl('', [Validators.minLength(8), Validators.required, Validators.pattern('^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$')]),
        code: new FormControl('', [Validators.required])
      })
    }
    ).catch((error) => {
      console.log('forgotPassword error : ', error);
      this.toastService.showErrorToast('forgotPassword error', error);
      this.router.navigate(['home']);
    });
  }

  get email() { return this.resetForm.get('email')!; }
  get password() { return this.resetForm.get('password')!; };
  get code() { return this.resetForm.get('code')!; };

  onSubmit() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }
    console.log('onReset : ', this.email.value, this.code.value, this.password.value);
    this.cognitoService._forgotPasswordSubmit(this.email.value, this.code.value, this.password.value)
      .then((result) => {
        this.toastService.showSuccessToast('resetPassword success', 'votre mot de passe a été réinitialisé');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log('resetPassword error : ', error);
        this.toastService.showErrorToast('resetPassword error', error);
      })
  }

}
