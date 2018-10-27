import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
 
export class User {
  name: string;
  email: string;
  school: string;
  items: any[];
  points: string;
  universityPoints: string;

  constructor(name: string, email: string, school: string, items: any[], points: string, universityPoints: string) {
    this.name = name;
    this.email = email;
    this.school = school;
    this.items = items;
    this.points = points;
    this.universityPoints = universityPoints;
  }
}
 
@Injectable()
export class Connector {
  currentUser = null;
  constructor(private http:HttpClient) { }
 
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please enter both email and password.");
    } else {
      console.log(credentials);
      return this.http.post('http://localhost:5000/dashboard', credentials).map(
        res => { 
          console.log(res);
          this.universityPoints(res["school"]).subscribe(
            res => {
              this.currentUser = new User(res["name"], credentials.email, res["school"], res["items"], res["totalPoints"], String(res));
              return this.currentUser; 
            }
          )
        }
      );
    } 
}

public universityPoints(university)
{
  return this.http.post('http://localhost:5000/universityPoints', {"university": university}).map(
    res => { return res; }
  );
}
 
public register(credentials) {
    if (credentials.email === null || credentials.password === null || credentials.name == null || credentials.school) {
      return Observable.throw("Please enter both email and password.");
    } else {
      this.http.post('http://localhost:5000/register', credentials).map(
        res => {
          return res;
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.name);
          console.log(err.message);
          console.log(err.status);
        }
      );
    }
  }
 
  public logout() {
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }
}