import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Profile } from '../../models/profile';
import { User } from '../../models/user';
import { Uid } from '../../models/uid';
import { ProfilePage } from '../profile/profile';
import { ProfileProvider } from '../../providers/profile/profile';
import { PopoverPage } from '../popover/popover';
import { ModalPage } from '../modal/modal';


@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  profile = {} as Profile;
  user = {} as User;
  uid = {} as Uid;

  itemReports: Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private provider: ProfileProvider, public pop: PopoverController, public modal: ModalController,
    public db: AngularFireDatabase) {
      this.profile = this.provider.getProfile();
      this.user = this.provider.getUser();
      this.uid = this.provider.getUid();
      this.navParams.get('profile');
      console.log(this.uid);
      this.itemReports = db.list('reports');
  }
  
  popOver(myEvent){
    let popCtrl = this.pop.create(PopoverPage);
    popCtrl.present({
      ev: myEvent
    })
  }
  showModal(){
    let modalCtrl = this.modal.create(ModalPage);
    modalCtrl.present();
  }
  ionViewDidLoad(){
    this.itemReports = this.db.list('/reports',{
      query: {
        limitToFirst: 1000
      }
    });
    console.log(this.itemReports);
  }
}
