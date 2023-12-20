import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {map, Observable, of, switchMap, take} from 'rxjs';
import {customClaims} from "@angular/fire/auth-guard";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.afAuth.authState.pipe(
            take(1),
            switchMap(user => {
                if (!user) {
                    this.router.navigate(['/sign-in']);
                    return new Observable((observer) => observer.next(false));
                }
                return user.getIdTokenResult().then(idTokenResult => {
                    const roles = route.data['roles'] as Array<string>;
                    const claims = idTokenResult.claims;
                    return roles.some(role => claims["custom_claims"].includes(role));
                });
            }),
            map(hasRole => {
                if (hasRole) {
                    return true;
                } else {
                    this.router.navigate(['/sign-in']);
                    return false;
                }
            })
        );
    }

}