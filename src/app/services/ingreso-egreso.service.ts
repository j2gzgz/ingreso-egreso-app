import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor( private firestore: AngularFirestore, 
               private authService: AuthService
  ) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {

    const uid = this.authService.user.uid;
    
    delete ingresoEgreso.uid;

    return this.firestore.doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({... ingresoEgreso});
      // .then((ref) => console.log('exito!!', ref))
      // .catch((err) => console.warn( err ));
}

  initIgresosEgresosListener(uid: string | null | undefined) {
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map( snapshot =>{
          return snapshot.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data() as {}
            }
          })
        })
      );
  }

  borrarIngresoEgreso(uidItem: string  | undefined) {
    
    const uid = this.authService.user.uid;
    return this.firestore.doc(`${uid}/ingresos-egresos/items/${uidItem}`).delete();
  }
}
