import {Component, OnInit} from "@angular/core";
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";
import {UserEditService} from "./user/user.service";
import {DomSanitizer} from "@angular/platform-browser";
@Component({
    moduleId: module.id,
    selector: 'head-component',
    templateUrl: 'head-component.html'
})
export class HeadComponent implements OnInit {

    picUrl: any = false;

    dropdownShown: boolean = false;

    toggleDropdown() {
        this.dropdownShown = !this.dropdownShown;
    }

    ngOnInit(): void {
        setInterval(() => {
            this.isAuthorized = this.authService.isLogined;
            if (this.authService.isLogined) {
                var photo = this.authService.user.Photo;
                if (photo != null) {
                    this.picUrl = this.sanitizer.bypassSecurityTrustUrl(photo);
                }
            }
        }, 100);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(["/"]);
    }

    constructor(private authService: AuthService, private sanitizer: DomSanitizer, private userService: UserEditService, private router: Router) {
    }

    isAuthorized: boolean = false;


}