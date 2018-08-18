import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, App, PopoverController, } from 'ionic-angular';

import { ProfileProvider } from '../../providers/profile/profile';
import { Profile } from '../../models/profile';
import { User } from '../../models/user';
import { PopoverPage } from '../popover/popover';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile;
  user = {} as User;  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provider: ProfileProvider, 
    public alert: AlertController, 
    public app: App, public load: LoadingController, public pop: PopoverController) {

    this.profile = this.provider.getProfile();
    this.navParams.get('profile');
    this.user = this.provider.getUser();
  }
  popOver(myEvent){
    let popCtrl = this.pop.create(PopoverPage);
    popCtrl.present({
      ev: myEvent
    })
  }
  ionViewDidLoad(){
    
  }
}
