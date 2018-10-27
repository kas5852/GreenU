import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TaskModalPage } from "../task-modal/task-modal";
import { Connector } from "../../providers/connector/connector"

@IonicPage()
@Component({
    selector: 'page-base',
    templateUrl: 'base.html',
})
export class BasePage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private connector: Connector) {
    }

    ionViewDidLoad() {
        if (this.connector.currentUser)
        {
            this.completedTasks = this.connector.currentUser.items;
            this.name = this.connector.currentUser.name;
            this.university = this.connector.currentUser.school;
            this.points = this.connector.currentUser.points;
            this.universityPoints = this.connector.currentUser.universityPoints;
        }
    }

    addTask() {
        const modal = this.modalCtrl.create(TaskModalPage);
        modal.onDidDismiss(
            task => {
                if (task != null) {
                    this.completedTasks.push(task);
                    this.points += Number(task.score);
                    this.universityPoints += Number(task.score);
                }
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
