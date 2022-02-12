import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UsersService } from '../users.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user!: any;
  userId!: any;
  constructor(private readonly router: Router,
    private activatedRoute: ActivatedRoute, private fb: FormBuilder, private usersService: UsersService) {
      this.user = this.usersService.getUser();
      console.log(this.user);
     }
    userSignUpFG!: FormGroup;

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params.id);
    this.userSignUpFG = this.fb.group({
      username: [this.user.username, Validators.required],
      email: [this.user.email, Validators.required],
    })
    this.userId = this.activatedRoute.snapshot.params.id;
  }

  onUpdate(){
    let user: any = {
      ...this.userSignUpFG.value,
      id: this.userId
    }
    this.usersService.updateUser(user);
    // console.log(this.userSignUpFG.value);

  }

}
