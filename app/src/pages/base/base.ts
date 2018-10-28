import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TaskModalPage } from "../task-modal/task-modal";
import { Connector } from "../../providers/connector/connector"
import { Globals } from '../../Globals';

@IonicPage()
@Component({
    selector: 'page-base',
    templateUrl: 'base.html',
})
export class BasePage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private connector: Connector) {
    }

    taskList: any[];
    ionViewDidLoad() {
        if (this.connector.currentUser)
        {
            this.completedTasks = this.connector.currentUser.items;
            this.suggestions = this.connector.currentUser.suggestions;
            this.name = this.connector.currentUser.name;
            this.university = this.connector.currentUser.school;
            this.points = Number(this.connector.currentUser.points);
            this.universityPoints = this.connector.currentUser.universityPoints;
            this.connector.getTaskList().subscribe(
                data => {
                    this.taskList = data;
                    console.log("Got tasks!", data);
                }
            );
        }
    }

    addTask() {
        const modal = this.modalCtrl.create(TaskModalPage, {"tasks": this.taskList});
        modal.onDidDismiss(
            task => {
                if (task != null) {
                    this.completedTasks.push(task);
                    console.log("Points:", this.points);
                    console.log("Typeof points:", typeof(this.points));
                    this.points += Number(task.points);
                    this.universityPoints += Number(task.points);
                    // Update database
                    this.connector.addTask(Globals.email, task.keyword).subscribe(
                        data => {
                            console.log("Succesfully added task to db");
                        }, error => {
                            console.log("Error adding to db:", error);
                        }
                    )
                }
            }
        );
        modal.present();
    }
    completedTasks: any[];
    suggestions: any[];
    name: string;
    university: string;
    points: number;
    universityPoints: any;
    addSuggestion(task) {
        const obj = {"keyword": Globals.suggestionMap[task[0]], "points": task[2]};
        this.completedTasks.push(obj);
        this.points += Number(obj.points);
        this.universityPoints += Number(obj.points);
        this.connector.addTask(Globals.email, obj.keyword).subscribe(
            data => {
                console.log("Succesfully added task to db");
            }, error => {
                console.log("Error adding to db:", error);
            }
        )
    }
}
