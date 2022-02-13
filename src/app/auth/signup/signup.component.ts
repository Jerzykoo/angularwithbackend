import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userSignUpFG!: FormGroup;
  constructor(private usersService: UsersService, private fb: FormBuilder) { }

    ngOnInit(): void {
      this.userSignUpFG = this.fb.group({
        username: ['', Validators.compose(
          [Validators.minLength(3), Validators.required])],
        email: ['', Validators.compose(
          [Validators.email, Validators.required])],
        password: ['', Validators.compose(
          [Validators.minLength(4), Validators.required])]
      })

    }


  signUp(){
    // this.usersService.register(this.userFG.value);
    this.usersService.register(this.userSignUpFG.value);
    this.userSignUpFG.reset();
  }
}
