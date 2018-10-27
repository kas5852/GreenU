import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskModalPage } from './task-modal';

@NgModule({
  declarations: [
    TaskModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskModalPage),
  ],
})
export class TaskModalPageModule {}
