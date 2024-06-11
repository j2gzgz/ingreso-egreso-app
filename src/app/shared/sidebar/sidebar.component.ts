import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent implements OnInit, OnDestroy{
  
  nombre: string = '';
  userSubs!: Subscription;

  constructor(private auth: AuthService, 
              private router: Router,
              private store: Store<AppState>){}

  ngOnInit(): void {
   this.userSubs = this.store.select('user')
                      .pipe(
                         filter( ({user}) => user != null )
                      )
                      .subscribe( 
                        ({user}) => this.nombre = user!.nombre
                      );

  }
  ngOnDestroy(): void {
   this.userSubs.unsubscribe();
  }


  logout() {
    this.auth.logout().then( () => {
      this.router.navigate(['/login']); 
    });
  }
}
