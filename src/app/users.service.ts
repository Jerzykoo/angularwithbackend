import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import * as Parse from 'parse';
@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor() {
    const Parse = require('parse');

    Parse.serverURL = 'https://parseapi.back4app.com';
    Parse.initialize(
      'N2iz7LzDyGBuHmfPWXZlX5CK62NUwJsUgxZhmkok',
      'amffx9uRAZzjUFdzWnRTxo3GyDskisqcIA7KcNOw'
    );


  }

 login(){
   console.log('Zalogowano');
   this.write();

 }

 register(user: User){
  // console.log('Zarejestrowano', user);
  this.write();
 }

 update(){
  (async () => {
    const query: Parse.Query = new Parse.Query('users');
    try {
      // here you put the objectId that you want to update
      const object: Parse.Object = await query.get('kolkolks@interia.pl');
      object.set('password', '121212');
      try {
        const response: Parse.Object = await object.save();
        console.log(response.get('myCustomKey1Name'));
        console.log('password updated', response);
      } catch (error: any) {
        console.error('Error while updating ', error);
      }
    } catch (error: any) {
      console.error('Error while retrieving object ', error);
    }
  })();
 }

 add(){
  (async () => {
    const myNewObject: Parse.Object = new Parse.Object('users');
    myNewObject.set('email', 'pabtibo@gmail.com');
    myNewObject.set('password', '123456');
    try {
      const result: Parse.Object = await myNewObject.save();
      // Access the Parse Object attributes using the .GET method
      console.log('object email: ', result.get('email'));
      console.log('object password: ', result.get('password'));
      console.log('ParseObject created', result);
    } catch (error: any) {
      console.error('Error while creating ParseObject: ', error);
    }
  })();
 }

 write(){
  (async () => {
    const query: Parse.Query = new Parse.Query('users');
    // You can also query by using a parameter of an object
    // query.equalTo('objectId', 'xKue915KBG');
    const results: Parse.Object[] = await query.find();
    try {
      for (const object of results) {
        // Access the Parse Object attributes using the .GET method
        const email: string = object.get('email');
        const password: string = object.get('password');
        console.log(email);
        console.log(password);
      }
    } catch (error: any) {
      console.error('Error while fetching MyCustomClassName', error);
    }
  })();
}
}
