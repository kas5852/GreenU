import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from "../pages/home/home";
import { BasePage } from "../pages/base/base";
import { TaskModalPage } from "../pages/task-modal/task-modal";
import { LeaderboardPage } from "../pages/leaderboard/leaderboard";
import { RegionPopoverPage } from "../pages/region-popover/region-popover";
import { InnerSchoolLeaderboardPage } from "../pages/inner-school-leaderboard/inner-school-leaderboard";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BasePage,
    TaskModalPage,
    LeaderboardPage,
    RegionPopoverPage,
    InnerSchoolLeaderboardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BasePage,
    TaskModalPage,
    LeaderboardPage,
    RegionPopoverPage,
    InnerSchoolLeaderboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
