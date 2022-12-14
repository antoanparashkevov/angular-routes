import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {UsersComponent} from "./users/users.component";
import {UserComponent} from "./users/user/user.component";
import {ServersComponent} from "./servers/servers.component";
import {ServerComponent} from "./servers/server/server.component";
import {EditServerComponent} from "./servers/edit-server/edit-server.component";
import {AuthGuard} from "./auth-guard.service";
import {CanDeactivateGuard} from "./can-deactivate-guard.service";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: ':id/:name',
        component: UserComponent
      },
    ]
  },
  {
    path: 'servers',
    component: ServersComponent,
    canActivateChild:[AuthGuard],//all child routes not a parent one
    children: [
      {
        path: ':id',
        component: ServerComponent
      },
      {
        path: ':id/edit',
        canDeactivate: [CanDeactivateGuard],
        component: EditServerComponent
      }
    ]
  },

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export default class AppRouterModule {

}
