import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';

import { User } from '../../models/user';
import { Profile } from '../../models/profile';
import { TabsPage } from '../tabs/tabs';

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
    
  user = {} as User;
  profile = {} as Profile;
    y = 5000;
  constructor(public alertCtrl: AlertController, public events: Events, public loadingCtrl: LoadingController, private db: AngularFireDatabase, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public facebook:Facebook, public googleplus:GooglePlus) {
    
  }
    presentLoading() {
        let loading = this.loadingCtrl.create({
        content: "Please wait...", 
        dismissOnPageChange: true
                            });
        loading.present();
        
        setTimeout(() => {
            this.events.subscribe('', 󰀀 => {this.y;}),this.y;
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
              this.navCtrl.push(TabsPage);
          }
      }]
    });
    alert.present();
  }
    
    fblogin(){
        this.facebook.login(['email']).then(res=>{
            const fc=firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
            firebase.auth().signInWithCredential(fc).then(fs=>{
                alert("firebase sec")
            }).catch(ferr=>{
                alert("firebase errc")
            })
            
        }).catch(err=>{
            alert(JSON.stringify(err))
        })
    }
    googlelogin(){
        this.googleplus.login({
            'webClientId':'983752400021-ua6p6cuisr7p501j10r2koi1aqmp8277.apps.googleusercontent.com'
        }).then(res=>{ firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(suc=>{
                alert("LOGIN SUCESS")
            }).catch(ns=>{
                alert("NOT SUCESS")
            })
        })
    }
  Signup(){
    this.presentLoading();
    //console.log(this.user);
    //console.log(this.profile);
    if(this.user.email != undefined && this.user.password != undefined && this.profile.firstName != undefined && this.profile.lastName != undefined){
    this.fire.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
    .then(data => {
      console.log(data);
      this.db.object(users/${data.uid}).set(this.profile);
      this.user.email = '';
      this.user.password = '';
      this.profile.firstName = '';
      this.profile.lastName = '';
      this.showAlert2('Success',"Successfully registered User");
    })
    .catch( error => {
      //console.log(error);
      this.showAlert('Error', error.message);
    });
    } else {
        this.showAlert('Error', "Please fill out the field!");
    }
  }
}