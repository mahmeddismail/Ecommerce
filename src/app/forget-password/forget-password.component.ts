import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) { }

  forgetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  })


  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, Validators.required),
  })

  myErrorforMail: string = ''
  myErrorforVerification: string = ''
  isLoading: boolean = false;
  hideMail: boolean = false

  forgetUserPassword(Data: FormGroup) {
    this.isLoading = true;
    this._AuthService.forgetPassword(Data.value).subscribe({
      next: (res) => {
        console.log(res)
        if (res.statusMsg === 'success') {
          this.isLoading = false;
          this.hideMail = true;
        }
      },
      error: (err) => {
        console.log(err)
        this.myErrorforMail = err.error.message
        this.isLoading = false;
        this.hideMail = false;
      }
    })
  }

  // ///////////////////////////

  verfiyTheCode(data: FormGroup) {
    this.isLoading = true;
    this._AuthService.verifyResetCode(data.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res);
        this._Router.navigate(['/resetPassword'])
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.myErrorforVerification = err.error.message

      }
    })
  }
}
