import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import * as Parse from 'parse';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[] = [];
  private isAuthenticated = false;
  activeUser!: any;
  authChange = new Subject<boolean>();

  initChange = new Subject<boolean>();

  userSubject = new Subject<User[]>();
  constructor(private router: Router) {
    const Parse = require('parse');

    Parse.serverURL = 'https://parseapi.back4app.com';
    Parse.initialize(
      'N2iz7LzDyGBuHmfPWXZlX5CK62NUwJsUgxZhmkok',
      'amffx9uRAZzjUFdzWnRTxo3GyDskisqcIA7KcNOw'
    );

    this.initChange.next(true);
    // this.authChange.next(false);
    // this.fetchUsers();
  }

  init(){
    var currentUser = Parse.User.current();
    if (currentUser) {

      const email:string = currentUser.get('email');
      const username:string = currentUser.get('username');
      const avatarPicture:string = currentUser.get('avatarPicture');
      this.activeUser = {
        username,
        email,
        avatarPicture,
        id: currentUser.id
      };
        this.isAuthenticated = true;
        this.initChange.next(true);
        // this.router.navigate(['/user']);
        console.log('a');
    } else {
      this.initChange.next(false);
      console.log('nie ma zalogowanego');
      this.router.navigate(['/login']);
        // show the signup or login page
    }
  }

  getUser(){
    return this.activeUser;
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
      const email:string = user.get('email');
      const username:string = user.get('username');
      const avatarPicture:string = user.get('avatarPicture');
      this.activeUser = {
        username,
        email,
        avatarPicture,
        id: user.id
      };
      this.isAuthenticated = true;
      this.authChange.next(true);
      this.router.navigate(['/user']);
      console.log('Logged in user', user);
    } catch (error: any) {
      console.error('Error while logging in user', error);
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
    try {
      let userResult: Parse.User = await user.signUp();
      console.log('User signed up', userResult);
    } catch (error: any) {
      console.error('Error while signing up user', error);
    }
  })();
 }

 updateUser(userData: any){
  (async () => {
    const User: Parse.User = new Parse.User();
    const query: Parse.Query = new Parse.Query('User');

    try {
      // Finds the user by its ID
      let user: Parse.Object = await query.get(userData.id);
      // Updates the data we want
      user.set('username', userData.username);
      user.set('email', userData.email);
      try {
        // Saves the user with the updated data
        this.activeUser = {
          username: user.get('username'),
          email: user.get('email'),
          id: user.id
        };

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



//  update(id: any){
//   (async () => {
//     const query: Parse.Query = new Parse.Query('users');
//     try {
//       // here you put the objectId that you want to update
//       const object: Parse.Object = await query.get(id);
//       object.set('email', 'patryk@gmail.com');
//       try {
//         const response: Parse.Object = await object.save();
//         console.log(response.get('email'));
//         console.log('email updated', response);
//         // this.fetchUsers();
//       } catch (error: any) {
//         console.error('Error while updating ', error);
//       }
//     } catch (error: any) {
//       console.error('Error while retrieving object ', error);
//     }
//   })();
//  }


//  add(){
//   (async () => {
//     const myNewObject: Parse.Object = new Parse.Object('users');
//     myNewObject.set('email', 'ola@gmail.com');
//     myNewObject.set('password', '123456');
//     try {
//       const result: Parse.Object = await myNewObject.save();
//       // Access the Parse Object attributes using the .GET method
//       console.log('object email: ', result.get('email'));
//       console.log('object password: ', result.get('password'));
//       console.log('ParseObject created', result);
//       // this.fetchUsers();
//     } catch (error: any) {
//       console.error('Error while creating ParseObject: ', error);
//     }
//   })();
//  }

//  getUsers(){
//    return this.users;
//  }

//  fetchUsers(){
//   (async () => {
//     const query: Parse.Query = new Parse.Query('users');

//     const results: Parse.Object[] = await query.find();
//     try {
//       this.users = [];
//       for (const object of results) {
//         const email: string = object.get('email');
//         const password: string = object.get('password');
//         const user: User = {
//           email,
//           password,
//           id: object.id
//         }
//         this.users.push(user);
//       }

//     } catch (error: any) {
//       console.error('Error while fetching users', error);
//     }
//     this.userSubject.next(this.users);
//   })();
// }


}
