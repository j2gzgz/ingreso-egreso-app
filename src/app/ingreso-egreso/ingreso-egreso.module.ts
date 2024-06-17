import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { StoreModule } from '@ngrx/store';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { ingresoEgresoReducer } from './increso-egreso.reducer';



@NgModule({
  declarations: [    
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresosEgresos',ingresoEgresoReducer),
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    DashboardRoutingModule,
  ]
})
export class IngresoEgresoModule { }
