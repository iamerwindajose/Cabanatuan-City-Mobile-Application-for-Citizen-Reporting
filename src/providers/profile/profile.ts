import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { User } from '../../models/user';
import { Profile } from '../../models/profile';
import { Uid } from '../../models/uid';
import { Photo } from '../../models/photo';

@Injectable()
export class ProfileProvider {
    
  user = {} as User;
  profile = {} as Profile;
  uid = {} as Uid;
  photo = {} as Photo;

  constructor(public http: Http) {
    console.log('Hello ProfileProvider Provider');
  }
    
  setProfile(profile){
    this.profile = profile;
  }
  
  getProfile(){
    return this.profile;
  }
  
  setUser(user){
    this.user = user;
  }
  
  getUser(){
    return this.user;
  }
  setUid(uid){
    this.uid = uid;
  }
  getUid(){
    return this.uid;
  }
  setPhoto(photo){
    this.photo = photo;
  }
  getPhoto(){
    return this.photo;
  }
}
