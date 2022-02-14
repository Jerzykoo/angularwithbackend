import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import * as Parse from 'parse';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UIService } from './ui.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private isAuthenticated = false;

  activeUser!: User;
  authChange = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private uiService: UIService) {
    const Parse = require('parse');

    Parse.serverURL = 'https://parseapi.back4app.com';
    Parse.initialize(
      'N2iz7LzDyGBuHmfPWXZlX5CK62NUwJsUgxZhmkok',
      'amffx9uRAZzjUFdzWnRTxo3GyDskisqcIA7KcNOw'
    );

  }

  init(){
    var currentUser = Parse.User.current();
    if (currentUser) {
      console.log(currentUser);

      this.isAuthenticated = true;
      this.authChange.next(true);
      } else {
      this.authChange.next(false);
      this.isAuthenticated = false;
      console.log('nie ma zalogowanego');
    }
  }

  getUser(){
    return this.activeUser;
  }

  getCurrentUser(){
   (async () => {
      try {
        const currentUser: any = Parse.User.current();

        this.activeUser = {
          username: currentUser.attributes.username,
          email: currentUser.attributes.email,
          avatarPicture: currentUser.attributes.avatarPicture,
          isAvatar: currentUser.attributes.isAvatar,
          id: currentUser.id
        };

      } catch (error: any) {
        console.error('Error while logging in user', error);
      }
    })();
    if(this.activeUser){
      return this.activeUser;
    }
  }

  isAuth(){
    return this.isAuthenticated;
  }

 login(userInfo: any){
  (async () => {
    try {
      let user: Parse.User = await Parse.User.logIn(userInfo.username,userInfo.password);

      this.isAuthenticated = true;
      this.authChange.next(true);
      this.router.navigate(['/user']);

    } catch (error: any) {
      console.error('Error while logging in user', error.message);
      this.uiService.showSnackBar(error.message,null,1000);
      this.authChange.next(false);
      this.isAuthenticated = false;
    }
  })();
 }

 register(userInfo: any){

  (async () => {
    const user: Parse.User = new Parse.User();
    user.set('username', userInfo.username);
    user.set('email', userInfo.email);
    user.set('password', userInfo.password);
    user.set('avatarPicture', new Parse.File("resume.txt", { base64: btoa("My file content") }));
    user.set('isAvatar', false);
    try {
      let userResult: Parse.User = await user.signUp();

      this.uiService.showSnackBar('Rejestracja zakończona pomyślnie :)',null,3000);
      this.isAuthenticated = true;
      this.authChange.next(true);
      this.router.navigate(['/user']);
    } catch (error: any) {
      this.uiService.showSnackBar(error.message,null,1000);
      console.error('Error while signing up user', error);
    }
  })();
 }

 updateAvatar(avatar: File,id: string){
  (async () => {
    const User: Parse.User = new Parse.User();
    const query: Parse.Query = new Parse.Query('User');

    try {
      let user: Parse.Object = await query.get(id);
      user.set('avatarPicture', new Parse.File('zdjecie.jpg',avatar) );
      user.set('isAvatar', true);

      try {
        let response: Parse.Object = await user.save();
        console.log(user);

        window.location.reload();
        console.log('Updated user', response);
      } catch (error: any) {
        console.error('Error while updating user', error);
      }
    } catch (error: any) {
      console.error('Error while retrieving user', error);
    }
  })();
 }

 updateUser(userData: any, avatar: File){
  (async () => {
    const User: Parse.User = new Parse.User();
    const query: Parse.Query = new Parse.Query('User');
    console.log(avatar);

    try {
      let user: Parse.Object = await query.get(userData.id);

      user.set('username', userData.username);
      user.set('email', userData.email);
      if(avatar){
        user.set('avatarPicture', new Parse.File('zdjecie.jpg',avatar) );
      }
      try {
        let response: Parse.Object = await user.save();
        this.router.navigate(['/user']);
        console.log('Updated user', response);
      } catch (error: any) {
        console.error('Error while updating user', error);
      }
    } catch (error: any) {
      console.error('Error while retrieving user', error);
    }
  })();
 }


logout(){
  (async () => {
    try {
      await Parse.User.logOut();
      const currentUser: any = await Parse.User.current();
      if (currentUser === null) {
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
      return true;
    } catch (error: any) {
      alert(`Error! ${error.message}`);
      return false;
    }
  })();
}

}
