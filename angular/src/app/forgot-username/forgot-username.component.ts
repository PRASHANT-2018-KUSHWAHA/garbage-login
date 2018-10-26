import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from '../user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-forgot-username',
  templateUrl: './forgot-username.component.html',
  styleUrls: ['./forgot-username.component.css']
})
export class ForgotUsernameComponent implements OnInit {
  private readonly notifier: NotifierService;

  forgotUsernameForm: FormGroup = new FormGroup ({
    email: new FormControl(null, [Validators.email, Validators.required])
  });

  constructor(private _router: Router, private _user: UserService, notifier: NotifierService) {
    this.notifier = notifier;
  }

  ngOnInit() {
  }

  moveToRegister() {
    this._router.navigate(['/register']);
  }
  moveToResetPassword() {
    this._router.navigate(['/resetPassword']);
  }
  moveToLogin() {
    this._router.navigate(['/login']);
  }



  ForgotUsername() {
    // tslint:disable-next-line:triple-equals
    if (!this.forgotUsernameForm.valid) {
           console.log('Invalid form details');
           alert('Invalid form details');
           return;
    }
    // console.log(JSON.stringify(this.loginForm.value));
    this._user.forgot(JSON.stringify(this.forgotUsernameForm.value))
    .subscribe(
      data => { console.log(data); alert(' message sended please check'); this._router.navigate(['/login']); } ,
      error => console.error(error)
    // tslint:disable-next-line:semicolon
    )
  }
}
