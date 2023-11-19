import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'backoffice';

    isAuth: boolean = false;

    constructor(public authService: AuthService, private translate: TranslateService, private router: Router) {
        translate.setDefaultLang('fr-FR');
    }

    ngOnInit(): void {

    }

    get isSignInRoute(): boolean {
        return this.router.url === '/sign-in';
    }


    switchLanguage(language: string) {
        this.translate.use(language);
    }
}
