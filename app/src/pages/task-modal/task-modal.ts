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

    defaultTasks: any[] = [];
    constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
        this.defaultTasks = navParams.get("tasks");
        console.log(this.defaultTasks);
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
                return (item["keyword"].toLowerCase().indexOf(substring.toLowerCase()) > -1);
            })
        } else {
            this.tasks = this.getAllTasks();
        }
    }
    selectTask(task) {
        this.view.dismiss(task);
    }
    getAllTasks() {
        return this.defaultTasks.slice(0);
    }
    tasks: any[];

    closeModel() {
        this.navCtrl.pop();
    }
}
