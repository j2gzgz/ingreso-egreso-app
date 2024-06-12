import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ingresoEgresoActions  from '../ingreso-egreso/ingreso-egreso.actions';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent implements OnInit, OnDestroy{
  
  userSubs!: Subscription;
  ingresoEgresoSubs!: Subscription;

  constructor( private store: Store<AppState>,
               private ingresoEgresoService:IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.userSubs =this.store.select('user')
      .pipe(filter(auth => auth.user != null) )
      .subscribe(({user}) => {
        //console.log(user!.uid)
        this.ingresoEgresoSubs =this.ingresoEgresoService.initIgresosEgresosListener(user!.uid)
          .subscribe((ingresosEgresosFB: any): void => {
            this.store.dispatch( ingresoEgresoActions.setItems({ items: ingresosEgresosFB }));
          })
      });
  }

  ngOnDestroy(): void {
    this.ingresoEgresoSubs.unsubscribe();
    this.userSubs.unsubscribe();
  }

}