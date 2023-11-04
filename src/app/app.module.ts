import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './core/nav/navbar.component';
import {FormulaireComponent} from './components/formulaire/formulaire.component';
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {environment} from "../environments/environments";
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {VerifyEmailComponent} from './components/verify-email/verify-email.component';
import {InputComponent} from './components/input/input.component';
import {InputSelectComponent} from './components/input/input-select/input-select.component';
import {ButtonComponent} from './components/input/button/button.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {InputComponentLabel} from "./components/input/input-label.component";
import {InputComponentPrefixStick} from "./components/input/input-prefix-stick.component";
import {InputWarningComponent} from "./components/input/input-warning.component";
import {InputErrorComponent} from "./components/input/input-error.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {InputPasswordComponent} from './components/input/input-password/input-password.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {UsersComponent} from './components/users/users.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FormulaireComponent,
        SignInComponent,
        SignUpComponent,
        ForgotPasswordComponent,
        VerifyEmailComponent,
        InputComponent,
        InputSelectComponent,
        ButtonComponent,
        InputComponentLabel,
        InputComponentPrefixStick,
        InputWarningComponent,
        InputErrorComponent,
        InputPasswordComponent,
        DashboardComponent,
        UsersComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        FormsModule,
        CommonModule,
        NgSelectModule,
        ReactiveFormsModule,
        MatTooltipModule,
        FontAwesomeModule,
    ],
    providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
