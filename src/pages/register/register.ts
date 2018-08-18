import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { User } from '../../models/user';
import { Profile } from '../../models/profile';
import { LoginPage } from '../login/login';



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage{

  user = {} as User;
  profile = {} as Profile;
    
  y = 5000;
    
  constructor(public alertCtrl: AlertController, private db: AngularFireDatabase, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController) {
      
  }
  
  ionViewDidLoad(){
      console.log('Register Page');
  }    
    
  presentLoading() {
        let loading = this.loadingCtrl.create({
        content: "Please wait...", 
        dismissOnPageChange: true
                            });
        loading.present();
        
        setTimeout(() => {
            this.events.subscribe('', (y) => {this.y;}),this.y;
        }, 4000); 
        
        setTimeout(() => {
            loading.dismiss();
        }, 4000);
  }
    
    showAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
    
  showAlert2(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [ {
          text: 'LOGIN',
          handler: () => {
              this.navCtrl.push(LoginPage);
          }
      }]
    });
    alert.present();
  }
    
  register(){
    //console.log(this.user);
    //console.log(this.profile);
    if(this.user.email != undefined && this.user.password != undefined){
        
     if(this.user.password == this.user.confirmpassword){    
        
     this.fire.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
    .then(data => {
      console.log(data);
      this.db.object(`/users/${data.uid}`).set(this.profile);
      this.user.email = '';
      this.user.password = '';
     /* this.user.confirmpassword = '';*/         
      this.profile.firstname = '';
      this.profile.lastname = '';
      this.profile.birthdate = '';
      this.profile.gender = '';
      this.profile.number = '';
      this.showAlert2('Success',"Registration Successful!");
      this.presentLoading();
    })
    .catch( error => {
      //console.log(error);
      this.showAlert('Error', error.message);
    });
         }
        else{
            this.showAlert('Error', "Password and Confirm Password does not match!");
        }
    } 
      else {
        this.showAlert('Error', "Please fill out the field!");
      }
  }
}

