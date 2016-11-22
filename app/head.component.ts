import {Component, OnInit} from "@angular/core";
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";
@Component({
    moduleId: module.id,
    selector: 'head-component',
    templateUrl: 'head-component.html'
})
export class HeadComponent implements OnInit {

    dropdownShown: boolean = false;

    toggleDropdown() {
        this.dropdownShown = !this.dropdownShown;
    }

    ngOnInit(): void {
        setInterval(() => {
            this.isAuthorized = this.authService.isLogined;
        }, 100);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(["/"]);
    }

    constructor(private authService: AuthService, private router: Router) {
    }

    isAuthorized: boolean = false;


}