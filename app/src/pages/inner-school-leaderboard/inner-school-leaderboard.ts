import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Connector } from '../../providers/connector/connector' 

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

    defaultStudents: any = [];
    students: any;
    showSpinner = true;
    constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, params: NavParams, private connect: Connector) {
        this.schoolName = params.get("school");
        console.log("School name?", this.schoolName);
        this.connect.getUni(this.schoolName).subscribe(
            data => {
                setTimeout(() => {
                    for(const key of Object.keys(data)) {
                        data[key]["rank"] = Number(key) + 1;
                        this.defaultStudents.push(data[key]);
                    }
                    this.students = this.defaultStudents.slice(0);
                    this.showSpinner = false;
                }, 1000);
            }
        );
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
    schoolName: any;
}
