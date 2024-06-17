import { Component, OnInit } from '@angular/core';
//import { AppState } from '../../app.reducer';
import { AppStateWithIngresoEgreso } from '../increso-egreso.reducer';

import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

import { ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: ``
})

export class EstadisticaComponent implements OnInit{


  ingresos: number = 0;
  egresos: number = 0;
  
  totalIngresos: number = 0;
  totalEgresos: number = 0;

  constructor( private store: Store<AppStateWithIngresoEgreso>){}

  // Pie
  pieChartOptions: ChartOptions<'pie'> = { responsive: false };

  pieChartLabels: string[] = [ ];
  pieChartDatasets: { data: number[] } [] = [ ];
  pieChartLegend = true;
  pieChartPlugins = [];

  ngOnInit(): void {
    this.store.select('ingresosEgresos')
    .subscribe (({ items }) => this.generarEstadistica( items ));
  }


  generarEstadistica( items: IngresoEgreso[]) {
  
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.ingresos = 0;
    this.egresos= 0;

    for (const item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;        
      } 
    }

    this.pieChartLabels = [ 'Egresos', 'Ingresos' ];
    this.pieChartDatasets = [ {data: [ this.totalEgresos, this.totalIngresos ] } ];

  }
    
}
