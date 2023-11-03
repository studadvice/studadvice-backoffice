import {Component} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";

@Component({
    selector: 'app-nav',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    public isDropdownOpen = false;

    constructor(private authService: AuthService) {
    }

    toggleDropdown(event: Event): void {
        event.stopPropagation();
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    logout() {
        this.authService.signOut();
    }
}
