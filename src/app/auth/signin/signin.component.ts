import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  userSignInFG!: FormGroup;
  constructor(private usersService: UsersService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userSignInFG = this.fb.group({
      username: ['',Validators.required],
      password: ['', Validators.required]
    })
  }
  signIn(){
    this.usersService.login(this.userSignInFG.value);
  }

}
