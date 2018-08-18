import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { ProfileProvider } from '../../providers/profile/profile';
import { Profile } from '../../models/profile';
import { User } from '../../models/user';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-newsfeed',
  templateUrl: 'newsfeed.html',
})
export class NewsfeedPage {

  profile = {} as Profile;
  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private db: AngularFireDatabase, private fire: AngularFireAuth,
              private provider: ProfileProvider, public alert: AlertController, public app: App, public load: LoadingController) {
        this.profile = this.provider.getProfile();
        this.user = this.provider.getUser();

        this.navParams.get('profile');
  }
  
  logout(){
    
    this.user.email="";
    this.user.password="";
    this.profile.lastname = '';
    this.profile.firstname = '';
    this.profile.birthdate = '';
    this.profile.gender = '';
    this.profile.number = '';
    this.provider.setProfile(this.profile);
    this.provider.setUser(this.user);



    let confirm = this.alert.create({
      title: 'Confirmation',
          message: 'Are you sure you want to logout?',
            buttons: [
              {
                text: 'Yes',
                handler: () => {
               this.presentLoadingDefault();
                }
              },
              {
                text: 'No',
                handler: () => {
                  console.log('No clicked');
                }
              }
            ]
          });
          confirm.present();
  
  }
    presentLoadingDefault() {
      const loading = this.load.create({
          content: 'Logging out',
          dismissOnPageChange:true
      });

      loading.present();

      setTimeout(() => {
      // Remove API token 
      const root = this.app.getRootNav();
      root.popToRoot();
      loading.dismiss();
      }, 3000);
      console.log(this.profile);
    }
}
