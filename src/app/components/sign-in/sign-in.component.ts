import {Component} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

    faGoogle = faGoogle;
    password = new FormControl('', [Validators.required]);
    email = new FormControl('', [Validators.required, Validators.email]);

    constructor(public authService: AuthService) {
    }

    async login() {
        try {
            await this.authService.signInWithGoogle();
        } catch (error) {
            console.error(error);
        }
    }

    loginWithUsernameAndPassword() {
        this.authService.signIn(this.email.value!, this.password.value!);
    }
}
