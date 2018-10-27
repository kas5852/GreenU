import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from "../pages/home/home";
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { Subscription } from 'rxjs/Subscription';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  private onPauseSubscription: Subscription;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage, private localNotifications: LocalNotifications) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

    storage.get('login:status').then(loggedIn => {
        this.rootPage = loggedIn ? HomePage : LoginPage;
      });

    this.onPauseSubscription = platform.pause.subscribe(() => {
      this.localNotifications.schedule({
        title: 'Going to class?',
        text: 'Don\'t forget to ride your bike!',
        trigger: {at: new Date(new Date().getTime() + 3600)},
        led: 'FF0000',
        sound: null
     });
    }); 

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

