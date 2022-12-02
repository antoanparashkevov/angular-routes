import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router"; //interface
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {FakeAuth} from "./fake-auth.service";


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: FakeAuth, private router: Router) {
  }

   canActivate(
     route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {

        return this.authService.isAuthenticated().then((authenticate: boolean)=>{
          if(authenticate) {
            return true
          } else {
              this.router.navigate(['/'])
            }
          }

    )
   }
}
