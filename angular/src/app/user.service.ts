import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }


  register(body: any) {
      return this._http.post('http://127.0.0.1:3000/users/register', body, {
        observe: 'body', // so that httpclient class look for body  not the complete response
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      });
  }

  login(body: any) {
    return this._http.post('http://127.0.0.1:3000/users/login', body, {
      observe: 'body', // so that httpclient class look for body  not the complete response
      withCredentials: true,  // without this cooki will not sent to the browser because in app.js file in cors we define credentials: true
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  home() {
    return this._http.get('http://127.0.0.1:3000/users/home', {
      observe: 'body', // so that httpclient class look for body  not the complete response
      withCredentials: true,  // without this cooki will not sent to the browser because in app.js file in cors we define credentials: true
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  logout() {
    return this._http.get('http://127.0.0.1:3000/users/logout', {
      observe: 'body', // so that httpclient class look for body  not the complete response
      withCredentials: true,  // without this cooki will not sent to the browser because in app.js file in cors we define credentials: true
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  forgot(body: any) {
    return this._http.post('http://127.0.0.1:3000/users/forgotUsername', body, {
      observe: 'body', // so that httpclient class look for body  not the complete response
      withCredentials: true,  // without this cooki will not sent to the browser because in app.js file in cors we define credentials: true
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  reset(body: any) {
    return this._http.post('http://127.0.0.1:3000/users/resetPassword', body, {
      observe: 'body', // so that httpclient class look for body  not the complete response
      withCredentials: true,  // without this cooki will not sent to the browser because in app.js file in cors we define credentials: true
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
