import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import {HttpClientModule} from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from "../pages/home/home";
import { BasePage } from "../pages/base/base";
import { TaskModalPage } from "../pages/task-modal/task-modal";
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { LeaderboardPage } from "../pages/leaderboard/leaderboard";
import { RegionPopoverPage } from "../pages/region-popover/region-popover";
import { InnerSchoolLeaderboardPage } from "../pages/inner-school-leaderboard/inner-school-leaderboard";
import { Connector } from '../providers/connector/connector';
import { AchievementsPage } from '../pages/achievements/achievements';
import { LocalNotifications } from '@ionic-native/local-notifications';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BasePage,
    TaskModalPage,
    SignupPage,
    LoginPage,
    LeaderboardPage,
    AchievementsPage,
    RegionPopoverPage,
    InnerSchoolLeaderboardPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LocalNotifications,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BasePage,
    TaskModalPage,
    SignupPage,
    LoginPage,
    LeaderboardPage,
    AchievementsPage,
    RegionPopoverPage,
    InnerSchoolLeaderboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Connector,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
