import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TaskModalPage } from "../task-modal/task-modal";

@IonicPage()
@Component({
    selector: 'page-base',
    templateUrl: 'base.html',
})
export class BasePage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, completedTasks, name, university, points, universityPoints) {
        this.completedTasks = completedTasks;
        this.name = name;
        this.university = university;
        this.points = points;
        this.universityPoints = universityPoints;
    }

    ionViewDidLoad() {
        
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
