import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProcessFormsComponent} from "./components/process-forms/process-forms.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {AuthGuard} from "./shared/guard/auth.guard";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CategoryFormsComponent} from "./components/category-forms/category-forms.component";
import {AddCategoryComponent} from "./components/add-category/add-category.component";
import {DocumentsComponent} from "./components/documents/documents.component";
import {DealsComponent} from "./components/deals/deals.component";

const routes: Routes = [
    {path: 'formulaire', component: ProcessFormsComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ADMIN']}},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'sign-in', component: SignInComponent},
    {path: 'register-user', component: SignUpComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ADMIN']}},
    {path: 'category', component: CategoryFormsComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ADMIN']}},
    {path: 'category/add', component: AddCategoryComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ADMIN']}},
    {path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ADMIN']}},
    {path: 'deals', component: DealsComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ADMIN']}},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
