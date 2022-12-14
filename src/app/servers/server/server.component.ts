import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(
    private serversService: ServersService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.currentRoute.snapshot.params['id']
    this.server = this.serversService.getServer(Number(id));

    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(Number(params['id']))
      })

  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.currentRoute, queryParamsHandling: 'preserve'})//relative path since we are already on /servers/:id
  }

}
