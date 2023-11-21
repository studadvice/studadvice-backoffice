import {Component} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

    faGoogle = faGoogle;
    password: string = '';
    email: string = '';

    constructor(public authService: AuthService) {
    }

    async login() {
        try {
            await this.authService.signInWithGoogle();
        } catch (error) {
            console.error(error);
        }
    }

    loginWithUsernameAndPassword(email: string, password: string) {
        this.authService.signIn(email, password);
    }
}
