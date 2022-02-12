import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './users.service';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Parse} from 'parse/react-native';
// import * as Parse from 'parse';
// import { Subscription } from 'rxjs';
// import { User } from './models/user.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder, private usersService: UsersService){}

  ngOnInit(): void {
    this.usersService.init();
  }

  ngOnDestroy(): void {
  }

}
