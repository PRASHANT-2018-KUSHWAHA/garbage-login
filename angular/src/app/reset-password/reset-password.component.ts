import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  resetPasswordForm: FormGroup = new FormGroup ({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required])
  });

  constructor(private _router: Router, private _user: UserService) { }

  ngOnInit() {
  }

  moveToForgotUsername() {
    this._router.navigate(['/forgotUsername']);
  }
  moveToLogin() {
    this._router.navigate(['/login']);
  }



  resetPassword() {
    // tslint:disable-next-line:triple-equals
    if (!this.resetPasswordForm.valid) {
           console.log('Invalid form details');
           alert('Invalid form details');
           return;
    }
    // console.log(JSON.stringify(this.loginForm.value));
    this._user.reset(JSON.stringify(this.resetPasswordForm.value))
    .subscribe(
      data => { console.log(data);
        alert('Reset success');
         this._router.navigate(['/login']); } ,
      error => console.error(error)
    // tslint:disable-next-line:semicolon
    )
  }
}
