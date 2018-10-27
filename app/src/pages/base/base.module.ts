import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BasePage } from './base';

@NgModule({
  declarations: [
    BasePage,
  ],
  imports: [
    IonicPageModule.forChild(BasePage),
  ],
})
export class BasePageModule {}
