import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';
import { InnerSchoolLeaderboardPage } from "../inner-school-leaderboard/inner-school-leaderboard";

/**
 * Generated class for the LeaderboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-leaderboard',
    templateUrl: 'leaderboard.html',
})
export class LeaderboardPage {

    title: any;
    yourSchool: any;
    colleges: any[];
    constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
        this.title = "Leaderboard";
        this.yourSchool = "Columbia University";
        this.colleges = this.getColleges();
    }
    getColleges() {
        return [
            {
                "rank": 1,
                "name": "Columbia University",
                "score": "20,000"
            },
            {
                "rank": 2,
                "name": "University of Texas at Austin",
                "score": "15,000"
            },
            {
                "rank": 3,
                "name": "Stevens Institute of Technology",
                "score": "1,000"
            }
        ];
    }

    openCollege(college) {
        const modal = this.modalCtrl.create(InnerSchoolLeaderboardPage, {"students": [{"rank": 1, "name": "John Smith", "score": "200"}, {"rank": 2, "name": "John Doe", "score": "150"}], "school": college});
        modal.present();
    }
    openYourCollege() {
        this.openCollege(this.yourSchool);
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad LeaderboardPage');
    }

    filterLeaderboard(event) {
        let substring = event.target.value;
        // console.log("Filter for:", substring);
        if(substring != "" && substring) {
            this.colleges = this.getColleges().filter((item) => {
                return (item["name"].toLowerCase().indexOf(substring.toLowerCase()) > -1);
            })
        } else {
            this.colleges = this.getColleges();
        }
    }
}
