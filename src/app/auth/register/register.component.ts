import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent implements OnInit, OnDestroy{

  registroForm!: FormGroup;
  cargando: boolean = false;
  uiSubcriptions!: Subscription;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private store: Store<AppState>,
               private router: Router) {

  }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre:   ['', Validators.required],
      correo:   ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

    this.uiSubcriptions = this.store.select('ui')
                              .subscribe( ui =>  {
                                this.cargando = ui.isLoading;
                                //console.log('Cargado subs');
                              });    
  }

  ngOnDestroy(): void {
   this.uiSubcriptions.unsubscribe();
  }

  crearUsuario() {
    if (this.registroForm.invalid) return;
    this.store.dispatch( ui.isLoading() );

    // Swal.fire({
    //   title: "Espere por favor",
    //   didOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

    const { nombre, correo, password } = this.registroForm.value;

    this.authService.crearUsuario(nombre, correo, password)
      .then( credenciales =>{
        //console.log(credenciales);
        //  Swal.close();
        this.store.dispatch( ui.stopLoading() );
        this.router.navigate(['/']);
      })
      .catch( err => {
        this.store.dispatch( ui.stopLoading() );
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
      });

  }

}
