import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TaskModalPage } from "../task-modal/task-modal";

@IonicPage()
@Component({
    selector: 'page-base',
    templateUrl: 'base.html',
})
export class BasePage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
        this.completedTasks = [];
        this.name = "Nahum Getachew";
        this.university = "Columbia University";
        this.points = 1000;
        this.universityPoints = 100000;
    }

    ionViewDidLoad() {
        
    }

    addTask() {
        const modal = this.modalCtrl.create(TaskModalPage);
        modal.onDidDismiss(
            task => {
                if (task != null)
                    this.completedTasks.push(task);
            }
        );
        modal.present();
    }
    completedTasks: any[];
    name: string;
    university: string;
    points: any;
    universityPoints: any;
}
