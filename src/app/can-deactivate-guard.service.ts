import {Observable} from "rxjs/Observable";
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean
}

//this is how we connect CanDeactivateGuard with any component that want to use this guard
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  //that means the component who use this guard to has canDeactivate method
  canDeactivate(component: CanComponentDeactivate,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

          return component.canDeactivate();

  }


}
