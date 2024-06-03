import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { getTranslatedError } from '@nafuzi/firebase-auth-error-translator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup;
  
  constructor( private fb: FormBuilder, private auth: AuthService, private router: Router ){

  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
    
  }

  login() {
    if (this.loginForm.invalid) return;

    Swal.fire({
      title: "Espere por favor",
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const { email, password } = this.loginForm.value;
    
    this.auth.loginUsuario( email, password )
    .then(credenciales =>{
      console.log(credenciales);
      Swal.close();
      this.router.navigate(['/']);
    })
    .catch( err => {
      
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
