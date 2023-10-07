import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z0-9]{8,15}')]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z0-9]{8,15}')]),
    phone: new FormControl(null, [Validators.pattern('01[0125][0-9]{8}')]),
  }
    , { validators: this.rePasswordMatch }
  )


  isLoading: boolean = false;
  ApiErrorforMail: string = ''
  ApiErrorforPassword: string = ''
  constructor(private _AuthService: AuthService, private _Router: Router) { }


  rePasswordMatch(form: any) {
    let pass = form.controls['password']
    let rePass = form.controls['rePassword']
    if (pass?.value === rePass?.value) {
      return null;
    }
    else {
      rePass.setErrors({ match: "Password and rePassword are not matched" })
      return { match: "Password and rePassword are not matched" }
    }
  }


  handleRegister(myFormData: FormGroup) {
    this.isLoading = true;
    console.log(myFormData);
    if (myFormData.valid) {
      this._AuthService.register(myFormData.value).subscribe({
        next: (res: any) => {
          console.log(res)
          if (res.message === 'success') {
            this._Router.navigate(['/login'])
            this.isLoading = false;
          }
        }
        ,
        error: (err) => {
          console.log("ERROR REGISTER");
          console.log(err)
          this.isLoading = false;
          this.ApiErrorforMail = err.error.message
          this.ApiErrorforPassword = err?.error?.errors?.msg
        },

        complete: () => console.log("COMPLETED")
      })
    }
  }
}
