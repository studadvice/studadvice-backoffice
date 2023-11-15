import {Component} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {
    faFileAlt,
    faFolderOpen,
    faSignOutAlt,
    faStream,
    faTachometerAlt,
    faTags,
    faUsers
} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-nav',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    public isDropdownOpen = false;
    protected readonly faTachometerAlt = faTachometerAlt;
    protected readonly faStream = faStream;
    protected readonly faFileAlt = faFileAlt;
    protected readonly faFolderOpen = faFolderOpen;
    sidebarOpen = false;

    constructor(private authService: AuthService) {
    }

    toggleDropdown(event: Event): void {
        event.stopPropagation();
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
        if (this.sidebarOpen) {
            document.body.classList.add('sidebar-expanded');
            document.body.classList.remove('sidebar-collapsed');
        } else {
            document.body.classList.add('sidebar-collapsed');
            document.body.classList.remove('sidebar-expanded');
        }
    }

    logout() {
        this.authService.signOut();
    }

    protected readonly faUsers = faUsers;
    protected readonly faTags = faTags;
    protected readonly faSignOutAlt = faSignOutAlt;
}
