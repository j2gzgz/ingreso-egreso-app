
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { tap } from 'rxjs';
 
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(AuthService)
    .isAuth()
    .pipe(
      tap((estado) => {
        if (!estado) {
          router.navigate(['/login']);
        }
      })
    );
};