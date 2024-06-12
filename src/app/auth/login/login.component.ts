import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { AuthService } from '../../services/auth.service';
import { getTranslatedError } from '@nafuzi/firebase-auth-error-translator';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit, OnDestroy{
  
  loginForm!: FormGroup;
  cargando: boolean = false;
  uiSubcriptions!: Subscription;
  
  constructor( private fb: FormBuilder, 
               private authService: AuthService, 
               private store: Store<AppState>,
               private router: Router ){

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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

  login() {
    if (this.loginForm.invalid) return;

    this.store.dispatch( ui.isLoading() );

    // Swal.fire({
    //   title: "Espere por favor",
    //   didOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

    const { email, password } = this.loginForm.value;
    
    this.authService.loginUsuario( email, password )
    .then(credenciales =>{
      //console.log(credenciales);
      // Swal.close();
      this.store.dispatch( ui.stopLoading() );
      this.router.navigate(['/']);
    })
    .catch( err => {
      this.store.dispatch( ui.stopLoading() );
    //  console.log('----->',err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err
        //text: getTranslatedError('es',err.message) 
        // footer: '<a href="#">Why do I have this issue?</a>'
      });
    });
    
  }
}
