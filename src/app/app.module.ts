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
import {InputComponent} from './core/input/input.component';
import {InputSelectComponent} from './core/input/input-select/input-select.component';
import {ButtonComponent} from './core/input/button/button.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {InputComponentLabel} from "./core/input/input-label.component";
import {InputComponentPrefixStick} from "./core/input/input-prefix-stick.component";
import {InputWarningComponent} from "./core/input/input-warning.component";
import {InputErrorComponent} from "./core/input/input-error.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {InputPasswordComponent} from './core/input/input-password/input-password.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {UsersComponent} from './components/users/users.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TableComponent} from './core/table/table.component';
import {ActionButtonComponent} from "./core/table/action-button.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { LinkPreviewComponent } from './core/link-preview/link-preview.component';
import {HttpClientModule} from "@angular/common/http";
import { ModalComponent } from './core/modal/link-preview-modal/modal.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FormulaireComponent,
        SignInComponent,
        SignUpComponent,
        InputComponent,
        InputSelectComponent,
        ButtonComponent,
        InputComponentLabel,
        InputComponentPrefixStick,
        InputWarningComponent,
        InputErrorComponent,
        InputPasswordComponent,
        DashboardComponent,
        UsersComponent,
        TableComponent,
        ActionButtonComponent,
        LinkPreviewComponent,
        ModalComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
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
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        HttpClientModule,
        MatDialogModule
    ],
    providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
