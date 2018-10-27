import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the RegionPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-region-popover',
    templateUrl: 'region-popover.html',
})
export class RegionPopoverPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
        this.colleges = ["Columbia University", "Hunter College", "UT-Austin", "Stevens Tech", "St. Peters", "UMD"];
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad RegionPopoverPage');
    }
    colleges: any[];
    selectCollege(college) {
        this.view.dismiss(college);
    }
}
