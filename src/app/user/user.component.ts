import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  user!: any;
  isAvatar!: boolean;
  isCorrectFile :boolean = true;
  constructor(private usersService: UsersService,private router: Router) { }

  ngOnInit(): void {
      this.user = this.usersService.getCurrentUser();
      this.isAvatar = this.user.isAvatar;

  }

  ngOnDestroy(): void {

  }

  onEditClick(id: string){
    console.log(id);
    this.router.navigate(['/edit-user',id]);
  }

  onFileChanged(e: any,id:string){
    let file = e.target.files[0];

    const acceptedImageTypes = ['image/jpeg'];
    this.isCorrectFile = file && acceptedImageTypes.includes(file['type'])
    if(this.isCorrectFile){
      this.usersService.updateAvatar(file,id);
    }else{
      this.isCorrectFile = false;
    }

  }
}
