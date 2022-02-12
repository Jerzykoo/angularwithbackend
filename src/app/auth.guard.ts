// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree ,Route} from "@angular/router";
// import { Observable } from "rxjs";
// import { UsersService } from "./users.service";


// @Injectable()
// export class AuthGuard implements CanActivate, CanLoad{

//   constructor(private usersService: UsersService, private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
//     if(this.usersService.isAuth()) {
//       return true;
//     }else{
//       return this.router.navigate(['/login']);
//     }
//   }

//   canLoad(route: Route){
//     if(this.usersService.isAuth()) {
//       return true;
//     }else{
//       return this.router.navigate(['/login']);
//     }
//   }

// }
