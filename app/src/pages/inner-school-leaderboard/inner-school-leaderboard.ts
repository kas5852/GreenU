import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the InnerSchoolLeaderboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-inner-school-leaderboard',
    templateUrl: 'inner-school-leaderboard.html',
})
export class InnerSchoolLeaderboardPage {

    defaultStudents: any;
    students: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, params: NavParams) {
        this.schoolName = params.get("school");
        this.defaultStudents = params.get("students");
        this.students = this.defaultStudents.slice(0);
    }

    filterStudents(event) {
        let substring = event.target.value;
        // console.log("Filter for:", substring);
        if(substring != "" && substring) {
            this.students = this.defaultStudents.slice(0).filter((item) => {
                return (item["name"].toLowerCase().indexOf(substring.toLowerCase()) > -1);
            })
        } else {
            this.students = this.defaultStudents.slice(0);
        }
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad InnerSchoolLeaderboardPage');
    }
    close() {
        this.view.dismiss();
    }
    students: any[];
    schoolName: any;
}
