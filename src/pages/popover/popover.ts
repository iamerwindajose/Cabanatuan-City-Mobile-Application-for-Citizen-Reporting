import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, App } from 'ionic-angular';
import { MainPage } from '../main/main';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { Profile } from '../../models/profile';
import { ProfileProvider } from '../../providers/profile/profile';
import { User } from '../../models/user';
import { Uid } from '../../models/uid';
import { ProfilePage } from '../../pages/profile/profile';
@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  profile = {} as Profile;
  user = {} as User;
  uid = {} as Uid;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public viewCtrl: ViewController, public alert: AlertController, 
    public loadCtrl: LoadingController, public af: AngularFireAuth,
    private provider: ProfileProvider, public app: App) {
      this.profile = this.provider.getProfile();
      this.user = this.provider.getUser();
      this.uid = this.provider.getUid();
      this.navParams.get('user');
      this.navParams.get('uid');
  }

  close(){
    this.viewCtrl.dismiss();
  }
  logout(){
    if (this.af.authState) {
      this.provider.setUid(this.uid);
      this.provider.setUser(this.user);
      this.provider.setProfile(this.profile);
      console.log(this.profile);
    }
    else{
      console.log('error');
    }
    let confirm = this.alert.create({
      title: 'Logout',
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
      const loading = this.loadCtrl.create({
          content: 'Logging out',
          dismissOnPageChange:true
      });

      loading.present();

      setTimeout(() => {
      // Remove API token 
        this.af.auth.signOut();
        this.viewCtrl.dismiss();
        this.navCtrl.setRoot(HomePage);
        loading.dismiss();
      }, 3000);
  }
    home(){
      this.navCtrl.push(MainPage);  
    }
    viewprofile(){
      //navCtrl to profile
      this.navCtrl.push(ProfilePage);
    }
}
