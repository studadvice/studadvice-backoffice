import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree,} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard {
    constructor(public authService: AuthService, public router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
        if (!this.authService.isLoggedIn) {
            this.router.navigate(['sign-in']).then(r => console.log(r));
        }
        return true;
    }
}