import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  observableParams: Subscription;

  constructor(private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.currentRoute.snapshot.params.id,
      name: this.currentRoute.snapshot.params.name
    }
    this.observableParams = this.currentRoute.params
      .subscribe
      (
        (param: Params) => {
          this.user.id = param.id;
          this.user.name = param.name;
        }
        )
    console.log('entered id param >>> ', this.currentRoute.snapshot.params['id'])
    console.log('all dynamic route segments >>> ', this.currentRoute.snapshot.params)
  }

  ngOnDestroy() {
    //NOTE: By default Angular do it for us regarding to the params observable because it is not a custom observable
    this.observableParams.unsubscribe()
  }

}
