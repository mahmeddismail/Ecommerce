import { Component } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  LoginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z0-9]{8,15}')]),
  })


  isLoading: boolean = false;
  ApiErrorforMail: string = ''
  ApiErrorforPassword: string = ''
  ApiLoginSuccess: string = ''
  constructor(private _AuthService: AuthService, private _Router: Router) { }

  handleLogin(LoginData: FormGroup) {
    this.isLoading = true;

    console.log(LoginData.value);
    // if (LoginData.valid) {
    this._AuthService.login(LoginData.value).subscribe({
      next: (res: any) => {
        console.log(res)
        if (res.message === 'success') {
          this.isLoading = false;
          this.ApiLoginSuccess = res.message
          localStorage.setItem('userToken', res.token)
          this._AuthService.decodedUserToken()
          this._Router.navigate(['/home'])

        }
      }
      ,
      error: (err) => {
        console.log(err)
        this.isLoading = false;
        this.ApiErrorforMail = err.error.message
        this.ApiErrorforPassword = err?.error?.errors?.msg
      },

      complete: () => {
        console.log("COMPLETED")

      }
    })
  }

}


// }
