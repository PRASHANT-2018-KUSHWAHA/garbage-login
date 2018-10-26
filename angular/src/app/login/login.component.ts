import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup ({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required])
  });


  constructor(private _router: Router, private _user: UserService) { }

  ngOnInit() {

  }
  moveToRegister() {
    this._router.navigate(['/register']);
  }
  moveToResetPassword() {
    this._router.navigate(['/resetPassword']);
  }
  moveToForgotUsername() {
    this._router.navigate(['/forgotUsername']);
  }

  login() {
    // tslint:disable-next-line:triple-equals
    if (!this.loginForm.valid) {
           console.log('Invalid form details');
           alert('Invalid form details');
           return;
    }
    // console.log(JSON.stringify(this.loginForm.value));
    this._user.login(JSON.stringify(this.loginForm.value))
    .subscribe(
      data => { console.log(data); alert('LogIn success'); this._router.navigate(['/home']); } ,
      error => console.error(error)
    // tslint:disable-next-line:semicolon
    )
  }
}
