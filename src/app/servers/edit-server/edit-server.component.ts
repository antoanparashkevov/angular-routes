import {Component, OnInit} from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  canEdit: boolean = false;

  constructor(
    private serversService: ServersService,
    private currentRouter: ActivatedRoute
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
  }

}
