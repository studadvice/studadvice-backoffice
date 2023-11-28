import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree,} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Observable, map} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard {
    constructor(public authService: AuthService, public router: Router, public afAuth: AngularFireAuth,) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(
        map(user => {
            if (user) return true;

            this.router.navigate(['/sign-in']);
            return false;
        })
    );
}
}