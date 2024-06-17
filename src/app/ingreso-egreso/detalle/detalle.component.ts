import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
//import { AppState } from '../../app.reducer';
import { AppStateWithIngresoEgreso } from '../increso-egreso.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: ``
})
export class DetalleComponent implements OnInit, OnDestroy{
  
  ingresosEgresos: IngresoEgreso[] = [];
  ingresosEgresosSubs!: Subscription; 

  constructor(private store: Store<AppStateWithIngresoEgreso>,
              private ingresoEgresoSevice: IngresoEgresoService
  ) {}
  
  ngOnInit(): void {
    this.ingresosEgresosSubs = this.store.select('ingresosEgresos')
      .subscribe(( {items} ) => {this.ingresosEgresos = [...items]});
  }
  ngOnDestroy(): void {
    this.ingresosEgresosSubs.unsubscribe();
  }


  
  borrar(uid: string | undefined) {
    //console.log(uid);
    this.ingresoEgresoSevice.borrarIngresoEgreso(uid)
      .then(
        () => Swal.fire('Borrado','Item borrado','success')
      )
      .catch(
        (err) => Swal.fire('Error',err.message,'error')
      );
  }


}
