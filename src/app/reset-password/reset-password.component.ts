import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],

})
export class ResetPasswordComponent {

  constructor(private _AuthService: AuthService, private _Router: Router) { }



  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z0-9]{8,15}')]),
  })
  isLoading: boolean = false;
  ApiErrorforMail: string = ''
  ApiErrorforPassword: string = ''
  ApiLoginSuccess: string = ''



  resetUserPassword(loginData: FormGroup) {
    this._AuthService.resetPassword(loginData.value).subscribe({
      next: (res: any) => {
        console.log(res)
        this.isLoading = false;
        this.ApiLoginSuccess = res.message
        this._Router.navigate(['/login'])
        // localStorage.setItem('userToken', res)
      }
      ,
      error: (err) => {
        console.log(err)
        this.isLoading = false;
        this.ApiErrorforMail = err.error.message
        this.ApiErrorforPassword = err?.error?.errors?.msg
      }
    })

  }

}
