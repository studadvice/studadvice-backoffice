import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/nav/navbar.component';
import { HeaderComponent } from './core/nav/header/header.component';
import { FooterComponent } from './core/nav/footer/footer.component';
import { HamburgerComponent } from './common/hamburger/hamburger.component';
import { MenuItemComponent } from './common/hamburger/menu-item/menu-item.component';
import { MenuSubitemComponent } from './common/hamburger/menu-subitem/menu-subitem.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    HamburgerComponent,
    MenuItemComponent,
    MenuSubitemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
