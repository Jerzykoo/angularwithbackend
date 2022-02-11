import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './users.service';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Parse} from 'parse/react-native';
import * as Parse from 'parse';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userFG!: FormGroup;
  constructor(private fb: FormBuilder, private usersService: UsersService){}

  ngOnInit(): void {




    this.userFG = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  signUp(){
    // this.usersService.register(this.userFG.value);
    this.usersService.add();
  }

  show(){
    this.usersService.write();
  }
  update(){
    this.usersService.update();
  }




}
