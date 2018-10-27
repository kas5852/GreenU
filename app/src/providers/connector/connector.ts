import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
 
export class User {
  name: string;
  email: string;
  school: string;

  constructor(name: string, email: string, school: string) {
    this.name = name;
    this.email = email;
    this.school = school;
  }
}
 
@Injectable()
export class Connector {
  currentUser: User;

  constructor(private http:HttpClient)
  {

  }
 
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please enter both email and password.");
    } else {
      var req = this.http.post('http://localhost:5000', credentials).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
    }
}
 
  public register(credentials) {
    if (credentials.email === null || credentials.password === null || credentials.name == null || credentials.school) {
      return Observable.throw("Please enter both email and password.");
    } else {
      var req = this.http.post('http://localhost:5000', credentials).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}