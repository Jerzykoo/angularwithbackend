import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'parse';
import { Observable, Subscription } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  user!: any;
  isAvatar!: boolean;
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
    let path = e.target.files[0];
    //trzeba sprawdzac czy jest pierwszy el
    // console.log(e);
console.log(path);

    this.usersService.updateAvatar(path,id);

  }
}
