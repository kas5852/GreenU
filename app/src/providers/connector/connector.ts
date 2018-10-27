import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Globals } from '../../Globals';
 
export class User {
  name: string;
  email: string;
  school: string;
  items: any[];
  points: string;
  universityPoints: string;
  suggestions: any[];

  constructor(name: string, email: string, school: string, items: any[], points: string, universityPoints: string, suggestions: any[]) {
    this.name = name;
    this.email = email;
    this.school = school;
    this.items = items;
    this.points = points;
    this.universityPoints = universityPoints;
    this.suggestions = suggestions;
  }
}
 
@Injectable()
export class Connector {
  currentUser = null;
  constructor(private http:HttpClient) { }

  public addTask(email, keyword) {
    return this.http.post(Globals.url + "/addTask", {"email": email, "keyword": keyword}).map(
      resp => {
        return resp;
      }
    )
  }

  public getTaskList() {
    return this.http.get(Globals.url + "/task").map(
      response => {
        let tasks = [];
        for(const key of Object.keys(response)) {
          tasks.push(response[key]);
        }
        return tasks;
      }
    )
  }
  public getUserData(email) {
    return this.http.post(Globals.url + "/dashboard", {"email": email}).map(
      resp => {
        return resp;
      }
    );
  }
  public getLeaderboard() {
    return this.http.post(Globals.url + "/leaderboard", {}).map(
      resp => {
        console.log("Leaderboard:", resp);
        return resp;
      }
    );
  }
  public getUni(school) {
    return this.http.post(Globals.url + "/getUni", {"school": school}).map(
      resp => {
        return resp;
      }
    );
  }
 
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please enter both email and password.");
    } else {
      console.log(credentials);
      return this.http.post(Globals.url + '/dashboard', credentials).map(
        res => { 
              this.currentUser = new User(res["name"], credentials.email, res["school"], res["items"], res["totalPoints"], res["universityPoints"], res["suggestions"]);
              return this.currentUser; 
        }
      );
    }
}

public register(credentials) {
    if (credentials.email === null || credentials.password === null || credentials.name == null || credentials.school) {
      return Observable.throw("Please enter both email and password.");
    } else {
      this.http.post(Globals.url + '/register', credentials).map(
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
 
  public suggestions() {
    return this.http.post(Globals.url + "/getSuggestions", {}).map(
      resp => {
        return resp;
      }
    );
  }

  public logout() {
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }
}