import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the TaskModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-task-modal',
    templateUrl: 'task-modal.html',
})
export class TaskModalPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
        this.tasks = this.getAllTasks();
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad TaskModalPage');
    }

    filterTasks(ev) {
        let substring = ev.target.value;
        // console.log("Filter for:", substring);
        if(substring != "" && substring) {
            this.tasks = this.getAllTasks().filter((item) => {
                return (item["name"].toLowerCase().indexOf(substring.toLowerCase()) > -1);
            })
        } else {
            this.tasks = this.getAllTasks();
        }
    }
    selectTask(task) {
        this.view.dismiss(task);
    }
    getAllTasks() {
        const tasks = [
            {
                "name": "Recycle Drinks",
                "score": "5"
            },
            {
                "name": "Ride Bike to Work",
                "score": "15"
            },
            {
                "name": "Walk to Work",
                "score": "20"
            }
        ];
        return tasks;
    }
    tasks: any[];

    closeModel() {
        this.navCtrl.pop();
    }
}
