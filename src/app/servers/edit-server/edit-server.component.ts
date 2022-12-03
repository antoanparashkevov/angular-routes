import {Component, OnInit} from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CanComponentDeactivate} from "../../can-deactivate-guard.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  canEdit: boolean = false;
  changesSaved: boolean = false;

  constructor(
    private serversService: ServersService,
    private currentRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.currentRouter.snapshot.params.id
    this.currentRouter.queryParams.subscribe(
      (queryParams: Params) => {
        this.canEdit = queryParams.allowEdit === '1'//if it is 1 -> true, otherwise -> false
      }
    )
    this.server = this.serversService.getServer(+id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['/servers'], {relativeTo: this.currentRouter})
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean{
      if(!this.canEdit) {
        return true;
      }
      if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && this.changesSaved === false) {
        return confirm('Are you sure you want to leave the unsaved changes?');
      } else {
        return true;
      }
  }

}
