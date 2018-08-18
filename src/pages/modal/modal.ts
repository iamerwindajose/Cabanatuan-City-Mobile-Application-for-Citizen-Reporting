import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Profile } from '../../models/profile';
import { ProfilePage } from '../profile/profile';
import { User } from '../../models/user';
import { ProfileProvider } from '../../providers/profile/profile';
import { Uid } from '../../models/uid';
import { Photo } from '../../models/photo';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  captureDataUrl: string;

  photo = {} as Photo;
	profile = {} as Profile;
  	user = {} as User;
  	uid = {} as Uid;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
   public fire: AngularFireAuth, public afDb: AngularFireDatabase, private provider: ProfileProvider,
   public cam: Camera) {
   		this.profile = this.provider.getProfile();
        this.user = this.provider.getUser();
        this.uid = this.provider.getUid();
        this.photo = this.provider.getPhoto();
        this.navParams.get('uid');
        console.log(this.uid);
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  capture() {
    //setup camera options
    const cameraOptions: CameraOptions = {
      quality: 90,
      destinationType: this.cam.DestinationType.DATA_URL,
      encodingType: this.cam.EncodingType.JPEG,
      mediaType: this.cam.MediaType.PICTURE,
    };
    this.cam.getPicture(cameraOptions).then((imageData) =>{
      this.captureDataUrl = 'data:image/jpeg;base64,'+ imageData;
    },
    (err) => {
      console.log(err);
    });
  }
  uploadPhoto(){
    
  }
}
