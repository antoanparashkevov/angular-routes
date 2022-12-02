import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(
    private serversService: ServersService,
    private currentRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.currentRoute.snapshot.params['id']
    this.server = this.serversService.getServer(Number(id));

    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(Number(params['id']))
      })

  }

}
