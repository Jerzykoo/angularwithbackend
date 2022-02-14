import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  isCorrectFile :boolean = true;
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
        [Validators.minLength(3), Validators.required])],
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

    let file = e.target.files[0];

    const acceptedImageTypes = ['image/jpeg'];
    this.isCorrectFile = file && acceptedImageTypes.includes(file['type'])
    if(this.isCorrectFile){
      this.path = file;
    }else{
      this.isCorrectFile = false;
    }
    console.log(this.path);
  }

}
