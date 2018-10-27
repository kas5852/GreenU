import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TaskModalPage } from "../task-modal/task-modal";

/**
 * Generated class for the BasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-base',
    templateUrl: 'base.html',
})
export class BasePage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
        this.completedTasks = [];
    }

    ionViewDidLoad() {
        
    }

    addTask() {
        // console.log("Open modal?");
        const modal = this.modalCtrl.create(TaskModalPage);
        modal.onDidDismiss(
            task => {
                this.completedTasks.push(task);
            }
        );
        modal.present();
    }
    completedTasks: any[];
}
