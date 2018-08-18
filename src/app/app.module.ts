import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { MainPage } from '../pages/main/main';
import { LoginPage } from '../pages/login/login';
import { NewsfeedPage } from '../pages/newsfeed/newsfeed';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { ProfileProvider } from '../providers/profile/profile';
import { HttpModule } from '@angular/http';
import { ProfilePage } from '../pages/profile/profile';
import { PopoverPage } from '../pages/popover/popover';
import { ModalPage } from '../pages/modal/modal';

export const firebaseConfig = {
    apiKey: "AIzaSyDQhqBGaJlh1pWakHIZedSyMVvY-GlGKSA",
    authDomain: "myapp-3380b.firebaseapp.com",
    databaseURL: "https://myapp-3380b.firebaseio.com",
    projectId: "myapp-3380b",
    storageBucket: "myapp-3380b.appspot.com",
    messagingSenderId: "321402276397"
  };
  firebase.initializeApp(firebaseConfig);
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'c9cd958b'
  }
};

  //For testing pictures in Ionic Lab
class CameraMock extends Camera {
  getPicture(options){
    return new Promise( (resolve, reject) => {
      resolve(`TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1
      bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgY
      SBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb2
      4gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=`);
    });
  }
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    MainPage,
    LoginPage,
    NewsfeedPage,
    ProfilePage,
    PopoverPage,
    ModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule,
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    MainPage,
    LoginPage,
    NewsfeedPage,
    ProfilePage,
    PopoverPage,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProfileProvider,
    Camera,
    //USE THIS for mock camera in Ionic Lab
    {provide: Camera, useClass: CameraMock}
  ]
})
export class AppModule {}
