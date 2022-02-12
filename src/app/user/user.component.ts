import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  authSubscription!: Subscription;
  user!: any;
  constructor(private usersService: UsersService,private router: Router) { }

  ngOnInit(): void {
      this.user = this.usersService.getUser();
      console.log(this.user);
  }

  ngOnDestroy(): void {

  }

  onEditClick(id: string){
    console.log(id);
    this.router.navigate(['/edit-user',id]);
  }

}
