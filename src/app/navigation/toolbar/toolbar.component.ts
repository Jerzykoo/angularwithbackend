import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  authSubscription!: Subscription;
  isAuth = false;
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.authSubscription = this.usersService.authChange.subscribe((result) => {
      this.isAuth = result;
      console.log(result);

    })
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }


}
