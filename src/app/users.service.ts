import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import * as Parse from 'parse';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UIService } from './ui.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private isAuthenticated = false;

  activeUser!: User;
  authChange = new BehaviorSubject<boolean>(false);
  userChange = new BehaviorSubject<User>(this.activeUser);
  avatarChange = new BehaviorSubject<boolean>(false);


  userSubject = new Subject<User[]>();
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
        // let user: Parse.User = await Parse.User.logIn(this.userLoggedIn.username,this.userLoggedIn.password);
        const currentUser: any = Parse.User.current();
        // const currentUser: Parse.User = Parse.User.current();
        console.log('Current logged in user', currentUser);

        this.activeUser = {
          username: currentUser.attributes.username,
          email: currentUser.attributes.email,
          avatarPicture: currentUser.attributes.avatarPicture,
          isAvatar: currentUser.attributes.isAvatar,
          id: currentUser.id
        };

        console.log(this.activeUser);

        // this.userChange.next(this.activeUser);
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
      // Pass the username and password to logIn function
      let user: Parse.User = await Parse.User.logIn(userInfo.username,userInfo.password);
      // Do stuff after successful login
      // this.getCurrentUser();
      this.isAuthenticated = true;
      this.authChange.next(true);
      this.router.navigate(['/user']);
      console.log('Logged in user', user);
    } catch (error: any) {
      console.error('Error while logging in user', error.message);
      this.uiService.showSnackBar(error.message,null,1000);
      this.authChange.next(false);
      this.isAuthenticated = false;
    }
  })();
 }

 register(userInfo: any){
   console.log(userInfo);

  (async () => {
    const user: Parse.User = new Parse.User();
    user.set('username', userInfo.username);
    user.set('email', userInfo.email);
    user.set('password', userInfo.password);
    user.set('avatarPicture', new Parse.File("resume.txt", { base64: btoa("My file content") }));
    user.set('isAvatar', false);
    try {
      let userResult: Parse.User = await user.signUp();
      console.log('User signed up', userResult);
      this.uiService.showSnackBar('Rejestracja zakończona pomyślnie :)',null,3000);
      this.router.navigate(['/login']);
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
      // Finds the user by its ID
      let user: Parse.Object = await query.get(id);
      //sprawdzenie
      // Updates the data we want
      user.set('avatarPicture', new Parse.File('zdjecie.jpg',avatar) );
      user.set('isAvatar', true);
      // user.set('avatarPicture', new Parse.File('napoli.jpg', { base64: btoa("My file content") }));
      try {
        // Saves the user with the updated data
        // this.getCurrentUser();
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
      // Finds the user by its ID
      let user: Parse.Object = await query.get(userData.id);
      // Updates the data we want
      user.set('username', userData.username);
      user.set('email', userData.email);
      if(avatar){
        user.set('avatarPicture', new Parse.File('zdjecie.jpg',avatar) );
      }

      try {
        // Saves the user with the updated data
        // this.getCurrentUser();

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
      // To verify that current user is now empty, currentAsync can be used
      const currentUser: any = await Parse.User.current();
      if (currentUser === null) {
        console.log('Success! No user is logged in anymore!');
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
      // Update state variable holding current user
      // getCurrentUser();
      return true;
    } catch (error: any) {
      alert(`Error! ${error.message}`);
      return false;
    }
  })();
}


}
