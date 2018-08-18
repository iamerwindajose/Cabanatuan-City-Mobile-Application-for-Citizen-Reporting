import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


import { User } from '../../models/user';
import { Profile } from '../../models/profile';
import { MainPage } from '../main/main';
import { Uid } from '../../models/uid';
import { ProfileProvider } from '../../providers/profile/profile';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

   user = {} as User;
  profile = {} as Profile;
  uid = {} as Uid;
  
  constructor(public alertCtrl: AlertController, private db: AngularFireDatabase, private fire: AngularFireAuth, 
    public navCtrl: NavController, public navParams: NavParams, private provider: ProfileProvider, 
    private toast: ToastController, private loadingCtrl: LoadingController) {
     
  }
    
  showAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
  
  login(){
    
    if(this.user.email != undefined && this.user.password != undefined){
      this.fire.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
    .then(data => {
        this.user.password = '';
        this.db.object(`/users/${data.uid}`).subscribe(profile => {
        this.provider.setProfile(profile);
        this.profile.firstname = "this.db.object(`/users/${data.firstname}`)";
        this.uid.id = data.uid;
        this.provider.setUid(this.uid);
        console.log(this.uid.id);
        this.profile = this.provider.getProfile();
        // console.log(this.profile);
          const loading = this.loadingCtrl.create({
            content: 'Please wait...'
          });

          loading.present();

          setTimeout(() => {
            this.toast.create({
              message: `Welcome to Alerto, `+this.profile.firstname+``,
              duration: 2000,
              position: 'top'
            }).present();
            console.log(this.profile);
            this.navCtrl.setRoot(MainPage,{profile : profile});    
            loading.dismiss();
          }, 1500);          
      })
    })
    .catch(error => {
      //console.log(error);
      this.showAlert('Error', error.message);
    });
    }
    else {
        this.showAlert('Error', "Please fill out the fields!");
        }
    }
  }