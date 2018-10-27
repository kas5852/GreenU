import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegionPopoverPage } from './region-popover';

@NgModule({
  declarations: [
    RegionPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(RegionPopoverPage),
  ],
})
export class RegionPopoverPageModule {}
