import {Component} from '@angular/core';

@Component({
    selector: 'app-nav',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    menus = [
        {
            title: 'Administration portail pro',
            subitems: ['Sous-menu 1', 'Sous-menu 2']
        },
        {
            title: 'Organisation physique',
            subitems: []
        },
    ];

    menuOpen = false;

    userMenuOpen = false;

    toggleUserMenu() {
        this.userMenuOpen = !this.userMenuOpen;
    }


    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }
}
