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
  path!: File;
  constructor(private readonly router: Router,
    private activatedRoute: ActivatedRoute, private fb: FormBuilder, private usersService: UsersService) {
      this.user = this.usersService.getCurrentUser();
      console.log(this.user);
     }
    userSignUpFG!: FormGroup;

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params.id);
    this.userSignUpFG = this.fb.group({
      username: [this.user.username,  Validators.compose(
        [Validators.minLength(2), Validators.required])],
      email: [this.user.email, Validators.compose(
        [Validators.email, Validators.required])],
    })
    this.userId = this.activatedRoute.snapshot.params.id;
  }

  onUpdate(){
    let user: any = {
      ...this.userSignUpFG.value,
      id: this.userId
    }
    this.usersService.updateUser(user, this.path);
    // console.log(this.userSignUpFG.value);

  }

  onFileChanged(e: any,id:string){
    this.path = e.target.files[0];
    //trzeba sprawdzac czy jest pierwszy el
    // console.log(e);
    // console.log(path);

    // this.usersService.updateAvatar(path,id);

  }

}
