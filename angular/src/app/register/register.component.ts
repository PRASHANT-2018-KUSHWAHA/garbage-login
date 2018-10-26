import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup ({
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, [Validators.required]),
    cpassword: new FormControl(null, Validators.required)
  });

  constructor(private _router:  Router, private _userService: UserService) { }

  ngOnInit() {
  }

  moveToLogin() {
    this._router.navigate(['/login']);
  }

  register() {
    // tslint:disable-next-line:triple-equals
    if (!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpassword.value)) {
           console.log('Invalid form details');
           alert('Invalid form details');
           return;
    }
    this._userService.register(JSON.stringify(this.registerForm.value))
    .subscribe(data => {
      console.log(data);
      alert('Register successfully');
      this._router.navigate(['/login']);
      },
       error => console.log(error)
     );
    // else {
    //       console.log(JSON.stringify(this.registerForm.value));
    // }
  }
}
