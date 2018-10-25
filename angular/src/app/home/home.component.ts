import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: String = '';

  constructor(private _user: UserService, private _router: Router) {
    this._user.home()
    .subscribe(
      data => this.addName(data),
      error => this._router.navigate(['/login'])
    );
   }

   addName(data) {
     this.username = data.username;
   }

  ngOnInit() {
  }

   logout() {
    this._user.logout()
    .subscribe(
      data => { console.log(data); this._router.navigate(['/login']); },
      error => console.error(error)
    );
   }
}
